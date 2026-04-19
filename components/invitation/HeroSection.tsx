"use client";

import Image from "next/image";
import { ArrowDownRight, MapPinned } from "lucide-react";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import type { InvitationData } from "@/data/invitation";

export function HeroSection({ data }: { data: InvitationData }) {
  const heroCopy = data.ui.hero;

  return (
    <section id="home" className="section-shell relative flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <Image
        src={data.hero.coverImage}
        alt={`${data.hero.brideName} and ${data.hero.groomName}`}
        fill
        priority
        className="object-cover object-center opacity-70"
      />
      <div className="ornament-blur left-[-2rem] top-24 h-52 w-52 bg-white/50" />
      <div className="ornament-blur right-[-3rem] top-32 h-72 w-72 bg-champagne/35" />

      <div className="relative mx-auto max-w-5xl">
        <AnimatedReveal className="max-w-4xl rounded-[2rem] bg-[linear-gradient(180deg,rgba(24,17,14,0.22),rgba(24,17,14,0.1))] px-2 py-5 sm:px-4 sm:py-6 lg:rounded-[2.5rem] lg:bg-[linear-gradient(135deg,rgba(24,17,14,0.4),rgba(24,17,14,0.18))] lg:px-10 lg:py-10 lg:shadow-[0_28px_64px_rgba(18,12,10,0.22)]">
          <p className="text-sm uppercase tracking-[0.4em] text-[#f6ede3] drop-shadow-[0_4px_20px_rgba(8,6,5,0.58)] sm:text-[#f2e6d8]">
            {data.hero.familyLine}
          </p>
          {data.hero.scriptAccent ? (
            <p className="mt-6 font-script text-4xl text-[#efd19a] drop-shadow-[0_5px_18px_rgba(12,8,6,0.4)] sm:text-5xl">
              {data.hero.scriptAccent}
            </p>
          ) : null}
          <h1 className="mt-2 text-balance font-display text-6xl font-semibold leading-[0.88] tracking-[-0.05em] text-white drop-shadow-[0_10px_32px_rgba(30,22,18,0.25)] sm:text-7xl lg:max-w-[11ch] lg:text-[6.6rem]">
            {data.hero.brideName}
            <span className="mx-2 inline-block text-4xl text-champagne sm:text-5xl lg:text-6xl">&amp;</span>
            {data.hero.groomName}
          </h1>
          <p className="mt-6 max-w-xl text-balance text-sm uppercase tracking-[0.34em] text-[#fff5ea] drop-shadow-[0_5px_22px_rgba(8,6,5,0.62)] sm:text-base sm:text-[#f8ecde] lg:max-w-[32rem]">
            {data.hero.invitationLine}
          </p>
          <p className="mt-6 max-w-xl text-base font-medium leading-8 text-[#fff4ea] drop-shadow-[0_6px_22px_rgba(8,6,5,0.68)] sm:text-lg sm:text-[#f8ebdf] lg:max-w-[31rem]">
            {data.hero.blessing}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4 lg:gap-5">
            <a
              href="#intro"
              className="inline-flex items-center gap-3 rounded-full border border-[#f3dfc0]/80 bg-[#fff4e6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#352824] shadow-[0_10px_24px_rgba(24,17,14,0.18)] transition hover:bg-white"
            >
              {heroCopy.openInvitationCta}
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <p className="text-sm uppercase tracking-[0.28em] text-[#f7ebdc] drop-shadow-[0_4px_18px_rgba(8,6,5,0.58)] sm:text-[#f1e2d0]">
              {data.hero.dateLabel}
            </p>
          </div>

          <div className="mt-8 max-w-3xl rounded-[2rem] border border-white/35 bg-[rgba(255,248,241,0.78)] p-5 shadow-[0_24px_56px_rgba(28,20,17,0.14)] backdrop-blur-xl sm:p-6 lg:mt-10 lg:max-w-[42rem]">
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-taupe/65">{data.saveDate.eyebrow}</p>
            <div className="mt-4 space-y-4 text-cocoa">
              <p className="font-display text-xl font-normal leading-tight sm:text-2xl">{data.hero.title}</p>
              <div className="space-y-1">
                <p className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{data.couple.bride.fullName}</p>
                <p className="font-display text-2xl leading-none text-[#b89363] sm:text-3xl">&amp;</p>
                <p className="font-display text-3xl font-semibold leading-tight sm:text-4xl">{data.couple.groom.fullName}</p>
              </div>
            </div>
            <div className="mt-6 space-y-2 rounded-[1.5rem] bg-white/72 px-4 py-5 sm:px-5">
              <div className="space-y-0.5">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-taupe/52">On</p>
                <p className="font-display text-3xl font-semibold leading-none text-cocoa sm:text-4xl">{data.saveDate.title}</p>
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-taupe/52">At</p>
                <p className="font-display text-3xl font-semibold leading-none text-cocoa sm:text-4xl">{data.events[0]?.timeLabel}</p>
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-taupe/52">Location</p>
                <p className="text-base leading-7 text-taupe/82">{data.events[0]?.address}</p>
              </div>
              {data.events[0]?.mapsUrl ? (
                <div className="pt-2">
                  <a
                    href={data.events[0].mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a2a24]"
                  >
                    <MapPinned className="h-4 w-4" />
                    Open Location
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
