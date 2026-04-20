"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { CSSProperties } from "react";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import type { InvitationData } from "@/data/invitation";
import { getCountdown, type CountdownState } from "@/lib/countdown";

const initialCountdown: CountdownState = {
  total: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: false
};

function TimerHeartCard({
  unit,
  value,
  label,
  rolling = false
}: {
  unit: "days" | "hours" | "minutes" | "seconds";
  value: number;
  label: string;
  rolling?: boolean;
}) {
  const progressMax = {
    days: 29,
    hours: 23,
    minutes: 59,
    seconds: 59
  }[unit];

  const progress = Math.min(1, Math.max(0, (progressMax - value) / progressMax));
  const startRed = Math.round(255 - progress * 78);
  const startGreen = Math.round(247 - progress * 121);
  const startBlue = Math.round(243 - progress * 112);
  const endRed = Math.round(246 - progress * 94);
  const endGreen = Math.round(232 - progress * 146);
  const endBlue = Math.round(224 - progress * 123);
  const shadowAlpha = (0.1 + progress * 0.14).toFixed(2);
  const ringAlpha = (0.75 - progress * 0.28).toFixed(2);
  const mutedAlpha = (0.56 + progress * 0.22).toFixed(2);
  const textColor = progress > 0.48 ? "rgb(255 248 242)" : "var(--cocoa)";
  const labelColor = progress > 0.48 ? `rgba(255, 238, 241, ${mutedAlpha})` : `rgba(91, 74, 66, ${mutedAlpha})`;
  const gradientId = `heart-gradient-${unit}`;

  return (
    <div className="mx-auto w-full max-w-[10.25rem] sm:max-w-[11.25rem]">
      <div className="relative aspect-[1/1.04]">
        <svg
          viewBox="0 0 120 110"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full drop-shadow-[0_18px_28px_rgba(121,58,79,var(--tw-shadow-alpha))]"
          style={{ ["--tw-shadow-alpha" as string]: shadowAlpha } as CSSProperties}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={`rgba(${startRed}, ${startGreen}, ${startBlue}, 0.98)`} />
              <stop offset="100%" stopColor={`rgba(${endRed}, ${endGreen}, ${endBlue}, 0.94)`} />
            </linearGradient>
          </defs>
          <path
            d="M60 106.5 51.3 98.7C20.4 70.7 0 52.2 0 29.7 0 11.3 14.6 0 30 0c11 0 21.4 5.1 28.3 13.2C65.1 5.1 75.6 0 86.6 0 102 0 117 11.3 117 29.7c0 22.5-20.4 41-51.3 69L60 106.5Z"
            fill={`url(#${gradientId})`}
            stroke={`rgba(255,255,255,${ringAlpha})`}
            strokeWidth="1.8"
          />
          <path
            d="M58 16.5C50.3 7.9 39.8 4.8 31.7 4.8 18.8 4.8 6.8 13.7 6.8 29c0 19.3 18.3 36 45.1 60.1l8.1 7.2"
            fill="none"
            stroke="rgba(255,255,255,0.26)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 z-10 text-center">
          <div className="absolute left-1/2 top-[39%] h-16 w-[54%] -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:h-[4.5rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={value}
                initial={rolling ? { y: -28, opacity: 0 } : undefined}
                animate={{ y: 0, opacity: 1 }}
                exit={rolling ? { y: 28, opacity: 0 } : undefined}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-display text-[2.4rem] font-semibold leading-none sm:text-[3.1rem]" style={{ color: textColor }}>
                  {String(value).padStart(2, "0")}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="absolute top-[53%] left-1/2 w-[60%] -translate-x-1/2 text-[0.58rem] uppercase tracking-[0.26em] sm:text-[0.62rem] sm:tracking-[0.32em]" style={{ color: labelColor }}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CountdownSection({ data }: { data: InvitationData }) {
  const [countdown, setCountdown] = useState<CountdownState>(initialCountdown);
  const [hasMounted, setHasMounted] = useState(false);
  const countdownCopy = data.ui.countdown;
  const labels = [
    { key: "days", label: countdownCopy.days },
    { key: "hours", label: countdownCopy.hours },
    { key: "minutes", label: countdownCopy.minutes }
  ] as const;
  const timerItems: Array<{
    key: "days" | "hours" | "minutes" | "seconds";
    label: string;
  }> = [...labels, { key: "seconds", label: countdownCopy.seconds }];

  useEffect(() => {
    setHasMounted(true);
    setCountdown(getCountdown(data.weddingDateISO));

    const interval = window.setInterval(() => {
      setCountdown(getCountdown(data.weddingDateISO));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [data.weddingDateISO]);

  return (
    <section id="date" className="section-shell px-4 pb-[5.5rem] pt-10 sm:px-6 lg:px-8 md:pb-[7rem]">
      <div className="mx-auto max-w-6xl">
      <AnimatedReveal>
        <div className="relative overflow-hidden rounded-[2.75rem] border border-white/65 bg-[linear-gradient(145deg,rgba(255,250,245,0.96),rgba(244,229,219,0.88))] p-6 text-center shadow-[0_30px_70px_rgba(87,63,49,0.12)] sm:p-10 md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.78),transparent_45%),radial-gradient(circle_at_bottom,rgba(214,177,153,0.18),transparent_42%)]" />
          <div className="ornament-blur left-[-2rem] top-6 h-28 w-28 bg-[#f6d2cb]/40" />
          <div className="ornament-blur bottom-2 right-[-1rem] h-36 w-36 bg-[#f1e0c2]/45" />

          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-taupe/65">{data.saveDate.venue}</p>

            {hasMounted && countdown.expired ? (
              <div className="mx-auto mt-10 max-w-2xl rounded-[2.2rem] border border-white/60 bg-white/72 px-6 py-10 shadow-[0_16px_40px_rgba(80,58,44,0.09)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3f0] text-[#c97f84] shadow-soft">
                  <Heart className="h-7 w-7 fill-current" />
                </div>
                <p className="mt-7 font-display text-4xl text-cocoa sm:text-5xl">{countdownCopy.todayTitle}</p>
                <p className="mt-4 text-base leading-8 text-taupe/78">{countdownCopy.todayDescription}</p>
              </div>
            ) : (
              <div className="mt-10">
                <div className="mx-auto max-w-3xl rounded-[2.35rem] border border-white/65 bg-white/68 px-6 py-8 shadow-[0_18px_44px_rgba(78,55,43,0.1)] backdrop-blur-md sm:px-8 sm:py-10">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#e9cbb8] bg-[#fff8f4] text-[#cb8d95] shadow-soft">
                    <Heart className="h-7 w-7 fill-current" />
                  </div>
                  <p className="mt-6 font-script text-4xl text-[#b98973] sm:text-5xl">Counting down to forever</p>
                  <p className="mt-4 font-display text-4xl font-semibold text-cocoa sm:text-5xl">{data.saveDate.title}</p>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-taupe/74">{countdownCopy.introDescription}</p>
                </div>

                <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                  {timerItems.map((label) => (
                    <TimerHeartCard
                      key={label.key}
                      unit={label.key}
                      value={countdown[label.key as keyof CountdownState] as number}
                      label={label.label}
                      rolling={label.key === "seconds"}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedReveal>
      </div>
    </section>
  );
}
