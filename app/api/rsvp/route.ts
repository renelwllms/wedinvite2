import { NextResponse } from "next/server";

import { rsvpSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const payload = rsvpSchema.parse(json);

    // Replace this mock handler with Supabase, email delivery, or Google Sheets later.
    console.log("[mock-rsvp]", payload);

    return NextResponse.json({
      success: true,
      message: `Thank you, ${payload.fullName}. Your RSVP has been received.`
    });
  } catch (error) {
    console.error("[mock-rsvp-error]", error);

    return NextResponse.json(
      {
        success: false,
        message: "We could not process the RSVP just now. Please try again."
      },
      { status: 400 }
    );
  }
}
