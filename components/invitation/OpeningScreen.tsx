"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import type { InvitationData, InvitationLocale } from "@/data/invitation";

type OpeningScreenProps = {
  guestName: string;
  data: InvitationData;
  isOpen: boolean;
  onSelectLanguage: (locale: InvitationLocale) => void;
};

const languageCards: Array<{
  locale: InvitationLocale;
}> = [
  {
    locale: "en"
  },
  {
    locale: "id"
  }
];

export function OpeningScreen({ guestName, data, isOpen, onSelectLanguage }: OpeningScreenProps) {
  const openingCopy = data.ui.openingScreen;

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-[#1f1714] px-4 py-6"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65 }}
        >
          <motion.div
            initial={{ scale: 1.05, opacity: 0.35 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={data.hero.coverImage} alt="Invitation cover" fill priority className="object-cover opacity-70" />
          </motion.div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,16,13,0.82)_0%,rgba(38,27,22,0.64)_45%,rgba(36,23,20,0.76)_100%)]" />
          <div className="ornament-blur -left-10 top-16 h-48 w-48 bg-champagne/20" />
          <div className="ornament-blur bottom-14 right-0 h-56 w-56 bg-rose/20" />

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-auto w-full max-w-sm rounded-[2rem] border border-white/15 bg-white/10 px-5 py-6 text-center text-white shadow-2xl backdrop-blur-xl sm:max-w-md sm:p-8"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 sm:h-12 sm:w-12">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.26em] text-white/75 sm:mt-6 sm:text-sm sm:tracking-[0.45em]">
              {data.hero.familyLine}
            </p>
            <h1 className="mt-3 break-words font-display text-[3.2rem] font-semibold leading-[0.92] sm:mt-4 sm:text-6xl sm:leading-none">
              {data.hero.brideName}
              <span className="mx-2 text-2xl text-champagne sm:mx-3 sm:text-4xl">&amp;</span>
              {data.hero.groomName}
            </h1>
            <p className="mt-3 text-xs tracking-[0.18em] text-white/75 sm:mt-4 sm:text-sm sm:tracking-[0.3em]">{data.hero.dateLabel}</p>

            <div className="mt-6 rounded-[1.5rem] border border-white/15 bg-black/15 px-4 py-4 sm:mt-10 sm:px-5">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/60 sm:text-xs sm:tracking-[0.35em]">
                {openingCopy.reservedFor}
              </p>
              <p className="mt-2 break-words text-lg font-medium text-champagne sm:text-xl">{guestName}</p>
            </div>

            <div className="mt-6 text-center sm:mt-10">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/60 sm:text-xs sm:tracking-[0.35em]">
                {openingCopy.chooseLanguage}
              </p>
              <p className="mx-auto mt-2 max-w-[18rem] text-sm leading-6 text-white/70 sm:mt-3 sm:max-w-none">
                {openingCopy.chooseLanguageDescription}
              </p>
            </div>

            <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2">
              {languageCards.map((card) => (
                <button
                  key={card.locale}
                  type="button"
                  onClick={() => onSelectLanguage(card.locale)}
                  className="rounded-[1.5rem] border border-white/15 bg-white/10 px-4 py-4 text-center text-white transition hover:border-champagne/70 hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-white/70 sm:py-5"
                  aria-label={card.locale === "en" ? openingCopy.englishButton : openingCopy.bahasaButton}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] sm:text-base">
                    {card.locale === "en" ? openingCopy.englishLabel : openingCopy.bahasaLabel}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
