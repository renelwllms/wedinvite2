import type { InvitationData } from "@/data/invitation";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";

export function ClosingSection({ data }: { data: InvitationData }) {
  return (
    <section className="section-shell px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <AnimatedReveal>
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/40 bg-[#2b1f1a] px-8 py-16 text-center text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne/70">Thank You</p>
          <h2 className="mt-5 font-display text-5xl font-semibold sm:text-6xl">
            {data.hero.brideName} &amp; {data.hero.groomName}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
            {data.closing.thankYou}
          </p>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-champagne/70">{data.closing.familyGreeting}</p>
          <p className="mt-10 text-xs uppercase tracking-[0.3em] text-white/40">{data.closing.footerCredit}</p>
        </div>
      </AnimatedReveal>
    </section>
  );
}
