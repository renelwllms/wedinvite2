import { NextResponse } from "next/server";

import { defaultInvitationLocale, invitationDataByLocale, type InvitationLocale } from "@/data/invitation";
import { createRsvpSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let locale: InvitationLocale = defaultInvitationLocale;

  try {
    const json = (await request.json()) as { locale?: InvitationLocale } & Record<string, unknown>;
    locale = json.locale && json.locale in invitationDataByLocale ? json.locale : defaultInvitationLocale;
    const rsvpCopy = invitationDataByLocale[locale].ui.rsvp;
    const payload = createRsvpSchema(rsvpCopy.validation).parse(json);

    // Replace this mock handler with Supabase, email delivery, or Google Sheets later.
    console.log("[mock-rsvp]", payload);

    return NextResponse.json({
      success: true,
      message: `${payload.fullName}, ${rsvpCopy.success}`
    });
  } catch (error) {
    console.error("[mock-rsvp-error]", error);

    return NextResponse.json(
      {
        success: false,
        message: invitationDataByLocale[locale].ui.rsvp.error
      },
      { status: 400 }
    );
  }
}
