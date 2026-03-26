"use client";

import { Camera, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";
import type { InvitationData } from "@/data/invitation";
import { copyText } from "@/lib/helpers";

export function GiftSection({ data }: { data: InvitationData }) {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);

  async function handleCopy(value: string) {
    try {
      await copyText(value);
      setCopiedValue(value);
      window.setTimeout(() => setCopiedValue(null), 1800);
    } catch {
      setCopiedValue(null);
    }
  }

  return (
    <SectionContainer
      id="gift"
      eyebrow="Share Your Moments"
      title="Help us keep the memories"
      description={data.gifts.intro}
      className="bg-white/20"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <AnimatedReveal>
          <article className="glass-panel rounded-[2rem] border border-white/40 p-6 shadow-soft sm:p-8">
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-gold" />
              <p className="text-sm uppercase tracking-[0.35em] text-gold/80">Photo request</p>
            </div>
            <h3 className="mt-4 font-display text-3xl text-cocoa">Send us the photos you take</h3>
            <p className="mt-4 max-w-2xl leading-7 text-cocoa/75">
              Instead of gifts, we would love to receive the candid photos and special moments you capture during our ceremony and celebration.
            </p>
            {data.gifts.photoRequestEmail ? (
              <div className="mt-8 rounded-[1.75rem] bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-cocoa/45">Email photos to</p>
                <p className="mt-3 text-lg font-medium text-cocoa sm:text-xl">{data.gifts.photoRequestEmail}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${data.gifts.photoRequestEmail}`}
                    className="inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a2a24]"
                  >
                    <Mail className="h-4 w-4" />
                    Open Email
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(data.gifts.photoRequestEmail!)}
                    className="inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-2 text-sm font-medium text-cocoa transition hover:bg-white/70"
                  >
                    {copiedValue === data.gifts.photoRequestEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copiedValue === data.gifts.photoRequestEmail ? "Copied" : "Copy email"}
                  </button>
                </div>
              </div>
            ) : null}
          </article>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <div className="glass-panel rounded-[2rem] border border-white/40 p-6 shadow-soft sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-gold/80">A small request</p>
            <h3 className="mt-4 font-display text-3xl text-cocoa">Candid moments mean the most</h3>
            <p className="mt-4 leading-7 text-cocoa/75">
              If you take photos of us, our families, or the celebration, please send them through after the ceremony. We would love to see the day through your eyes.
            </p>
            <div className="mt-8 rounded-[1.75rem] bg-white/80 p-5 text-sm leading-7 text-cocoa/70">
              Please include your name in the email subject so we know who captured each memory.
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </SectionContainer>
  );
}
