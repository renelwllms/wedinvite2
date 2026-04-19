import { z } from "zod";

export const rsvpSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a contact number.")
    .max(20, "Please keep the phone number concise."),
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
  dietaryRequirements: z
    .string()
    .max(160, "Please keep dietary notes under 160 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(8, "Please leave a short wish or blessing.")
    .max(320, "Please keep your message under 320 characters.")
});

export type RSVPFormValues = z.infer<typeof rsvpSchema>;
