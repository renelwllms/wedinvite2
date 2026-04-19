import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";
import type { InvitationData } from "@/data/invitation";

export function IntroSection({ data }: { data: InvitationData }) {
  return (
    <SectionContainer
      id="intro"
      eyebrow={data.intro.eyebrow}
      title={data.intro.title}
      description={data.intro.message}
      className="pt-0"
    >
      <AnimatedReveal>
        <div className="mx-auto max-w-3xl text-center">
          <div className="texture-panel rounded-[2rem] border border-white/60 px-6 py-8 shadow-panel sm:px-10">
            <p className="text-sm uppercase tracking-[0.32em] text-taupe/65">{data.ui.intro.quoteLead}</p>
            <p className="mx-auto mt-5 max-w-2xl text-balance font-display text-2xl italic leading-[1.5] text-cocoa sm:text-3xl">
              {data.hero.quote}
            </p>
          </div>
        </div>
      </AnimatedReveal>
    </SectionContainer>
  );
}
