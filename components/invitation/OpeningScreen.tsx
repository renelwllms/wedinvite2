"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole, Sparkles } from "lucide-react";

import type { InvitationData } from "@/data/invitation";

type OpeningScreenProps = {
  guestName: string;
  data: InvitationData;
  isOpen: boolean;
  onOpen: () => void;
};

export function OpeningScreen({ guestName, data, isOpen, onOpen }: OpeningScreenProps) {
  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#1f1714]"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65 }}
        >
          <Image src={data.hero.coverImage} alt="Invitation cover" fill priority className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[#241714]/85" />
          <div className="absolute -left-12 top-16 h-48 w-48 rounded-full bg-champagne/20 blur-3xl" />
          <div className="absolute bottom-16 right-0 h-56 w-56 rounded-full bg-rose/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative mx-6 w-full max-w-md rounded-[2rem] border border-white/15 bg-white/10 p-8 text-center text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.45em] text-white/75">{data.hero.title}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-none sm:text-6xl">
              {data.hero.brideName}
              <span className="mx-3 text-3xl text-champagne sm:text-4xl">&amp;</span>
              {data.hero.groomName}
            </h1>
            <p className="mt-4 text-sm tracking-[0.3em] text-white/75">{data.hero.dateLabel}</p>

            <div className="mt-10 rounded-[1.5rem] border border-white/15 bg-black/15 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">To</p>
              <p className="mt-2 text-xl font-medium text-champagne">{guestName}</p>
            </div>

            <button
              type="button"
              onClick={onOpen}
              className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-champagne px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-cocoa transition hover:bg-[#f0e2c8] focus:outline-none focus:ring-2 focus:ring-white/70"
            >
              <LockKeyhole className="h-4 w-4" />
              Open Invitation
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
