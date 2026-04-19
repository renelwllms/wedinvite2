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
import type { InvitationData, InvitationLocale } from "@/data/invitation";

type InvitationExperienceProps = {
  dataByLocale: Record<InvitationLocale, InvitationData>;
  guestName: string;
};

export function InvitationExperience({ dataByLocale, guestName }: InvitationExperienceProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [locale, setLocale] = useState<InvitationLocale>("en");

  const data = dataByLocale[locale];

  const musicSrc = useMemo(() => data.music?.src ?? "", [data.music?.src]);
  const musicStartAtSeconds = useMemo(() => data.music?.startAtSeconds ?? 0, [data.music?.startAtSeconds]);

  useEffect(() => {
    document.body.dataset.scrollLocked = invitationOpened ? "false" : "true";

    return () => {
      document.body.dataset.scrollLocked = "false";
    };
  }, [invitationOpened]);

  async function prepareMusicStartOffset() {
    if (!audioRef.current) {
      return;
    }

    if (musicStartAtSeconds <= 0) {
      return;
    }

    const audio = audioRef.current;

    if (audio.readyState >= 1) {
      audio.currentTime = musicStartAtSeconds;
      return;
    }

    await new Promise<void>((resolve) => {
      const handleLoadedMetadata = () => {
        audio.currentTime = musicStartAtSeconds;
        resolve();
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
      audio.load();
    });
  }

  async function startMusic(resetToStartOffset = false) {
    if (!audioRef.current || !musicSrc) {
      return;
    }

    try {
      const audio = audioRef.current;

      audio.volume = 0.45;

      if (resetToStartOffset) {
        await prepareMusicStartOffset();
      }

      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  async function handleOpenInvitation(nextLocale: InvitationLocale) {
    setLocale(nextLocale);
    setInvitationOpened(true);
    await startMusic(true);
  }

  async function handleToggleMusic() {
    if (!audioRef.current || !musicSrc) {
      return;
    }

    if (audioRef.current.paused) {
      await startMusic(false);
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
  }

  return (
    <>
      <audio ref={audioRef} src={musicSrc} loop preload="none" />
      <OpeningScreen
        guestName={guestName}
        data={data}
        isOpen={invitationOpened}
        onSelectLanguage={handleOpenInvitation}
      />
      <TopNavbar coupleLabel={`${data.hero.brideName} & ${data.hero.groomName}`} labels={data.ui.navbar} />

      <main className="relative">
        <HeroSection data={data} />
        <IntroSection data={data} />
        <StorySection data={data} />
        <CountdownSection data={data} />
        <QuoteSection data={data} />
        <EventSection data={data} />
        <GallerySection data={data} />
        <RSVPSection data={data} guestName={guestName} locale={locale} />
        <ClosingSection data={data} />
      </main>

      <FloatingMusicButton enabled={Boolean(musicSrc) && invitationOpened} playing={isPlaying} onToggle={handleToggleMusic} />
    </>
  );
}
