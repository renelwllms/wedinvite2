import type { WishEntry } from "@/data/invitation";
import type { RSVPFormValues } from "@/lib/validation";

const STORAGE_KEY = "wedinvite-rsvps";

export type RSVPStore = {
  list: () => Promise<WishEntry[]>;
  create: (payload: RSVPFormValues) => Promise<WishEntry>;
};

function readStoredEntries() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as WishEntry[];
  } catch {
    return [];
  }
}

function writeStoredEntries(entries: WishEntry[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
}

export function createMockRSVPStore(seed: WishEntry[]): RSVPStore {
  return {
    async list() {
      const stored = readStoredEntries();
      return [...stored, ...seed].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    async create(payload) {
      const entry: WishEntry = {
        id: crypto.randomUUID(),
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        attendanceStatus: payload.attendanceStatus,
        guestCount: payload.guestCount,
        dietaryRequirements: payload.dietaryRequirements,
        message: payload.message,
        createdAt: new Date().toISOString()
      };

      const stored = readStoredEntries();
      writeStoredEntries([entry, ...stored]);
      return entry;
    }
  };
}
