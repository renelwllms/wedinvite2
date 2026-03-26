"use client";

import dayjs from "dayjs";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";
import type { InvitationData, WishEntry } from "@/data/invitation";
import { createMockRSVPStore } from "@/lib/rsvp-store";
import type { RSVPFormValues } from "@/lib/validation";
import { rsvpSchema } from "@/lib/validation";

type RSVPSectionProps = {
  data: InvitationData;
  guestName: string;
};

export function RSVPSection({ data, guestName }: RSVPSectionProps) {
  const store = useMemo(() => createMockRSVPStore(data.seededWishes), [data.seededWishes]);
  const [entries, setEntries] = useState<WishEntry[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      guestName,
      message: "",
      attendanceStatus: "attending"
    }
  });

  useEffect(() => {
    store.list().then(setEntries);
  }, [store]);

  const summary = useMemo(
    () =>
      entries.reduce(
        (acc, entry) => {
          if (entry.attendanceStatus === "attending") {
            acc.attending += 1;
          } else {
            acc.notAttending += 1;
          }

          return acc;
        },
        { attending: 0, notAttending: 0 }
      ),
    [entries]
  );

  const onSubmit = handleSubmit((values) => {
    setStatusMessage(null);

    void store
      .create(values)
      .then((entry) => {
        startTransition(() => {
          setEntries((current) => [entry, ...current]);
        });
        setStatusMessage("Thank you. Your RSVP and wishes have been received.");
        reset({
          guestName: values.guestName,
          attendanceStatus: values.attendanceStatus,
          guestCount: undefined,
          message: ""
        });
      })
      .catch(() => {
        setStatusMessage("Something went wrong while saving your response.");
      });
  });

  return (
    <SectionContainer
      id="rsvp"
      eyebrow="RSVP & Wishes"
      title="Let us know if you can join us"
      description="Please confirm your attendance and leave a blessing for the couple."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <AnimatedReveal>
          <div className="glass-panel rounded-[2rem] border border-white/40 p-6 shadow-soft sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-cocoa/45">Attending</p>
                <p className="mt-3 font-display text-5xl text-cocoa">{summary.attending}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/80 p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-cocoa/45">Unable to attend</p>
                <p className="mt-3 font-display text-5xl text-cocoa">{summary.notAttending}</p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-cocoa">Guest name</span>
                <input
                  {...register("guestName")}
                  className="w-full rounded-2xl border border-gold/15 bg-white/80 px-4 py-3 outline-none transition focus:border-gold"
                  placeholder="Your name"
                />
                {errors.guestName ? <span className="mt-2 block text-sm text-[#a94442]">{errors.guestName.message}</span> : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-cocoa">Attendance</span>
                <select
                  {...register("attendanceStatus")}
                  className="w-full rounded-2xl border border-gold/15 bg-white/80 px-4 py-3 outline-none transition focus:border-gold"
                >
                  <option value="attending">Attending</option>
                  <option value="not-attending">Not attending</option>
                </select>
                {errors.attendanceStatus ? (
                  <span className="mt-2 block text-sm text-[#a94442]">{errors.attendanceStatus.message}</span>
                ) : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-cocoa">Number of guests</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  {...register("guestCount")}
                  className="w-full rounded-2xl border border-gold/15 bg-white/80 px-4 py-3 outline-none transition focus:border-gold"
                  placeholder="Optional"
                />
                {errors.guestCount ? <span className="mt-2 block text-sm text-[#a94442]">{errors.guestCount.message}</span> : null}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-cocoa">Wish or blessing</span>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="w-full rounded-2xl border border-gold/15 bg-white/80 px-4 py-3 outline-none transition focus:border-gold"
                  placeholder="Share your wishes for the couple"
                />
                {errors.message ? <span className="mt-2 block text-sm text-[#a94442]">{errors.message.message}</span> : null}
              </label>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex w-full items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#3a2a24] disabled:opacity-60"
              >
                {isPending ? "Sending..." : "Submit RSVP"}
              </button>

              {statusMessage ? <p className="text-sm text-cocoa/75">{statusMessage}</p> : null}
            </form>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={0.1}>
          <div className="glass-panel rounded-[2rem] border border-white/40 p-6 shadow-soft sm:p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-gold/80">Guest wishes</p>
            <div className="mt-6 space-y-4">
              {entries.map((entry) => (
                <article key={entry.id} className="rounded-[1.5rem] bg-white/80 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-medium text-cocoa">{entry.guestName}</h3>
                      <p className="mt-1 text-sm text-cocoa/55">
                        {entry.attendanceStatus === "attending" ? "Attending" : "Not attending"}
                        {entry.guestCount ? ` â€¢ ${entry.guestCount} guest(s)` : ""}
                      </p>
                    </div>
                    <p className="text-sm text-cocoa/45">{dayjs(entry.createdAt).format("DD MMM YYYY")}</p>
                  </div>
                  <p className="mt-4 leading-7 text-cocoa/75">{entry.message}</p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </SectionContainer>
  );
}
