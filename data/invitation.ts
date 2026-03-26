export type PersonProfile = {
  fullName: string;
  parents: string;
  image: string;
  instagram?: string;
};

export type EventItem = {
  type: string;
  dateLabel: string;
  timeLabel: string;
  venue: string;
  address: string;
  mapsUrl?: string;
  calendarUrl?: string;
  note?: string;
};

export type StoryItem = {
  year: string;
  title: string;
  description: string;
  image: string;
};

export type WishEntry = {
  id: string;
  guestName: string;
  attendanceStatus: "attending" | "not-attending";
  guestCount?: number;
  message: string;
  createdAt: string;
};

export type InvitationData = {
  guestLabelFallback: string;
  weddingDateISO: string;
  seo: {
    title: string;
    description: string;
    image: string;
    canonicalPath: string;
  };
  hero: {
    title: string;
    brideName: string;
    groomName: string;
    dateLabel: string;
    quote: string;
    blessing: string;
    locationLabel: string;
    coverImage: string;
  };
  couple: {
    bride: PersonProfile;
    groom: PersonProfile;
  };
  events: EventItem[];
  story: StoryItem[];
  gallery: string[];
  gifts: {
    intro: string;
    accounts: Array<{
      bank: string;
      accountName: string;
      accountNumber: string;
    }>;
    qrImage?: string;
    physicalGiftAddress?: string;
    photoRequestEmail?: string;
  };
  livestream?: {
    label: string;
    url: string;
  };
  music?: {
    src: string;
    title?: string;
  };
  seededWishes: WishEntry[];
  closing: {
    thankYou: string;
    familyGreeting: string;
    footerCredit: string;
  };
};

export const invitationData: InvitationData = {
  guestLabelFallback: "Dear Guest",
  weddingDateISO: "2026-06-10T10:00:00+12:00",
  seo: {
    title: "Wedding Invitation | Della & Renel",
    description:
      "Celebrate the wedding of Della Lusiana Putri and Renel Williams on June 10, 2026. View the invitation, moments, RSVP, and share your wishes.",
    image: "/images/og-cover.svg",
    canonicalPath: "/invite"
  },
  hero: {
    title: "The Wedding Of",
    brideName: "Della",
    groomName: "Renel",
    dateLabel: "Wednesday, 10 June 2026",
    quote: '"Every love story is beautiful, but ours is our favorite."',
    blessing:
      "With gratitude and joy, we invite you to celebrate the next chapter of our journey together.",
    locationLabel: "A day of love, prayer, and celebration",
    coverImage: "/images/renel-della-cover.jpg"
  },
  couple: {
    bride: {
      fullName: "Della Lusiana Putri",
      parents: "Together with her beloved family",
      image: "/images/renel-della-bride.jpg"
    },
    groom: {
      fullName: "Renel Williams",
      parents: "Together with his beloved family",
      image: "/images/renel-della-groom.jpg"
    }
  },
  events: [
    {
      type: "Ceremony",
      dateLabel: "Wednesday, 10 June 2026",
      timeLabel: "10:00 AM onwards",
      venue: "Wedding ceremony",
      address: "Venue details to be shared with guests soon.",
      note: "Please arrive a little early so we can begin together."
    },
    {
      type: "Reception",
      dateLabel: "Wednesday, 10 June 2026",
      timeLabel: "Following the ceremony",
      venue: "Wedding reception",
      address: "Reception details will be shared soon.",
      note: "We look forward to celebrating with you."
    }
  ],
  story: [
    {
      year: "2023",
      title: "First Travel To Meet Her",
      description:
        "One meaningful trip became the beginning of a deeper story, full of courage, hope, and anticipation.",
      image: "/images/story-travel.jpg"
    },
    {
      year: "2023",
      title: "First In-Person Meeting",
      description:
        "After time, distance, and prayers, we finally met in person and felt something steady and real.",
      image: "/images/story-meeting.jpg"
    },
    {
      year: "2025",
      title: "First Movie Together",
      description:
        "The simple joy of being side by side made ordinary moments feel unforgettable.",
      image: "/images/story-movie.jpg"
    },
    {
      year: "2026",
      title: "Our Wedding Day",
      description:
        "On June 10, 2026, we begin our marriage surrounded by the love and prayers of the people who matter most.",
      image: "/images/renel-della-cover.jpg"
    }
  ],
  gallery: [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-3.jpg",
    "/images/gallery-4.jpg",
    "/images/gallery-5.jpg",
    "/images/gallery-6.jpg",
    "/images/gallery-7.jpg"
  ],
  gifts: {
    intro:
      "Your presence is the greatest gift. If you capture any beautiful moments during our ceremony and celebration, we would love to receive them.",
    accounts: [],
    photoRequestEmail: "info@edgepoint.co.nz"
  },
  music: {
    src: "/audio/replace-with-your-track.mp3",
    title: "Replace with your licensed wedding track"
  },
  seededWishes: [
    {
      id: "seed-1",
      guestName: "Sophia",
      attendanceStatus: "attending",
      guestCount: 2,
      message: "Wishing you both a life full of tenderness, laughter, and peace.",
      createdAt: "2026-03-01T09:30:00.000Z"
    },
    {
      id: "seed-2",
      guestName: "Daniel",
      attendanceStatus: "not-attending",
      message:
        "Cheering you on from afar. May your home always be warm and joy-filled.",
      createdAt: "2026-03-03T17:10:00.000Z"
    }
  ],
  closing: {
    thankYou:
      "Thank you for being part of our story and for surrounding Renel and Della with your love, prayers, and blessings.",
    familyGreeting: "With love from Della, Renel, and our families.",
    footerCredit: "Premium invitation template by your studio."
  }
};
