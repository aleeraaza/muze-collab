import { extractYouTubeId, getYtDetails } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { message: "url is required." },
      { status: 400 },
    );
  }

  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return NextResponse.json(
      { message: "Invalid YouTube URL." },
      { status: 400 },
    );
  }

  try {
    const details = await getYtDetails(videoId);

    return NextResponse.json({
      preview: {
        url,
        videoId,
        title: details.title,
        channel: details.channel,
        description: details.description,
        sThumbnail: details.sThumbnail,
        mThumbnail: details.mThumbnail,
        bThumbnail: details.bThumbnail,
      },
    });
  } catch (error) {
    console.error("[GET /api/streams/preview]:", error);

    return NextResponse.json(
      { message: "Failed to preview the video." },
      { status: 500 },
    );
  }
}
