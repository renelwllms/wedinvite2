"use client";

import { useEffect, useState } from "react";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";
import type { InvitationData } from "@/data/invitation";
import { getCountdown, type CountdownState } from "@/lib/countdown";

const labels: Array<keyof Pick<CountdownState, "months" | "days" | "hours">> = ["months", "days", "hours"];

const initialCountdown: CountdownState = {
  total: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  expired: false
};

export function CountdownSection({ data }: { data: InvitationData }) {
  const [countdown, setCountdown] = useState<CountdownState>(initialCountdown);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setCountdown(getCountdown(data.weddingDateISO));

    const interval = window.setInterval(() => {
      setCountdown(getCountdown(data.weddingDateISO));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [data.weddingDateISO]);

  return (
    <SectionContainer
      id="date"
      eyebrow={data.saveDate.eyebrow}
      title={data.saveDate.title}
      description={data.saveDate.location}
      className="pt-10"
    >
      <AnimatedReveal>
        <div className="texture-panel rounded-[2.5rem] border border-white/60 p-6 text-center shadow-soft sm:p-10 md:p-14">
          <p className="text-sm uppercase tracking-[0.35em] text-taupe/65">{data.saveDate.venue}</p>
          {hasMounted && countdown.expired ? (
            <div className="text-center">
              <p className="mt-8 font-display text-4xl text-cocoa sm:text-5xl">Today is the day</p>
              <p className="mt-4 text-taupe/78">The celebration has begun. Thank you for being part of our story.</p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-3 gap-4">
              {labels.map((label) => (
                <div key={label} className="rounded-[1.75rem] bg-white/78 px-4 py-6 text-center shadow-sm">
                  <p className="font-display text-4xl font-semibold text-cocoa sm:text-5xl">
                    {String(countdown[label]).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.35em] text-taupe/45">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </AnimatedReveal>
    </SectionContainer>
  );
}
