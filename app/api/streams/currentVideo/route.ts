import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCreatorWorkspace } from "@/lib/stream-data";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const currentVideoSchema = z.object({
  streamId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      { message: "Unauthenticated user." },
      { status: 401 },
    );
  }

  try {
    const data = currentVideoSchema.parse(await req.json());
    const stream = await prisma.stream.findUnique({
      where: { id: data.streamId },
      select: { id: true, userId: true },
    });

    if (!stream || stream.userId !== session.user.id) {
      return NextResponse.json(
        { message: "You can only change your own queue." },
        { status: 403 },
      );
    }

    await prisma.$transaction([
      prisma.stream.updateMany({
        where: {
          userId: session.user.id,
          active: true,
        },
        data: {
          active: false,
        },
      }),
      prisma.stream.update({
        where: { id: data.streamId },
        data: {
          active: true,
        },
      }),
    ]);

    const workspace = await getCreatorWorkspace(session.user.id, session.user.id);

    return NextResponse.json({
      message: "Now playing updated.",
      streams: workspace?.streams ?? [],
    });
  } catch (error) {
    console.error("[POST /api/streams/currentVideo]:", error);

    return NextResponse.json(
      { message: "Failed to update the current video." },
      { status: 400 },
    );
  }
}
