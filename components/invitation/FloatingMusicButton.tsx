"use client";

import { Pause, Play, VolumeX } from "lucide-react";

type FloatingMusicButtonProps = {
  enabled: boolean;
  playing: boolean;
  onToggle: () => void;
};

export function FloatingMusicButton({ enabled, playing, onToggle }: FloatingMusicButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={playing ? "Pause background music" : "Play background music"}
      className="fixed bottom-6 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-[#fbf6f0]/85 text-cocoa shadow-soft backdrop-blur md:right-6"
      disabled={!enabled}
    >
      {!enabled ? <VolumeX className="h-5 w-5" /> : playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
    </button>
  );
}
