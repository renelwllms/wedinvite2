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
  fullName: string;
  email: string;
  phone: string;
  attendanceStatus: "attending" | "not-attending";
  guestCount?: number;
  dietaryRequirements?: string;
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
    familyLine: string;
    invitationLine: string;
    scriptAccent?: string;
    quote: string;
    blessing: string;
    locationLabel: string;
    coverImage: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    message: string;
  };
  couple: {
    bride: PersonProfile;
    groom: PersonProfile;
  };
  saveDate: {
    eyebrow: string;
    title: string;
    venue: string;
    location: string;
  };
  quoteBlock: {
    quote: string;
    caption: string;
  };
  events: EventItem[];
  story: StoryItem[];
  gallery: string[];
  details: {
    dressCode: string;
    attireNote: string;
  };
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
    footerCreditUrl?: string;
  };
};

export const invitationData: InvitationData = {
  guestLabelFallback: "Dear Guest",
  // Replace this with the real wedding date and timezone-aware start time.
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
    // Replace these names with the real couple names for future projects.
    brideName: "Della",
    groomName: "Renel",
    dateLabel: "Wednesday, 10 June 2026",
    familyLine: "Together with our families",
    invitationLine: "You’re cordially invited to the adventure that is our wedding day.",
    scriptAccent: "for always",
    quote: '"Every love story is beautiful, but ours is our favorite."',
    blessing:
      "With gratitude and joy, we invite you to celebrate the next chapter of our journey together.",
    locationLabel: "A day of love, prayer, and celebration",
    // Replace with the primary hero image for the couple.
    coverImage: "/images/renel-della-cover.jpg"
  },
  intro: {
    eyebrow: "Welcome",
    title: "A celebration written with warmth, prayer, and joy",
    message:
      "We have dreamed of a day that feels intimate, heartfelt, and full of beautiful pauses. Thank you for being part of the people we want closest as we begin this next chapter together."
  },
  couple: {
    bride: {
      fullName: "Della Lusiana Putri",
      parents: "Together with her beloved family",
      image: "/images/wedding-photo-1.jpg"
    },
    groom: {
      fullName: "Renel Williams",
      parents: "Together with his beloved family",
      image: "/images/wedding-photo-2.jpg"
    }
  },
  saveDate: {
    eyebrow: "Save The Date",
    title: "10 June 2026",
    venue: "Auckland wedding celebration",
    location: "Full ceremony and reception details will be shared with guests."
  },
  quoteBlock: {
    quote: "May this new chapter be held together by grace, steadiness, laughter, and a love that grows more beautiful in every season.",
    caption: "A promise we carry into our marriage"
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
      image: "/images/wedding-photo-3.jpg"
    },
    {
      year: "2023",
      title: "First In-Person Meeting",
      description:
        "After time, distance, and prayers, we finally met in person and felt something steady and real.",
      image: "/images/wedding-photo-4.jpg"
    },
    {
      year: "2024",
      title: "Our Engagement",
      description:
        "On 7 December 2024, we celebrated a beautiful promise for the future and took one more step toward forever.",
      image: "/images/wedding-photo-5.jpg"
    },
    {
      year: "2025",
      title: "First Movie Together",
      description:
        "The simple joy of being side by side made ordinary moments feel unforgettable.",
      image: "/images/wedding-photo-6.jpg"
    },
    {
      year: "2026",
      title: "Our Wedding Day",
      description:
        "On June 10, 2026, we begin our marriage surrounded by the love and prayers of the people who matter most.",
      image: "/images/wedding-photo-7.jpg"
    }
  ],
  gallery: [
    "/images/wedding-photo-1.jpg",
    "/images/wedding-photo-2.jpg",
    "/images/wedding-photo-3.jpg",
    "/images/wedding-photo-4.jpg",
    "/images/wedding-photo-5.jpg",
    "/images/wedding-photo-6.jpg",
    "/images/wedding-photo-7.jpg",
    "/images/wedding-photo-8.jpg"
  ],
  details: {
    dressCode: "Soft formal in warm neutrals, champagne, taupe, or muted earth tones.",
    attireNote:
      "Please choose something comfortable, elegant, and celebration-ready for both the ceremony and the reception."
  },
  gifts: {
    intro:
      "Your presence is the greatest gift. If you capture any beautiful moments during our ceremony and celebration, we would love to receive them.",
    accounts: [],
    photoRequestEmail: "info@edgepoint.co.nz"
  },
  music: {
    src: "/audio/music.mp3",
    title: "Wedding background music"
  },
  seededWishes: [
    {
      id: "seed-1",
      fullName: "Sophia Parker",
      email: "sophia@example.com",
      phone: "+64 21 000 1111",
      attendanceStatus: "attending",
      guestCount: 2,
      message: "Wishing you both a life full of tenderness, laughter, and peace.",
      createdAt: "2026-03-01T09:30:00.000Z"
    },
    {
      id: "seed-2",
      fullName: "Daniel Morris",
      email: "daniel@example.com",
      phone: "+64 21 000 2222",
      attendanceStatus: "not-attending",
      dietaryRequirements: "Vegetarian",
      message:
        "Cheering you on from afar. May your home always be warm and joy-filled.",
      createdAt: "2026-03-03T17:10:00.000Z"
    }
  ],
  closing: {
    thankYou:
      "Thank you for being part of our story and for surrounding Renel and Della with your love, prayers, and blessings.",
    familyGreeting: "With love from Della, Renel, and our families.",
    footerCredit: "Premium invitation template by Edgepoint Ltd.",
    footerCreditUrl: "https://edgepoint.co.nz"
  }
};
