import { z } from "zod";
import { extractYouTubeId } from "@/lib/utils";

export const YT_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export const createStreamSchema = z.object({
  streamerId: z.string().min(1, "StreamerId is required"),
  url: z
    .string()
    .url("Must be a valid URL")
    .refine((val) => Boolean(extractYouTubeId(val) ?? YT_REGEX.test(val)), {
      message: "Must be a valid YouTube URL",
    }),
});
