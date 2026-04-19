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
        className="object-cover object-center opacity-[0.46]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,19,16,0.88)_0%,rgba(35,26,22,0.76)_34%,rgba(55,41,34,0.46)_60%,rgba(247,240,232,0.08)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,22,18,0.28)_0%,rgba(52,38,31,0.18)_42%,rgba(247,240,232,0.8)_78%,rgba(247,240,232,1)_100%)]" />
      <div className="ornament-blur left-[-2rem] top-24 h-52 w-52 bg-white/50" />
      <div className="ornament-blur right-[-3rem] top-32 h-72 w-72 bg-champagne/35" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
        <AnimatedReveal className="max-w-3xl pt-10 sm:pt-16">
          <p className="text-sm uppercase tracking-[0.4em] text-taupe/70">{data.hero.familyLine}</p>
          {data.hero.scriptAccent ? (
            <p className="mt-6 font-script text-4xl text-sand sm:text-5xl">{data.hero.scriptAccent}</p>
          ) : null}
          <h1 className="mt-2 text-balance font-display text-6xl font-semibold leading-[0.88] tracking-[-0.05em] text-white drop-shadow-[0_10px_32px_rgba(30,22,18,0.25)] sm:text-7xl lg:text-[7rem]">
            {data.hero.brideName}
            <span className="mx-2 inline-block text-4xl text-champagne sm:text-5xl lg:text-6xl">&amp;</span>
            {data.hero.groomName}
          </h1>
          <p className="mt-6 max-w-xl text-balance text-sm uppercase tracking-[0.34em] text-white/78 sm:text-base">
            {data.hero.invitationLine}
          </p>
          <p className="mt-8 max-w-2xl text-balance font-display text-2xl italic text-white/88 sm:text-3xl">{data.hero.quote}</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/74 sm:text-lg">{data.hero.blessing}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#intro"
              className="inline-flex items-center gap-3 rounded-full bg-[#f7efe6] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-cocoa transition hover:bg-white"
            >
              {heroCopy.openInvitationCta}
              <ArrowDownRight className="h-4 w-4" />
            </a>
            <p className="text-sm uppercase tracking-[0.28em] text-white/72">{data.hero.dateLabel}</p>
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
