export type InvitationLocale = "en" | "id";

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

export type RsvpValidationCopy = {
  fullNameMin: string;
  emailInvalid: string;
  phoneMin: string;
  phoneMax: string;
  attendanceRequired: string;
  guestCountMin: string;
  guestCountMax: string;
  dietaryMax: string;
  messageMin: string;
  messageMax: string;
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
  ui: {
    openingScreen: {
      reservedFor: string;
      chooseLanguage: string;
      chooseLanguageDescription: string;
      englishLabel: string;
      bahasaLabel: string;
      englishButton: string;
      bahasaButton: string;
    };
    hero: {
      openInvitationCta: string;
      ceremonyLabel: string;
      receptionLabel: string;
    };
    navbar: {
      invitationLabel: string;
      home: string;
      story: string;
      date: string;
      memories: string;
      rsvp: string;
      openMenu: string;
      closeMenu: string;
    };
    intro: {
      quoteLead: string;
    };
    storySection: {
      eyebrow: string;
      title: string;
      description: string;
      panelTitle: string;
      panelDescription: string;
      openStory: string;
      hideStory: string;
    };
    countdown: {
      months: string;
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
      todayTitle: string;
      todayDescription: string;
    };
    eventsSection: {
      eyebrow: string;
      title: string;
      description: string;
      maps: string;
      calendar: string;
      stream: string;
      dressCodeEyebrow: string;
      dressCodeTitle: string;
    };
    rsvp: {
      eyebrow: string;
      title: string;
      description: string;
      fullName: string;
      fullNamePlaceholder: string;
      email: string;
      phone: string;
      attendance: string;
      attendanceAccept: string;
      attendanceDecline: string;
      guestCount: string;
      guestCountAttendingPlaceholder: string;
      guestCountOptionalPlaceholder: string;
      dietaryRequirements: string;
      dietaryPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      send: string;
      sending: string;
      success: string;
      error: string;
      validation: RsvpValidationCopy;
    };
    closingSection: {
      eyebrow: string;
    };
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
    startAtSeconds?: number;
  };
  seededWishes: WishEntry[];
  closing: {
    thankYou: string;
    familyGreeting: string;
    footerCredit: string;
    footerCreditUrl?: string;
  };
};

const sharedMedia = {
  heroImage: "/images/renel-della-cover.jpg",
  brideImage: "/images/wedding-photo-1.jpg",
  groomImage: "/images/wedding-photo-2.jpg",
  storyImages: [
    "/images/wedding-photo-3.jpg",
    "/images/wedding-photo-4.jpg",
    "/images/wedding-photo-5.jpg",
    "/images/wedding-photo-6.jpg",
    "/images/wedding-photo-7.jpg"
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
  ]
};

export const defaultInvitationLocale: InvitationLocale = "en";

