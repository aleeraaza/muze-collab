import { authOptions } from "@/lib/auth";
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

  return NextResponse.json({
    creatorId: session.user.id,
    sharePath: `/creator/${session.user.id}`,
  });
}
