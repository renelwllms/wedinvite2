import { CalendarPlus2, MapPinned, Radio } from "lucide-react";

import type { InvitationData } from "@/data/invitation";
import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";

export function EventSection({ data }: { data: InvitationData }) {
  return (
    <SectionContainer
      id="events"
      eyebrow="Celebration Details"
      title="Mark the moments"
      description="From the ceremony to the reception, here is where our day unfolds."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {data.events.map((event, index) => (
          <AnimatedReveal key={event.type} delay={index * 0.1}>
            <article className="glass-panel flex h-full flex-col rounded-[2rem] border border-white/40 p-6 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-gold/80">{event.type}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold text-cocoa">{event.venue}</h3>
              <div className="mt-6 space-y-4 text-cocoa/75">
                <p>{event.dateLabel}</p>
                <p>{event.timeLabel}</p>
                <p>{event.address}</p>
                {event.note ? <p className="text-sm text-cocoa/60">{event.note}</p> : null}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {event.mapsUrl ? (
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3a2a24]"
                  >
                    <MapPinned className="h-4 w-4" />
                    Maps
                  </a>
                ) : null}
                {event.calendarUrl ? (
                  <a
                    href={event.calendarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-4 py-2 text-sm font-medium text-cocoa transition hover:bg-white/70"
                  >
                    <CalendarPlus2 className="h-4 w-4" />
                    Calendar
                  </a>
                ) : null}
                {event.type.toLowerCase().includes("live") && data.livestream ? (
                  <a
                    href={data.livestream.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-gold/25 px-4 py-2 text-sm font-medium text-cocoa transition hover:bg-white/70"
                  >
                    <Radio className="h-4 w-4" />
                    Stream
                  </a>
                ) : null}
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
