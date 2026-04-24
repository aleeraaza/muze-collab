import { authOptions } from "@/lib/auth";
import { getCreatorWorkspace } from "@/lib/stream-data";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return NextResponse.json(
      { message: "Unauthenticated user." },
      { status: 401 },
    );
  }

  try {
    const workspace = await getCreatorWorkspace(
      session.user.id,
      session.user.id,
    );

    if (!workspace) {
      return NextResponse.json(
        { message: "Creator workspace not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(workspace);
  } catch (error) {
    console.error("[GET /api/streams/my]:", error);

    return NextResponse.json(
      { message: "Failed to fetch your queue." },
      { status: 500 },
    );
  }
}
