import { z } from "zod";

export const rsvpSchema = z.object({
  guestName: z.string().min(2, "Please enter your name."),
  attendanceStatus: z.enum(["attending", "not-attending"], {
    required_error: "Please select your attendance."
  }),
  guestCount: z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      return value;
    },
    z.coerce.number().int().min(1, "Minimum 1 guest.").max(10, "Maximum 10 guests.").optional()
  ),
  message: z
    .string()
    .min(8, "Please leave a short wish or blessing.")
    .max(280, "Please keep your message under 280 characters.")
});

export type RSVPFormValues = z.infer<typeof rsvpSchema>;
