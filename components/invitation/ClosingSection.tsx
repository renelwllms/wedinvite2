import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import type { InvitationData } from "@/data/invitation";

export function ClosingSection({ data }: { data: InvitationData }) {
  return (
    <footer className="section-shell px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <AnimatedReveal>
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/40 bg-[#2e241f] px-8 py-14 text-center text-white shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-champagne/70">{data.ui.closingSection.eyebrow}</p>
          <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            {data.hero.brideName} &amp; {data.hero.groomName}
          </h2>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/60">{data.hero.dateLabel}</p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">{data.closing.thankYou}</p>
          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-champagne/70">{data.closing.familyGreeting}</p>
          {data.closing.footerCreditUrl ? (
            <a
              href={data.closing.footerCreditUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block text-xs uppercase tracking-[0.3em] text-white/50 transition hover:text-champagne"
            >
              {data.closing.footerCredit}
            </a>
          ) : (
            <p className="mt-10 text-xs uppercase tracking-[0.3em] text-white/40">{data.closing.footerCredit}</p>
          )}
        </div>
      </AnimatedReveal>
    </footer>
  );
}
