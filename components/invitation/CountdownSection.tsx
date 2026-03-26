"use client";

import { useEffect, useState } from "react";

import type { InvitationData } from "@/data/invitation";
import { getCountdown } from "@/lib/countdown";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";

const labels: Array<keyof ReturnType<typeof getCountdown>> = ["days", "hours", "minutes", "seconds"];

export function CountdownSection({ data }: { data: InvitationData }) {
  const [countdown, setCountdown] = useState(() => getCountdown(data.weddingDateISO));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdown(data.weddingDateISO));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [data.weddingDateISO]);

  return (
    <SectionContainer
      id="countdown"
      eyebrow="Save The Date"
      title="Counting down to forever"
      description="We would be honored to celebrate this day with you."
      className="pt-10"
    >
      <AnimatedReveal>
        <div className="glass-panel rounded-[2rem] border border-white/40 p-6 shadow-soft sm:p-10">
          {countdown.expired ? (
            <div className="text-center">
              <p className="font-display text-4xl text-cocoa">Today is the day</p>
              <p className="mt-4 text-cocoa/75">The celebration has begun. Thank you for being part of our story.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {labels.map((label) => (
                <div key={label} className="rounded-[1.5rem] bg-white/80 px-4 py-6 text-center shadow-sm">
                  <p className="font-display text-5xl font-semibold text-cocoa">
                    {String(countdown[label]).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.35em] text-cocoa/45">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimatedReveal>
    </SectionContainer>
  );
}
