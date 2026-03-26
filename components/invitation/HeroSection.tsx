"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import type { InvitationData } from "@/data/invitation";

export function HeroSection({ data }: { data: InvitationData }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="home" className="section-shell relative flex min-h-screen items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
      <Image
        src={data.hero.coverImage}
        alt={`${data.hero.brideName} and ${data.hero.groomName}`}
        fill
        priority
        className="object-cover opacity-[0.14]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-background/75 to-background" />
      <div className="ornament-blur left-[-2rem] top-24 h-44 w-44 bg-white/70" />
      <div className="ornament-blur right-[-3rem] top-40 h-56 w-56 bg-champagne/45" />

      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <AnimatedReveal className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-gold/80">{data.hero.title}</p>
          <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.9] text-cocoa sm:text-7xl lg:text-8xl">
            {data.hero.brideName}
            <span className="mx-2 inline-block text-4xl text-gold sm:text-5xl lg:text-6xl">&amp;</span>
            {data.hero.groomName}
          </h1>
          <div className="mt-8 flex items-center gap-4 text-cocoa/70">
            <div className="h-px flex-1 bg-gold/40" />
            <Heart className="h-4 w-4 text-gold" />
            <div className="h-px flex-1 bg-gold/40" />
          </div>
          <p className="mt-8 max-w-2xl font-display text-2xl italic text-cocoa/85 sm:text-3xl">{data.hero.quote}</p>
          <p className="mt-6 max-w-xl text-base leading-8 text-cocoa/75 sm:text-lg">{data.hero.blessing}</p>
          <div className="mt-10 inline-flex rounded-full border border-gold/20 bg-white/70 px-5 py-3 text-sm uppercase tracking-[0.3em] text-cocoa shadow-soft">
            {data.hero.dateLabel} • {data.hero.locationLabel}
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.15}>
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
            transition={shouldReduceMotion ? undefined : { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/40 p-8 shadow-soft"
          >
            <div className="absolute inset-0">
              <Image src="/images/gallery-3.jpg" alt="Engagement portrait" fill className="object-cover opacity-20" />
              <div className="absolute inset-0 bg-paper-glow opacity-90" />
            </div>
            <div className="relative">
              <p className="text-sm uppercase tracking-[0.35em] text-gold/80">A sacred union</p>
              <p className="mt-6 font-display text-4xl font-semibold text-cocoa">{data.hero.dateLabel}</p>
              <p className="mt-4 text-base leading-7 text-cocoa/75">
                We invite you to celebrate a day of devotion, joy, and beautiful shared memories with us.
              </p>
              <div className="mt-8 space-y-4 rounded-[1.75rem] bg-white/70 p-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cocoa/45">Ceremony</p>
                  <p className="mt-2 text-lg font-medium text-cocoa">{data.events[0]?.venue}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-cocoa/45">Reception</p>
                  <p className="mt-2 text-lg font-medium text-cocoa">{data.events[1]?.venue}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
