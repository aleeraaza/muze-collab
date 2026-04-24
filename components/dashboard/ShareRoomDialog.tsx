"use client";

import Link from "next/link";
import { ArrowUpRight, Copy, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ShareRoomDialogProps = {
  creatorId: string;
  shareUrl: string;
  onCopyShareUrl: () => Promise<void>;
};

export default function ShareRoomDialog({
  creatorId,
  shareUrl,
  onCopyShareUrl,
}: ShareRoomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-10 rounded-xl bg-teal-400 text-slate-950 hover:bg-teal-300 font-medium">
          <Share2 className="mr-2 h-4 w-4" />
          Share Room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-950 border-white/12 text-white w-[95vw] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Share the room
            <Sparkles className="h-5 w-5 text-teal-400 shrink-0" />
          </DialogTitle>
          <DialogDescription className="text-slate-400 break-words">
            Share this link with listeners so they can preview, submit, upvote,
            and downvote without touching creator-only controls.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div className="rounded-xl border border-white/12 bg-white/5 p-3 sm:p-4 flex items-center w-full">
            <span className="text-sm font-medium text-white break-all w-full">
              {shareUrl}
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={onCopyShareUrl}
              className="h-11 w-full rounded-xl bg-teal-400 text-slate-950 hover:bg-teal-300"
            >
              <Copy className="mr-2 h-4 w-4 shrink-0" />
              <span>Copy link</span>
            </Button>
          </div>

          <div className="rounded-xl border border-white/12 bg-[linear-gradient(135deg,rgba(251,146,60,0.14),rgba(15,23,42,0.86))] p-4 mt-2">
            <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.28em] text-amber-200/80 mb-3 break-words">
              Permissions
            </p>
            <ul className="space-y-3 text-sm sm:text-xs leading-relaxed sm:leading-5 text-slate-200/78 pl-4 list-disc break-words">
              <li><span className="block">Creator dashboard: Full control over the queue.</span></li>
              <li><span className="block">Public room: Submit, upvote, and downvote only.</span></li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
