// =============================================================================
// Whiskcam — Centralized Content
// Non-translatable structural data only (media paths, icons, specs, booleans).
// All translatable text lives in locales/en.json and locales/fr.json
// =============================================================================

export const HERO_CONTENT = {
  videoSrc: "/videos/wk-video-encounter.mp4",
  posterSrc: "/images/hero/whiskcam-hero.webp",
};

export const STATS = [
  { value: "1080P" },
  { value: "170°" },
  { value: "26g" },
  { value: "90min" },
];

export const FEATURES = [
  { icon: "camera" },
  { icon: "eye" },
  { icon: "feather" },
  { icon: "zap" },
  { icon: "usb" },
  { icon: "shield" },
];

export const HOW_IT_WORKS = [
  { step: 1 },
  { step: 2 },
  { step: 3 },
];

export const COMPARISON = [
  { whiskcam: "€49.90", others: "€59–99" },
  { whiskcam: "1080P Full HD", others: "720P–1080P" },
  { whiskcam: true, others: false },
  { whiskcam: true, others: false },
  { whiskcam: true, others: false },
  { whiskcam: true, others: false },
  { whiskcam: true, others: false },
];

// Kept in English for JSON-LD structured data (SEO). UI FAQ uses locale files.
export const FAQ_ITEMS = [
  {
    question: "What if I'm not satisfied?",
    answer:
      "We offer a 30-day money-back guarantee, no questions asked. If you or your pet aren't happy with Whiskcam, simply email us at support@whiskcam.com and we'll process a full refund — you don't even need to return the product. We stand behind every Whiskcam because we know you'll love it.",
  },
  {
    question: "Is Whiskcam safe for my cat?",
    answer:
      "Absolutely. At just 26g, Whiskcam is lighter than a small bell. It clips securely onto your pet's existing collar with smooth, rounded edges. Most cats forget it's there within minutes. We recommend using a breakaway collar for outdoor cats, and Whiskcam is best for adult cats over 2kg.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "Whiskcam records up to 90 minutes of Full HD video on a single charge. That's perfect for capturing morning explorations and evening patrols — the most exciting moments of your pet's secret life. A full charge takes under an hour via USB-C.",
  },
  {
    question: "Do I need to download an app?",
    answer:
      "No app, no WiFi, no accounts. Just press the record button on the camera. When your pet comes home, pop out the SD card, plug it into your phone using the included adapter, and enjoy the footage. It's that simple.",
  },
  {
    question: "How do I watch the videos on my phone?",
    answer:
      "Every Whiskcam comes with a MicroSD-to-USB-C/Lightning adapter. Plug it into your phone and view the videos directly in your gallery app. You can also plug the SD card into any computer with a card reader.",
  },
  {
    question: "Will it fit my pet's collar?",
    answer:
      "Whiskcam comes with its own adjustable collar, but it also clips onto any existing collar your pet already wears. Works for cats and dogs of all sizes.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "We ship worldwide for free. Delivery typically takes 7–14 business days depending on your location. You'll receive a tracking number as soon as your Whiskcam ships.",
  },
  {
    question: "What video format does it record in?",
    answer:
      "Whiskcam records in AVI format at 1080P Full HD. The files play on any device — phone, tablet, or computer. You can easily convert or share them on TikTok, Instagram, or YouTube.",
  },
];

export const POV_IMAGES = [
  { src: "/images/pov/wk-pov-1.webp", alt: "Cat POV exploring the garden" },
  { src: "/images/pov/wk-pov-2.webp", alt: "Cat POV meeting another cat" },
  { src: "/images/pov/wk-pov-3.webp", alt: "Cat POV rooftop adventure" },
  { src: "/images/pov/wk-pov-4.webp", alt: "Cat POV through the neighborhood" },
  { src: "/images/pov/wk-pov-sky-whiskers.webp", alt: "Cat POV looking up at the sky" },
  { src: "/images/pov/wk-pov-6.webp", alt: "Cat POV chasing through the yard" },
  { src: "/images/pov/wk-pov-7.webp", alt: "Cat POV scratching post adventure" },
  { src: "/images/pov/wk-pov-8.webp", alt: "Cat POV wild outdoor exploration" },
];

// title is kept in English for JSON-LD structured data in app/page.tsx (SEO)
export const VIDEOS = [
  { src: "/videos/wk-video-chase.mp4", title: "The Chase", duration: "0:08", poster: "/images/pov/wk-pov-1.webp" },
  { src: "/videos/wk-video-confrontation.mp4", title: "The Confrontation", duration: "0:13", poster: "/images/pov/wk-pov-2.webp" },
  { src: "/videos/wk-video-encounter.mp4", title: "The Encounter", duration: "0:22", poster: "/images/pov/wk-pov-3.webp" },
  { src: "/videos/wk-video-catnip.mp4", title: "Hold My Catnip", duration: "0:15", poster: "/images/pov/wk-pov-6.webp" },
  { src: "/videos/wk-video-nails.mp4", title: "Nail Care Session", duration: "0:12", poster: "/images/pov/wk-pov-7.webp" },
  { src: "/videos/wk-video-wild.mp4", title: "Cats Gone Wild", duration: "0:18", poster: "/images/pov/wk-pov-8.webp" },
  { src: "/videos/wk-video-ungrounded.mp4", title: "Ungrounded", duration: "0:14", poster: "/images/pov/wk-pov-sky-whiskers.webp" },
];

export const PRODUCT_HANDLE = "whiskcam-original";
