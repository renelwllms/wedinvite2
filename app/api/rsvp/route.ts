import { getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

import type { WishEntry } from "@/data/invitation";
import { defaultInvitationLocale, invitationDataByLocale, type InvitationLocale } from "@/data/invitation";
import { createRsvpSchema } from "@/lib/validation";

const RSVP_STORE_NAME = "wedinvite-rsvps";
const RSVP_ENTRY_PREFIX = "entries/";

type StoredWishEntry = Pick<WishEntry, "id" | "fullName" | "attendanceStatus" | "message" | "createdAt">;

function getRsvpStore() {
  return getStore({ name: RSVP_STORE_NAME, consistency: "strong" });
}

function getEntryKey(fullName: string) {
  return `${RSVP_ENTRY_PREFIX}${encodeURIComponent(fullName.trim().toLowerCase())}`;
}

async function listStoredEntries() {
  const store = getRsvpStore();
  const { blobs } = await store.list({ prefix: RSVP_ENTRY_PREFIX });
  const entries = await Promise.all(
    blobs.map(async ({ key }) => {
      const entry = await store.get(key, { type: "json" });
      return entry as StoredWishEntry | null;
    })
  );

  return entries
    .filter((entry): entry is StoredWishEntry => Boolean(entry))
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function GET() {
  try {
    const entries = await listStoredEntries();

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("[mock-rsvp-list-error]", error);

    return NextResponse.json(
      {
        success: false,
        message: "RSVP storage is currently unavailable.",
        entries: []
      },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  let locale: InvitationLocale = defaultInvitationLocale;

  try {
    const json = (await request.json()) as { locale?: InvitationLocale } & Record<string, unknown>;
    locale = json.locale && json.locale in invitationDataByLocale ? json.locale : defaultInvitationLocale;
    const rsvpCopy = invitationDataByLocale[locale].ui.rsvp;
    const payload = createRsvpSchema(rsvpCopy.validation).parse(json);
    const store = getRsvpStore();
    const entryKey = getEntryKey(payload.fullName);
    const existingEntry = (await store.get(entryKey, { type: "json" })) as StoredWishEntry | null;
    const entry: StoredWishEntry = {
      id: existingEntry?.id ?? crypto.randomUUID(),
      fullName: payload.fullName,
      attendanceStatus: payload.attendanceStatus,
      message: payload.message,
      createdAt: new Date().toISOString()
    };

    await store.setJSON(entryKey, entry);

    return NextResponse.json({
      success: true,
      message: `${payload.fullName}, ${rsvpCopy.success}`,
      entry
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
