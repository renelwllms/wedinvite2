"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ClosingSection } from "@/components/invitation/ClosingSection";
import { CountdownSection } from "@/components/invitation/CountdownSection";
import { EventSection } from "@/components/invitation/EventSection";
import { FloatingMusicButton } from "@/components/invitation/FloatingMusicButton";
import { GallerySection } from "@/components/invitation/GallerySection";
import { HeroSection } from "@/components/invitation/HeroSection";
import { IntroSection } from "@/components/invitation/IntroSection";
import { OpeningScreen } from "@/components/invitation/OpeningScreen";
import { QuoteSection } from "@/components/invitation/QuoteSection";
import { RSVPSection } from "@/components/invitation/RSVPSection";
import { StorySection } from "@/components/invitation/StorySection";
import { TopNavbar } from "@/components/invitation/TopNavbar";
import type { InvitationData } from "@/data/invitation";

type InvitationExperienceProps = {
  data: InvitationData;
  guestName: string;
};

export function InvitationExperience({ data, guestName }: InvitationExperienceProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const musicSrc = useMemo(() => data.music?.src ?? "", [data.music?.src]);

  useEffect(() => {
    document.body.dataset.scrollLocked = invitationOpened ? "false" : "true";

    return () => {
      document.body.dataset.scrollLocked = "false";
    };
  }, [invitationOpened]);

  async function startMusic() {
    if (!audioRef.current || !musicSrc) {
      return;
    }

    try {
      audioRef.current.volume = 0.45;
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  async function handleOpenInvitation() {
    setInvitationOpened(true);
    await startMusic();
  }

  async function handleToggleMusic() {
    if (!audioRef.current || !musicSrc) {
      return;
    }

    if (audioRef.current.paused) {
      await startMusic();
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
  }

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop preload="none" />
      <OpeningScreen guestName={guestName} data={data} isOpen={invitationOpened} onOpen={handleOpenInvitation} />
      <TopNavbar coupleLabel={`${data.hero.brideName} & ${data.hero.groomName}`} />

      <main className="relative">
        <HeroSection data={data} />
        <IntroSection data={data} />
        <StorySection data={data} />
        <CountdownSection data={data} />
        <QuoteSection data={data} />
        <EventSection data={data} />
        <GallerySection data={data} />
        <RSVPSection data={data} guestName={guestName} />
        <ClosingSection data={data} />
      </main>

      <FloatingMusicButton enabled={Boolean(musicSrc) && invitationOpened} playing={isPlaying} onToggle={handleToggleMusic} />
    </>
  );
}
