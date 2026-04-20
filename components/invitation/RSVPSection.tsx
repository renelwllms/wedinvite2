"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";
import type { InvitationData } from "@/data/invitation";
import { createMockRSVPStore } from "@/lib/rsvp-store";
import type { RSVPFormValues } from "@/lib/validation";
import { createRsvpSchema } from "@/lib/validation";

type RSVPSectionProps = {
  data: InvitationData;
  guestName: string;
};

type SubmitState = {
  type: "idle" | "success" | "error";
  message?: string;
};

export function RSVPSection({ data, guestName }: RSVPSectionProps) {
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });
  const [responses, setResponses] = useState<
    Array<{
      id: string;
      fullName: string;
      attendanceStatus: "attending" | "not-attending";
      message: string;
      createdAt: string;
    }>
  >([]);
  const [isPending, startTransition] = useTransition();
  const rsvpCopy = data.ui.rsvp;
  const schema = useMemo(() => createRsvpSchema(rsvpCopy.validation), [rsvpCopy.validation]);
  const rsvpStore = useMemo(() => createMockRSVPStore(data.seededWishes), [data.seededWishes]);
  const allowLocalFallback =
    typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname);

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

  const loadAcceptedWishes = useCallback(async () => {
    const seededResponses = data.seededWishes.map((entry) => ({
      id: entry.id,
      fullName: entry.fullName,
      attendanceStatus: entry.attendanceStatus,
      message: entry.message,
      createdAt: entry.createdAt
    }));

    try {
      const response = await fetch("/api/rsvp", { cache: "no-store" });
      const payload = (await response.json()) as {
        entries?: Array<{ id: string; fullName: string; attendanceStatus: "attending" | "not-attending"; message: string; createdAt: string }>;
      };

      if (!response.ok) {
        throw new Error("RSVP storage is unavailable.");
      }

      const merged = new Map<
        string,
        {
          id: string;
          fullName: string;
          attendanceStatus: "attending" | "not-attending";
          message: string;
          createdAt: string;
        }
      >();

      [...seededResponses, ...(payload.entries ?? [])].forEach((entry) => {
        merged.set(entry.fullName, entry);
      });

      setResponses(
        Array.from(merged.values()).sort((left, right) => right.createdAt.localeCompare(left.createdAt))
      );
    } catch {
      if (!allowLocalFallback) {
        setResponses(seededResponses);
        return;
      }

      const entries = await rsvpStore.list();
      setResponses(entries);
    }
  }, [allowLocalFallback, data.seededWishes, rsvpStore]);

  useEffect(() => {
    let cancelled = false;

    void loadAcceptedWishes().catch(() => {
      if (!cancelled) {
        setResponses([]);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [loadAcceptedWishes]);

  const onSubmit = handleSubmit((values) => {
    setSubmitState({ type: "idle" });

    startTransition(() => {
      void (async () => {
        try {
          let entry:
            | { id: string; fullName: string; attendanceStatus: "attending" | "not-attending"; message: string; createdAt: string }
            | undefined;

          try {
            const response = await fetch("/api/rsvp", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(values)
            });
            const contentType = response.headers.get("content-type") ?? "";
            const payload = contentType.includes("application/json")
              ? ((await response.json()) as {
                  message?: string;
                  entry?: { id: string; fullName: string; attendanceStatus: "attending" | "not-attending"; message: string; createdAt: string };
                })
              : { message: await response.text() };

            if (!response.ok) {
              throw new Error(payload.message || rsvpCopy.error);
            }

            entry = payload.entry;
            setSubmitState({
              type: "success",
              message: payload.message || `${values.fullName}, ${rsvpCopy.success}`
            });
          } catch (error) {
            if (!allowLocalFallback) {
              throw error;
            }

            const localEntry = await rsvpStore.create(values);
            entry = {
              id: localEntry.id,
              fullName: localEntry.fullName,
              attendanceStatus: localEntry.attendanceStatus,
              message: localEntry.message,
              createdAt: localEntry.createdAt
            };
            setSubmitState({
              type: "success",
              message: `${localEntry.fullName}, ${rsvpCopy.success}`
            });
          }

          if (!entry) {
            throw new Error(rsvpCopy.error);
          }

          setSubmitState({
            type: "success",
            message: `${entry.fullName}, ${rsvpCopy.success}`
          });
          setResponses((current) => {
            const nextEntry = {
              id: entry.id,
              fullName: entry.fullName,
              attendanceStatus: values.attendanceStatus,
              message: values.message,
              createdAt: entry.createdAt
            };

            return [...current.filter((item) => item.fullName !== values.fullName), nextEntry].sort((left, right) =>
              right.createdAt.localeCompare(left.createdAt)
            );
          });

          if (!allowLocalFallback) {
            await loadAcceptedWishes();
          }

          reset({
            fullName: values.fullName,
            attendanceStatus: values.attendanceStatus,
            message: ""
          });
        } catch (error: unknown) {
          setSubmitState({
            type: "error",
            message: error instanceof Error ? error.message : rsvpCopy.error
          });
        }
      })();
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

      {responses.length > 0 ? (
        <AnimatedReveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-3xl rounded-[2.25rem] border border-white/60 bg-[#fbf6f0]/78 p-6 shadow-soft backdrop-blur sm:p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-gold/80">{rsvpCopy.responsesTitle}</p>
            <p className="mt-3 text-base leading-7 text-taupe/78">{rsvpCopy.responsesDescription}</p>
            <div className="mt-6 space-y-4">
              {responses.map((entry) => (
                <article key={entry.id} className="rounded-[1.5rem] border border-gold/15 bg-white/78 px-4 py-4 sm:px-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${
                        entry.attendanceStatus === "attending"
                          ? "bg-[#efe3d3] text-[#6c4c36]"
                          : "bg-[#f2dede] text-[#9a4e4e]"
                      }`}
                    >
                      {entry.attendanceStatus === "attending" ? rsvpCopy.comingLabel : rsvpCopy.notComingLabel}
                    </span>
                  </div>
                  {entry.message ? (
                    <p className="mt-4 font-display text-2xl leading-9 text-cocoa sm:text-[2rem]">{entry.message}</p>
                  ) : null}
                  <p className={`${entry.message ? "mt-4" : "mt-3"} text-base font-medium uppercase tracking-[0.18em] text-taupe/70`}>
                    {entry.fullName}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedReveal>
      ) : null}
    </SectionContainer>
  );
}
