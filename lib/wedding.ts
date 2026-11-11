export const wedding = {
  bride: "Shasha",
  groom: "Nasir",
  coupleNames: "Shasha & Nasir",
  tagline: "The Wedding Of",
  dateDisplay: "Sunday, 17 January 2027",
  dateShort: "17 . 01 . 2027",
  timeDisplay: "10:00 AM – 1:00 PM",
  dressCode: "White / Ivory",
  venue: {
    name: "Baitulmal Hall",
    address: "",
    mapUrl: "https://maps.google.com/?q=Baitulmal+Hall",
  },
  words: {
    quote: "And we created you in pairs.",
    attribution: "An-Naba' 78:8",
  },
  invite: {
    hosts: {
      sideOne: "Ronda Manan & family",
      togetherWith: "Together with",
      sideTwo: "Taha Bin Halit & Norhayatie Binti Ojit",
    },
    gratitude:
      "With utmost gratitude to the Almighty, we are pleased and honored to cordially invite",
    honorifics: "Datuk/Dato'/Datin/Tuan/Puan/Encik/Cik",
    ceremonyLine: "to the wedding ceremony of our beloved children.",
    brideName: "Nur Aisyah Nabilla Abdullah",
    groomName: "Nasir Taha",
  },
  about: {
    heading: "Our Story",
    story: [
      "Some love stories begin with a grand moment; ours began with a simple meeting and grew through countless conversations, shared laughter and unwavering support. Along the journey, we discovered not only love, but also friendship, trust and a shared vision for the future.",
      "Written by Allah, nurtured with love and blessed with faith, our two hearts have found their forever home in each other.",
    ],
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
