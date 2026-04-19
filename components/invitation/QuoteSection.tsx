import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import type { InvitationData } from "@/data/invitation";

export function QuoteSection({ data }: { data: InvitationData }) {
  return (
    <section className="section-shell section-spacing px-4 sm:px-6 lg:px-8">
      <AnimatedReveal>
        <div className="texture-panel mx-auto max-w-6xl rounded-[2.5rem] border border-white/60 px-6 py-16 text-center shadow-soft sm:px-10 md:px-16">
          <p className="editorial-divider justify-center">{data.quoteBlock.caption}</p>
          <blockquote className="mx-auto mt-8 max-w-4xl text-balance font-display text-4xl leading-[1.18] tracking-[-0.03em] text-cocoa sm:text-5xl md:text-6xl">
            &quot;{data.quoteBlock.quote}&quot;
          </blockquote>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-taupe/65">{data.hero.dateLabel}</p>
        </div>
      </AnimatedReveal>
    </section>
  );
}
