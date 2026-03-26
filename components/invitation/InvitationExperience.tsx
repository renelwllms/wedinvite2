"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ClosingSection } from "@/components/invitation/ClosingSection";
import { CountdownSection } from "@/components/invitation/CountdownSection";
import { CoupleSection } from "@/components/invitation/CoupleSection";
import { EventSection } from "@/components/invitation/EventSection";
import { FloatingMusicButton } from "@/components/invitation/FloatingMusicButton";
import { FloatingNav } from "@/components/invitation/FloatingNav";
import { GallerySection } from "@/components/invitation/GallerySection";
import { GiftSection } from "@/components/invitation/GiftSection";
import { HeroSection } from "@/components/invitation/HeroSection";
import { OpeningScreen } from "@/components/invitation/OpeningScreen";
import { RSVPSection } from "@/components/invitation/RSVPSection";
import { StorySection } from "@/components/invitation/StorySection";
import type { InvitationData } from "@/data/invitation";

type InvitationExperienceProps = {
  data: InvitationData;
  guestName: string;
};

const sectionIds = ["home", "couple", "events", "gallery", "rsvp", "gift"];

export function InvitationExperience({ data, guestName }: InvitationExperienceProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const musicSrc = useMemo(() => data.music?.src ?? "", [data.music?.src]);

  useEffect(() => {
    document.body.dataset.scrollLocked = invitationOpened ? "false" : "true";

    return () => {
      document.body.dataset.scrollLocked = "false";
    };
  }, [invitationOpened]);

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) {
        return null;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-35% 0px -50% 0px", threshold: 0.2 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
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

      <main className="relative">
        <HeroSection data={data} />
        <CoupleSection data={data} />
        <CountdownSection data={data} />
        <EventSection data={data} />
        <GallerySection data={data} />
        <StorySection data={data} />
        <RSVPSection data={data} guestName={guestName} />
        <GiftSection data={data} />
        <ClosingSection data={data} />
      </main>

      <FloatingNav activeSection={activeSection} />
      <FloatingMusicButton enabled={Boolean(musicSrc) && invitationOpened} playing={isPlaying} onToggle={handleToggleMusic} />
    </>
  );
}
