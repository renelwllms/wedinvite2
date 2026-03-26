import Image from "next/image";

import type { InvitationData } from "@/data/invitation";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";

export function StorySection({ data }: { data: InvitationData }) {
  return (
    <SectionContainer
      id="story"
      eyebrow="Our Journey"
      title="A love written over time"
      description="The milestones that brought us to this promise."
      className="bg-white/20"
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="timeline-line absolute left-[1.1rem] top-0 h-full w-px sm:left-1/2 sm:-translate-x-1/2" />
        <div className="space-y-10">
          {data.story.map((item, index) => (
            <AnimatedReveal key={item.year} delay={index * 0.1}>
              <div className={`grid items-center gap-6 sm:grid-cols-2 ${index % 2 === 1 ? "sm:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative pl-10 sm:pl-0">
                  <span className="absolute left-0 top-3 z-10 h-4 w-4 rounded-full border-4 border-background bg-gold sm:left-1/2 sm:-translate-x-1/2" />
                  <div className="glass-panel rounded-[2rem] border border-white/40 p-6 shadow-soft">
                    <p className="text-sm uppercase tracking-[0.35em] text-gold/80">{item.year}</p>
                    <h3 className="mt-3 font-display text-3xl text-cocoa">{item.title}</h3>
                    <p className="mt-4 leading-7 text-cocoa/75">{item.description}</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-[2rem] shadow-soft">
                  <Image src={item.image} alt={item.title} width={900} height={700} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
