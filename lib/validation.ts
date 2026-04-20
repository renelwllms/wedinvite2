import { z } from "zod";

import type { RsvpValidationCopy } from "@/data/invitation";

export function createRsvpSchema(messages: RsvpValidationCopy) {
  return z.object({
    fullName: z.string().min(2, messages.fullNameMin),
    attendanceStatus: z.enum(["attending", "not-attending"], {
      required_error: messages.attendanceRequired
    }),
    message: z
      .string()
      .min(8, messages.messageMin)
      .max(320, messages.messageMax)
  });
}

export const defaultRsvpValidationCopy: RsvpValidationCopy = {
  fullNameMin: "Please enter your full name.",
  emailInvalid: "Please enter a valid email address.",
  phoneMin: "Please enter a contact number.",
  phoneMax: "Please keep the phone number concise.",
  attendanceRequired: "Please select your attendance.",
  guestCountMin: "Minimum 1 guest.",
  guestCountMax: "Maximum 10 guests.",
  dietaryMax: "Please keep dietary notes under 160 characters.",
  messageMin: "Please leave a short wish or blessing.",
  messageMax: "Please keep your message under 320 characters."
};

export const rsvpSchema = createRsvpSchema(defaultRsvpValidationCopy);

export type RSVPFormValues = z.infer<typeof rsvpSchema>;
