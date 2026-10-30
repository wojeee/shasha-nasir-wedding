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
      "And we created you in pairs.",
    attribution: "An-Naba' 78:8",
  },
  invite: {
    heading: "We Invite You",
    body: "With love and happiness, we sincerely invite you to attend and bless our wedding celebration.",
  },
  about: {
    heading: "Our Story",
    howTheyMet:
      "Their paths crossed when a quiet hello became an easy conversation — and then many more. Through shared laughter, late-night talks, and little adventures, friendship deepened into something lasting. This is the beginning of their forever. (Placeholder — real story coming soon.)",
    galleryTop: [
      "/images/photo-1.jpg",
      "/images/photo-2.jpg",
      "/images/photo-3.jpg",
    ],
    galleryBottom: [
      "/images/photo-4.jpg",
      "/images/photo-5.jpg",
      "/images/photo-6.jpg",
    ],
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
