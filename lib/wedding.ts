export const wedding = {
  bride: "Shasha",
  groom: "Nasir",
  coupleNames: "Shasha & Nasir",
  tagline: "The Wedding Of",
  dateDisplay: "Saturday, 00 Month 2027",
  dateShort: "00 . 00 . 2027",
  timeDisplay: "11:00 AM – 4:00 PM",
  venue: {
    name: "Venue TBA",
    address: "Address to be announced",
    mapUrl: "https://maps.google.com",
  },
  words: {
    quote:
      "Two souls, one heart — walking forward together in love, faith, and joy.",
    attribution: "With love",
  },
  invite: {
    heading: "We Invite You",
    body: "With love and happiness, we sincerely invite you to attend and bless our wedding celebration.",
  },
  about: {
    heading: "About Us",
    bride: {
      name: "Shasha",
      title: "The Bride",
      bio: "A warm soul with a quiet strength — she fills every room with kindness and laughter. Placeholder bio until the real story arrives.",
    },
    groom: {
      name: "Nasir",
      title: "The Groom",
      bio: "Steady, thoughtful, and full of heart — he meets life with humour and devotion. Placeholder bio until the real story arrives.",
    },
  },
  cta: {
    heading: "We Cannot Wait To Celebrate With You",
    body: "Please let us know if you will be joining us on our special day.",
  },
  seedWishes: [
    {
      name: "Aisha",
      message:
        "Wishing you both a lifetime of love, laughter, and beautiful memories together.",
    },
    {
      name: "Daniel & Maya",
      message:
        "May your marriage be filled with endless joy and unwavering companionship. Congratulations!",
    },
    {
      name: "Farah",
      message:
        "So happy for you two. Here's to forever — love you both endlessly.",
    },
  ],
} as const;

export type SeedWish = (typeof wedding.seedWishes)[number];
