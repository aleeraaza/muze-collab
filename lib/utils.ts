import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import youtubesearchapi from "youtube-search-api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractYouTubeId(value: string) {
  try {
    const url = new URL(value);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "").slice(0, 11) || null;
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v")?.slice(0, 11) ?? null;
      }

      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/")[2]?.slice(0, 11) ?? null;
      }

      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/")[2]?.slice(0, 11) ?? null;
      }
    }
  } catch {
    const matched = value.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([a-zA-Z0-9_-]{11})/,
    );

    return matched?.[1] ?? null;
  }

  return null;
}

export function getYouTubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

export function getYouTubeThumbnailUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export async function getYtDetails(ytId: string) {
  const ytDetail = await youtubesearchapi.GetVideoDetails(ytId);
  const thumbnails = ytDetail.thumbnail?.thumbnails ?? [];
  const len = thumbnails.length;

  return {
    title: ytDetail.title,
    description: ytDetail.description,
    channel: ytDetail.channel,
    sThumbnail: thumbnails[len - 3]?.url ?? null,
    mThumbnail: thumbnails[len - 2]?.url ?? null,
    bThumbnail: thumbnails[len - 1]?.url ?? null,
  };
}
