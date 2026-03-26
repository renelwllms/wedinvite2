import Image from "next/image";
import { Instagram } from "lucide-react";

import type { InvitationData, PersonProfile } from "@/data/invitation";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";

function PersonCard({ person, role }: { person: PersonProfile; role: string }) {
  return (
    <div className="glass-panel rounded-[2rem] border border-white/40 p-5 shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
        <Image src={person.image} alt={person.fullName} fill className="object-cover" />
      </div>
      <p className="mt-6 text-sm uppercase tracking-[0.35em] text-gold/80">{role}</p>
      <h3 className="mt-3 font-display text-4xl font-semibold text-cocoa">{person.fullName}</h3>
      <p className="mt-3 text-base leading-7 text-cocoa/75">{person.parents}</p>
      {person.instagram ? (
        <a
          href={person.instagram}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/25 px-4 py-2 text-sm font-medium text-cocoa transition hover:bg-white/70"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>
      ) : null}
    </div>
  );
}

export function CoupleSection({ data }: { data: InvitationData }) {
  return (
    <SectionContainer
      id="couple"
      eyebrow="Bride & Groom"
      title="Two hearts, one celebration"
      description="Meet the bride and groom, and the families who have shaped this beautiful journey."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <AnimatedReveal>
          <PersonCard person={data.couple.bride} role="The Bride" />
        </AnimatedReveal>
        <AnimatedReveal delay={0.12}>
          <PersonCard person={data.couple.groom} role="The Groom" />
        </AnimatedReveal>
      </div>
    </SectionContainer>
  );
}
