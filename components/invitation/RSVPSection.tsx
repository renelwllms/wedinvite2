"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AnimatedReveal } from "@/components/invitation/AnimatedReveal";
import { SectionContainer } from "@/components/invitation/SectionContainer";
import type { InvitationData } from "@/data/invitation";
import type { RSVPFormValues } from "@/lib/validation";
import { rsvpSchema } from "@/lib/validation";

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
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      fullName: guestName,
      email: "",
      phone: "",
      attendanceStatus: "attending",
      message: ""
    }
  });

  const attendanceStatus = watch("attendanceStatus");

  const onSubmit = handleSubmit((values) => {
    setSubmitState({ type: "idle" });

    startTransition(() => {
      void fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then(async (response) => {
          const payload = (await response.json()) as { message?: string };

          if (!response.ok) {
            throw new Error(payload.message || "Unable to send RSVP.");
          }

          setSubmitState({
            type: "success",
            message: payload.message || "Thank you. Your RSVP has been received."
          });
          reset({
            fullName: values.fullName,
            email: "",
            phone: "",
            attendanceStatus: values.attendanceStatus,
            guestCount: undefined,
            dietaryRequirements: "",
            message: ""
          });
        })
        .catch((error: unknown) => {
          setSubmitState({
            type: "error",
            message: error instanceof Error ? error.message : "Something went wrong while submitting your RSVP."
          });
        });
    });
  });

  return (
    <SectionContainer
      id="rsvp"
      eyebrow="RSVP"
      title="Kindly reply"
      description="For now this form posts to a mock API route, so it is easy to replace later with Supabase, email delivery, or Google Sheets."
    >
      <AnimatedReveal>
        <form
          onSubmit={onSubmit}
          className="mx-auto max-w-3xl rounded-[2.25rem] border border-white/60 bg-[#fbf6f0]/86 p-6 shadow-soft backdrop-blur sm:p-8 md:p-10"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cocoa">Full name</span>
              <input
                {...register("fullName")}
                className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
                placeholder="Your full name"
              />
              {errors.fullName ? <span className="mt-2 block text-sm text-[#a94442]">{errors.fullName.message}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cocoa">Email</span>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
                placeholder="you@example.com"
              />
              {errors.email ? <span className="mt-2 block text-sm text-[#a94442]">{errors.email.message}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cocoa">Phone</span>
              <input
                {...register("phone")}
                className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
                placeholder="+64 ..."
              />
              {errors.phone ? <span className="mt-2 block text-sm text-[#a94442]">{errors.phone.message}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cocoa">Attendance</span>
              <select
                {...register("attendanceStatus")}
                className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
              >
                <option value="attending">Accept with pleasure</option>
                <option value="not-attending">Decline with regrets</option>
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
                className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
                placeholder={attendanceStatus === "attending" ? "1" : "Optional"}
              />
              {errors.guestCount ? <span className="mt-2 block text-sm text-[#a94442]">{errors.guestCount.message}</span> : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-cocoa">Dietary requirements</span>
              <input
                {...register("dietaryRequirements")}
                className="w-full rounded-2xl border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
                placeholder="Optional"
              />
              {errors.dietaryRequirements ? (
                <span className="mt-2 block text-sm text-[#a94442]">{errors.dietaryRequirements.message}</span>
              ) : null}
            </label>
          </div>

          <label className="mt-4 block">
            <span className="mb-2 block text-sm font-medium text-cocoa">Message to the couple</span>
            <textarea
              {...register("message")}
              rows={5}
              className="w-full rounded-[1.5rem] border border-gold/15 bg-white/85 px-4 py-3 outline-none transition focus:border-gold"
              placeholder="Share a note, blessing, or a few warm words for the couple."
            />
            {errors.message ? <span className="mt-2 block text-sm text-[#a94442]">{errors.message.message}</span> : null}
          </label>

          <div className="mt-6 flex flex-col items-center gap-4 text-center">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex min-w-[15rem] items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#3a2a24] disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send RSVP"}
            </button>

            {submitState.type !== "idle" ? (
              <p className={submitState.type === "success" ? "text-sm text-taupe/80" : "text-sm text-[#a94442]"}>
                {submitState.message}
              </p>
            ) : null}
          </div>
        </form>
      </AnimatedReveal>
    </SectionContainer>
  );
}
