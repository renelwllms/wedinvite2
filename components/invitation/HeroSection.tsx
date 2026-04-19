"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import type { InvitationData } from "@/data/invitation";

export function HeroSection({ data }: { data: InvitationData }) {
  const shouldReduceMotion = useReducedMotion();
  const heroCopy = data.ui.hero;

  return (
    <section id="home" className="section-shell relative flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <Image
        src={data.hero.coverImage}
        alt={`${data.hero.brideName} and ${data.hero.groomName}`}
        fill
        priority
        className="object-cover object-center opacity-[0.38] sm:opacity-[0.42]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,14,12,0.94)_0%,rgba(31,23,19,0.88)_36%,rgba(49,37,31,0.58)_62%,rgba(247,240,232,0.14)_100%)] sm:bg-[linear-gradient(90deg,rgba(24,17,14,0.9)_0%,rgba(34,25,21,0.78)_34%,rgba(55,41,34,0.48)_60%,rgba(247,240,232,0.1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_46%,rgba(18,12,10,0.54)_0%,rgba(18,12,10,0.36)_24%,rgba(18,12,10,0)_58%)] sm:bg-[radial-gradient(circle_at_28%_44%,rgba(20,13,11,0.38)_0%,rgba(20,13,11,0.22)_24%,rgba(20,13,11,0)_56%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,15,0.28)_0%,rgba(40,28,23,0.26)_46%,rgba(247,240,232,0.84)_80%,rgba(247,240,232,1)_100%)]" />
      <div className="ornament-blur left-[-2rem] top-24 h-52 w-52 bg-white/50" />
      <div className="ornament-blur right-[-3rem] top-32 h-72 w-72 bg-champagne/35" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <AnimatedReveal className="max-w-3xl rounded-[2rem] bg-[linear-gradient(180deg,rgba(24,17,14,0.18),rgba(24,17,14,0.08))] px-2 py-5 sm:px-4 sm:py-6 lg:max-w-[42rem] lg:self-start lg:rounded-[2.5rem] lg:bg-[linear-gradient(135deg,rgba(24,17,14,0.38),rgba(24,17,14,0.18))] lg:px-10 lg:py-10 lg:shadow-[0_28px_64px_rgba(18,12,10,0.22)]">
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
          <p className="mt-8 max-w-2xl text-balance font-display text-2xl italic text-white/95 drop-shadow-[0_5px_22px_rgba(8,6,5,0.52)] sm:text-3xl sm:text-white/90 lg:max-w-[34rem]">
            {data.hero.quote}
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/88 drop-shadow-[0_4px_20px_rgba(8,6,5,0.5)] sm:text-lg sm:text-white/78 lg:max-w-[31rem]">
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
            <p className="text-sm uppercase tracking-[0.28em] text-[#f7ebdc] drop-shadow-[0_4px_18px_rgba(8,6,5,0.58)] sm:text-[#f1e2d0] lg:max-w-[16rem]">
              {data.hero.dateLabel}
            </p>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.15}>
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="glass-panel relative overflow-hidden rounded-[2.25rem] border border-white/35 p-6 sm:p-8"
          >
            <div className="absolute inset-0">
              <Image src="/images/wedding-photo-8.jpg" alt="Engagement portrait" fill className="object-cover opacity-28" />
              <div className="absolute inset-0 bg-paper-glow opacity-95" />
            </div>
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.35em] text-gold/80">{data.hero.title}</p>
              <p className="mt-6 font-display text-4xl font-semibold leading-tight text-cocoa">{data.saveDate.title}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.26em] text-taupe/70">{data.saveDate.venue}</p>
              <p className="mt-5 text-base leading-7 text-taupe/78">{data.saveDate.location}</p>
              <div className="mt-8 grid gap-4 rounded-[1.75rem] bg-white/72 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-taupe/50">{heroCopy.ceremonyLabel}</p>
                  <p className="mt-2 text-lg font-medium text-cocoa">{data.events[0]?.timeLabel}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-taupe/50">{heroCopy.receptionLabel}</p>
                  <p className="mt-2 text-lg font-medium text-cocoa">{data.events[1]?.timeLabel}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
