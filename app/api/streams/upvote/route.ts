import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUpvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      {
        message: "Unauthenticated user",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const data = createUpvoteSchema.parse(await req.json());
    await prisma.upvote.create({
      data: {
        userId: session?.user.id,
        streamId: data.streamId,
      },
    });
    return NextResponse.json({
      message: "Upvote Successful!",
    });
  } catch {
    return NextResponse.json(
      {
        message: "Error whilte creating the upvote!",
      },
      {
        status: 400,
      },
    );
  }
}
