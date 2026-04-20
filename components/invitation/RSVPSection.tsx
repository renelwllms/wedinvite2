"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";
import type { InvitationData, InvitationLocale } from "@/data/invitation";
import type { RSVPFormValues } from "@/lib/validation";
import { createRsvpSchema } from "@/lib/validation";

type RSVPSectionProps = {
  data: InvitationData;
  guestName: string;
  locale: InvitationLocale;
};

type SubmitState = {
  type: "idle" | "success" | "error";
  message?: string;
};

export function RSVPSection({ data, guestName, locale }: RSVPSectionProps) {
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });
  const [submittedAcceptedWishes, setSubmittedAcceptedWishes] = useState<
    Array<{ id: string; fullName: string; message: string; createdAt: string }>
  >([]);
  const [isPending, startTransition] = useTransition();
  const rsvpCopy = data.ui.rsvp;
  const schema = useMemo(() => createRsvpSchema(rsvpCopy.validation), [rsvpCopy.validation]);
  const acceptedWishes = useMemo(() => {
    const seededAccepted = data.seededWishes
      .filter((entry) => entry.attendanceStatus === "attending")
      .map((entry) => ({
        id: entry.id,
        fullName: entry.fullName,
        message: entry.message,
        createdAt: entry.createdAt
      }));

    const merged = new Map<string, { id: string; fullName: string; message: string; createdAt: string }>();

    [...seededAccepted, ...submittedAcceptedWishes].forEach((entry) => {
      merged.set(entry.fullName, entry);
    });

    return Array.from(merged.values()).sort((left, right) => {
      if (left.createdAt === right.createdAt) {
        return left.fullName.localeCompare(right.fullName);
      }

      return right.createdAt.localeCompare(left.createdAt);
    });
  }, [data.seededWishes, submittedAcceptedWishes]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: guestName,
      attendanceStatus: "attending",
      message: ""
    }
  });

  const onSubmit = handleSubmit((values) => {
    setSubmitState({ type: "idle" });

    startTransition(() => {
      void fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...values, locale })
      })
        .then(async (response) => {
          const payload = (await response.json()) as { message?: string };

          if (!response.ok) {
            throw new Error(payload.message || rsvpCopy.error);
          }

          setSubmitState({
            type: "success",
            message: payload.message || rsvpCopy.success
          });
          if (values.attendanceStatus === "attending") {
            setSubmittedAcceptedWishes((current) => {
              const nextEntry = {
                id: `submitted-${values.fullName.toLowerCase().replace(/\s+/g, "-")}`,
                fullName: values.fullName,
                message: values.message,
                createdAt: new Date().toISOString()
              };

              return [...current.filter((entry) => entry.fullName !== values.fullName), nextEntry];
            });
          } else {
            setSubmittedAcceptedWishes((current) => current.filter((entry) => entry.fullName !== values.fullName));
          }
          reset({
            fullName: values.fullName,
            attendanceStatus: values.attendanceStatus,
            message: ""
          });
        })
        .catch((error: unknown) => {
          setSubmitState({
            type: "error",
            message: error instanceof Error ? error.message : rsvpCopy.error
          });
        });
    });
  });

  return (
    <SectionContainer
      id="rsvp"
      eyebrow={rsvpCopy.eyebrow}
      title={rsvpCopy.title}
      description={rsvpCopy.description}
    >
      <AnimatedReveal>
        <form
          onSubmit={onSubmit}
          className="mx-auto max-w-3xl rounded-[2.25rem] border border-white/60 bg-[#fbf6f0]/86 p-6 shadow-soft backdrop-blur sm:p-8 md:p-10"
        >
          <input type="hidden" {...register("fullName")} value={guestName} />

          <div className="space-y-4">
            <div className="rounded-[1.5rem] border border-gold/15 bg-white/78 px-4 py-4">
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-taupe/55">{rsvpCopy.reservedFor}</p>
              <p className="mt-2 text-lg font-medium text-cocoa sm:text-xl">{guestName}</p>
              {errors.fullName ? <span className="mt-2 block text-sm text-[#a94442]">{errors.fullName.message}</span> : null}
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cocoa">{rsvpCopy.attendance}</span>
              <select
                {...register("attendanceStatus")}
                className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
              >
                <option value="attending">{rsvpCopy.attendanceAccept}</option>
                <option value="not-attending">{rsvpCopy.attendanceDecline}</option>
              </select>
              {errors.attendanceStatus ? (
                <span className="mt-2 block text-sm text-[#a94442]">{errors.attendanceStatus.message}</span>
              ) : null}
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-cocoa">{rsvpCopy.message}</span>
            <textarea
              {...register("message")}
              rows={5}
              className="w-full rounded-[1.5rem] border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
              placeholder={rsvpCopy.messagePlaceholder}
            />
            {errors.message ? <span className="mt-2 block text-sm text-[#a94442]">{errors.message.message}</span> : null}
          </label>

          <div className="mt-6 flex flex-col items-center gap-4 text-center">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-w-[15rem] items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#3a2a24] disabled:opacity-60"
            >
              {isPending ? rsvpCopy.sending : rsvpCopy.send}
            </button>

            {submitState.type !== "idle" ? (
              <p className={submitState.type === "success" ? "text-sm text-taupe/80" : "text-sm text-[#a94442]"}>
                {submitState.message}
              </p>
            ) : null}
          </div>
        </form>
      </AnimatedReveal>

      {acceptedWishes.length > 0 ? (
        <AnimatedReveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl rounded-[2.25rem] border border-white/60 bg-[#fbf6f0]/78 p-6 shadow-soft backdrop-blur sm:p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-gold/80">{rsvpCopy.acceptedTitle}</p>
            <p className="mt-3 text-base leading-7 text-taupe/78">{rsvpCopy.acceptedDescription}</p>
            <div className="mt-6 space-y-4">
              {acceptedWishes.map((entry) => (
                <article key={entry.id} className="rounded-[1.5rem] border border-gold/15 bg-white/78 px-4 py-4 sm:px-5">
                  <p className="font-display text-2xl text-cocoa">{entry.fullName}</p>
                  <p className="mt-2 leading-7 text-taupe/78">{entry.message}</p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedReveal>
      ) : null}
    </SectionContainer>
  );
}