export const invitationDataByLocale: Record<InvitationLocale, InvitationData> = {
  en: {
    guestLabelFallback: "Dear Guest",
    weddingDateISO: "2026-06-10T00:00:00+12:00",
    seo: {
      title: "Wedding Invitation | Della & Renel",
      description:
        "Celebrate the wedding of Della Lusiana Putri and Renel Williams on June 10, 2026. View the invitation, moments, RSVP, and share your wishes.",
      image: "/images/og-cover.svg",
      canonicalPath: "/invite"
    },
    ui: {
      openingScreen: {
        reservedFor: "Reserved for",
        chooseLanguage: "Choose your language",
        chooseLanguageDescription: "Select how you would like to read the invitation.",
        englishLabel: "English",
        bahasaLabel: "Bahasa",
        englishButton: "Open in English",
        bahasaButton: "Buka dalam Bahasa"
      },
      hero: {
        openInvitationCta: "Open Invitation",
        ceremonyLabel: "Ceremony",
        receptionLabel: "Reception"
      },
      navbar: {
        invitationLabel: "Wedding Invitation",
        home: "Home",
        story: "Our Story",
        date: "Date",
        memories: "Memories",
        rsvp: "RSVP",
        openMenu: "Open menu",
        closeMenu: "Close menu"
      },
      intro: {
        quoteLead: "With gratitude, warmth, and a full heart"
      },
      storySection: {
        eyebrow: "Our Journey",
        title: "Our love story",
        description: "A few meaningful chapters that gently led us here.",
        panelTitle: "Our Story",
        panelDescription:
          "A quiet collection of moments, saved for the guests who would like to open and read them.",
        openStory: "Open Our Story",
        hideStory: "Hide Our Story"
      },
      countdown: {
        months: "Months",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        todayTitle: "Today is the day",
        todayDescription: "The celebration has begun. Thank you for being part of our story."
      },
      eventsSection: {
        eyebrow: "Celebration Details",
        title: "The details of the day",
        description:
          "A simple guide for the ceremony, reception, and the atmosphere we would love to share with you.",
        maps: "Maps",
        calendar: "Calendar",
        stream: "Stream",
        dressCodeEyebrow: "Dress code",
        dressCodeTitle: "Soft formal"
      },
      rsvp: {
        eyebrow: "RSVP",
        title: "Kindly reply",
        description:
          "For now this form posts to a mock API route, so it is easy to replace later with Supabase, email delivery, or Google Sheets.",
        fullName: "Full name",
        fullNamePlaceholder: "Your full name",
        email: "Email",
        phone: "Phone",
        attendance: "Attendance",
        attendanceAccept: "Accept with pleasure",
        attendanceDecline: "Decline with regrets",
        guestCount: "Number of guests",
        guestCountAttendingPlaceholder: "1",
        guestCountOptionalPlaceholder: "Optional",
        dietaryRequirements: "Dietary requirements",
        dietaryPlaceholder: "Optional",
        message: "Message to the couple",
        messagePlaceholder: "Share a note, blessing, or a few warm words for the couple.",
        send: "Send RSVP",
        sending: "Sending...",
        success: "Thank you. Your RSVP has been received.",
        error: "Something went wrong while submitting your RSVP.",
        validation: {
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
        }
      },
      closingSection: {
        eyebrow: "With love"
      }
    },
    hero: {
      title: "The Wedding Of",
      brideName: "Della",
      groomName: "Renel",
      dateLabel: "Wednesday, 10 June 2026",
      familyLine: "Together with our families",
      invitationLine: "You are cordially invited to the adventure that is our wedding day.",
      scriptAccent: "for always",
      quote: '"Every love story is beautiful, but ours is our favorite."',
      blessing:
        "With gratitude and joy, we invite you to celebrate the next chapter of our journey together.",
      locationLabel: "A day of love, prayer, and celebration",
      coverImage: sharedMedia.heroImage
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
        image: sharedMedia.brideImage
      },
      groom: {
        fullName: "Renel Williams",
        parents: "Together with his beloved family",
        image: sharedMedia.groomImage
      }
    },
    saveDate: {
      eyebrow: "Save The Date",
      title: "10 June 2026",
      venue: "A day we cannot wait to share with you",
      location: "Full ceremony and reception details will be shared with guests."
    },
    quoteBlock: {
      quote:
        "May this new chapter be held together by grace, steadiness, laughter, and a love that grows more beautiful in every season.",
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
        image: sharedMedia.storyImages[0]
      },
      {
        year: "2023",
        title: "First In-Person Meeting",
        description:
          "After time, distance, and prayers, we finally met in person and felt something steady and real.",
        image: sharedMedia.storyImages[1]
      },
      {
        year: "2024",
        title: "Our Engagement",
        description:
          "On 7 December 2024, we celebrated a beautiful promise for the future and took one more step toward forever.",
        image: sharedMedia.storyImages[2]
      },
      {
        year: "2026",
        title: "Our Wedding Day",
        description:
          "On June 10, 2026, we begin our marriage surrounded by the love and prayers of the people who matter most.",
        image: sharedMedia.storyImages[4]
      }
    ],
    gallery: sharedMedia.gallery,
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
      src: "/audio/westlife-my-love-cut.mp3",
      title: "Westlife - My Love",
      startAtSeconds: 7
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
        message: "Cheering you on from afar. May your home always be warm and joy-filled.",
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
  },
  id: {
    guestLabelFallback: "Tamu Undangan",
    weddingDateISO: "2026-06-10T00:00:00+12:00",
    seo: {
      title: "Undangan Pernikahan | Della & Renel",
      description:
        "Rayakan pernikahan Della Lusiana Putri dan Renel Williams pada 10 Juni 2026. Lihat undangan, momen, RSVP, dan kirim doa terbaik Anda.",
      image: "/images/og-cover.svg",
      canonicalPath: "/invite"
    },
    ui: {
      openingScreen: {
        reservedFor: "Khusus untuk",
        chooseLanguage: "Pilih bahasa",
        chooseLanguageDescription: "Silakan pilih bahasa yang ingin digunakan untuk membaca undangan ini.",
        englishLabel: "English",
        bahasaLabel: "Bahasa",
        englishButton: "Open in English",
        bahasaButton: "Buka dalam Bahasa"
      },
      hero: {
        openInvitationCta: "Buka Undangan",
        ceremonyLabel: "Akad",
        receptionLabel: "Resepsi"
      },
      navbar: {
        invitationLabel: "Undangan Pernikahan",
        home: "Beranda",
        story: "Cerita Kami",
        date: "Tanggal",
        memories: "Galeri",
        rsvp: "RSVP",
        openMenu: "Buka menu",
        closeMenu: "Tutup menu"
      },
      intro: {
        quoteLead: "Dengan syukur, kehangatan, dan hati yang penuh sukacita"
      },
      storySection: {
        eyebrow: "Perjalanan Kami",
        title: "Cerita cinta kami",
        description: "Beberapa bab bermakna yang dengan lembut membawa kami sampai di sini.",
        panelTitle: "Cerita Kami",
        panelDescription: "Sekumpulan momen sederhana yang kami simpan untuk para tamu yang ingin membacanya.",
        openStory: "Buka Cerita Kami",
        hideStory: "Sembunyikan Cerita Kami"
      },
      countdown: {
        months: "Bulan",
        days: "Hari",
        hours: "Jam",
        minutes: "Menit",
        seconds: "Detik",
        todayTitle: "Hari ini harinya",
        todayDescription: "Perayaan telah dimulai. Terima kasih telah menjadi bagian dari cerita kami."
      },
      eventsSection: {
        eyebrow: "Detail Acara",
        title: "Rangkaian hari bahagia kami",
        description:
          "Panduan singkat untuk akad, resepsi, dan suasana hangat yang ingin kami bagikan bersama Anda.",
        maps: "Peta",
        calendar: "Kalender",
        stream: "Siaran",
        dressCodeEyebrow: "Busana",
        dressCodeTitle: "Formal lembut"
      },
      rsvp: {
        eyebrow: "RSVP",
        title: "Mohon konfirmasi kehadiran",
        description:
          "Saat ini formulir ini masih menggunakan API tiruan sehingga nantinya mudah diganti ke Supabase, email, atau Google Sheets.",
        fullName: "Nama lengkap",
        fullNamePlaceholder: "Nama lengkap Anda",
        email: "Email",
        phone: "Nomor telepon",
        attendance: "Kehadiran",
        attendanceAccept: "Hadir dengan senang hati",
        attendanceDecline: "Belum bisa hadir",
        guestCount: "Jumlah tamu",
        guestCountAttendingPlaceholder: "1",
        guestCountOptionalPlaceholder: "Opsional",
        dietaryRequirements: "Catatan makanan",
        dietaryPlaceholder: "Opsional",
        message: "Pesan untuk mempelai",
        messagePlaceholder: "Tulis doa, pesan hangat, atau ucapan terbaik untuk kami.",
        send: "Kirim RSVP",
        sending: "Mengirim...",
        success: "Terima kasih. RSVP Anda sudah kami terima.",
        error: "Terjadi kendala saat mengirim RSVP.",
        validation: {
          fullNameMin: "Silakan masukkan nama lengkap Anda.",
          emailInvalid: "Silakan masukkan alamat email yang valid.",
          phoneMin: "Silakan masukkan nomor kontak.",
          phoneMax: "Nomor telepon jangan terlalu panjang.",
          attendanceRequired: "Silakan pilih status kehadiran.",
          guestCountMin: "Minimal 1 tamu.",
          guestCountMax: "Maksimal 10 tamu.",
          dietaryMax: "Catatan makanan maksimal 160 karakter.",
          messageMin: "Silakan tuliskan doa atau ucapan singkat.",
          messageMax: "Pesan maksimal 320 karakter."
        }
      },
      closingSection: {
        eyebrow: "Dengan kasih"
      }
    },
    hero: {
      title: "The Wedding Of",
      brideName: "Della",
      groomName: "Renel",
      dateLabel: "Rabu, 10 Juni 2026",
      familyLine: "Bersama keluarga kami",
      invitationLine: "Dengan hormat kami mengundang Anda untuk hadir di hari pernikahan kami.",
      scriptAccent: "selamanya",
      quote: '"Setiap kisah cinta itu indah, namun kisah kitalah yang paling kami sukai."',
      blessing:
        "Dengan penuh syukur dan sukacita, kami mengundang Anda untuk merayakan babak baru perjalanan kami bersama.",
      locationLabel: "Hari penuh cinta, doa, dan kebahagiaan",
      coverImage: sharedMedia.heroImage
    },
    intro: {
      eyebrow: "Selamat Datang",
      title: "Sebuah perayaan yang ditulis dengan kehangatan, doa, dan sukacita",
      message:
        "Kami memimpikan hari yang terasa intim, tulus, dan penuh jeda-jeda indah. Terima kasih telah menjadi bagian dari orang-orang yang ingin kami dekatkan saat memulai bab baru ini."
    },
    couple: {
      bride: {
        fullName: "Della Lusiana Putri",
        parents: "Bersama keluarga tercinta",
        image: sharedMedia.brideImage
      },
      groom: {
        fullName: "Renel Williams",
        parents: "Bersama keluarga tercinta",
        image: sharedMedia.groomImage
      }
    },
    saveDate: {
      eyebrow: "Save The Date",
      title: "10 Juni 2026",
      venue: "Hari istimewa yang tidak sabar kami bagikan bersama Anda",
      location: "Detail lengkap akad dan resepsi akan dibagikan kepada para tamu."
    },
    quoteBlock: {
      quote:
        "Semoga babak baru ini selalu dipersatukan oleh kasih karunia, keteguhan, tawa, dan cinta yang semakin indah di setiap musim.",
      caption: "Janji yang kami bawa ke dalam pernikahan"
    },
    events: [
      {
        type: "Akad",
        dateLabel: "Rabu, 10 Juni 2026",
        timeLabel: "Mulai pukul 10:00",
        venue: "Acara akad nikah",
        address: "Detail lokasi akan segera dibagikan kepada para tamu.",
        note: "Mohon hadir sedikit lebih awal agar kita bisa memulai bersama."
      },
      {
        type: "Resepsi",
        dateLabel: "Rabu, 10 Juni 2026",
        timeLabel: "Setelah akad selesai",
        venue: "Acara resepsi",
        address: "Detail lokasi resepsi akan segera dibagikan.",
        note: "Kami menantikan sukacita untuk merayakannya bersama Anda."
      }
    ],
    story: [
      {
        year: "2023",
        title: "Perjalanan Pertama Untuk Menemuinya",
        description:
          "Satu perjalanan yang bermakna menjadi awal dari cerita yang lebih dalam, penuh keberanian, harapan, dan penantian.",
        image: sharedMedia.storyImages[0]
      },
      {
        year: "2023",
        title: "Pertemuan Pertama Secara Langsung",
        description:
          "Setelah waktu, jarak, dan doa, kami akhirnya bertemu secara langsung dan merasakan sesuatu yang tenang dan nyata.",
        image: sharedMedia.storyImages[1]
      },
      {
        year: "2024",
        title: "Pertunangan Kami",
        description:
          "Pada 7 Desember 2024, kami merayakan sebuah janji indah untuk masa depan dan melangkah semakin dekat menuju selamanya.",
        image: sharedMedia.storyImages[2]
      },
      {
        year: "2026",
        title: "Hari Pernikahan Kami",
        description:
          "Pada 10 Juni 2026, kami memulai pernikahan kami dikelilingi cinta dan doa dari orang-orang yang paling berarti.",
        image: sharedMedia.storyImages[4]
      }
    ],
    gallery: sharedMedia.gallery,
    details: {
      dressCode: "Busana formal lembut dengan nuansa netral hangat, champagne, taupe, atau warna bumi yang lembut.",
      attireNote:
        "Silakan memilih busana yang nyaman, elegan, dan sesuai untuk merayakan akad maupun resepsi."
    },
    gifts: {
      intro:
        "Kehadiran Anda adalah hadiah terindah. Jika Anda mengabadikan momen indah selama acara, kami akan sangat senang menerimanya.",
      accounts: [],
      photoRequestEmail: "info@edgepoint.co.nz"
    },
    music: {
      src: "/audio/westlife-my-love-cut.mp3",
      title: "Westlife - My Love",
      startAtSeconds: 7
    },
    seededWishes: [
      {
        id: "seed-1",
        fullName: "Sophia Parker",
        email: "sophia@example.com",
        phone: "+64 21 000 1111",
        attendanceStatus: "attending",
        guestCount: 2,
        message: "Semoga kehidupan kalian selalu dipenuhi kelembutan, tawa, dan damai.",
        createdAt: "2026-03-01T09:30:00.000Z"
      },
      {
        id: "seed-2",
        fullName: "Daniel Morris",
        email: "daniel@example.com",
        phone: "+64 21 000 2222",
        attendanceStatus: "not-attending",
        dietaryRequirements: "Vegetarian",
        message: "Mendukung kalian dari jauh. Semoga rumah tangga kalian selalu hangat dan penuh sukacita.",
        createdAt: "2026-03-03T17:10:00.000Z"
      }
    ],
    closing: {
      thankYou:
        "Terima kasih telah menjadi bagian dari cerita kami dan menyertai Renel dan Della dengan cinta, doa, dan restu Anda.",
      familyGreeting: "Dengan kasih dari Della, Renel, dan keluarga kami.",
      footerCredit: "Template undangan premium oleh Edgepoint Ltd.",
      footerCreditUrl: "https://edgepoint.co.nz"
    }
  }
};

export const invitationData = invitationDataByLocale[defaultInvitationLocale];
