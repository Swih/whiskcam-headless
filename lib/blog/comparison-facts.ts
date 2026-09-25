import { PRODUCT_FACTS } from "lib/content";

// Editorial snapshot. These are attributed specifications, not laboratory results.
// Update the review date only after checking the linked sources again.
export const COMPARISON_REVIEWED = "2026-09-25T00:00:00Z";
export const COMPARISON_SOURCES = {
  mrPetcam:
    "https://www.mrpetcam.com/product-page/mr-petcam-hd-collar-mounted-pov-camera",
  mrPetcamWeight: "https://www.mrpetcam.com/",
  instaWeight:
    "https://onlinemanual.insta360.com/go3s/en-us/faq/specs/hardware",
  instaBattery:
    "https://onlinemanual.insta360.com/go3s/en-us/faq/specs/battery",
  collarSafety:
    "https://www.cats.org.uk/media/rvpf24h5/caring-for-your-cat-2025.pdf",
} as const;

export const CAMERA_OPTIONS = [
  { name: "Whiskcam Original", anchor: "whiskcam" },
  { name: "Mr Petcam HD", anchor: "mr-petcam" },
  { name: "Insta360 GO 3S", anchor: "insta360" },
  { name: "Generic collar cameras", anchor: "generic-cameras" },
  { name: "Full-size action cameras", anchor: "action-cameras" },
] as const;

export const COMPARISON_FAQS = {
  "best-cat-collar-cameras-2026": [
    {
      question: "What is the best cat collar camera for everyday POV clips?",
      answer:
        "Start with fit, total mounted weight and how you will retrieve the video. Whiskcam is an option for offline 1080P clips with a phone adapter; Mr Petcam HD lists a lighter camera body and infrared recording. Neither specification alone establishes which camera your cat will tolerate.",
    },
    {
      question: "Does Whiskcam need WiFi, an app or a subscription?",
      answer:
        "No WiFi, recording app or subscription is required. Whiskcam records to a separate MicroSD card for playback afterwards. It does not provide live viewing or GPS location. AVI footage may need a compatible player or conversion before editing.",
    },
    {
      question: "Is a MicroSD card included with Whiskcam?",
      answer: PRODUCT_FACTS.storageIncluded
        ? "A MicroSD card is included with the current kit. Check the product page for the exact contents before ordering."
        : "No. A compatible MicroSD card must be purchased separately. The kit includes a phone adapter, collar and charging cable; check the current offer before ordering.",
    },
    {
      question: "How heavy can a cat collar camera be?",
      answer:
        "There is no universal gram limit that guarantees safe or comfortable wear for every cat. Include the collar, mount and any tags in the total load, use a properly fitted quick-release collar, and start with a short supervised trial. Remove it if your cat freezes, scratches persistently or moves differently; ask your vet about suitability.",
    },
    {
      question:
        "Can I use cat camera footage for TikTok, Reels or YouTube Shorts?",
      answer:
        "Yes, if the footage imports into your editor. First test a short clip on your phone, check playback and sound, then crop carefully for vertical video. AVI files may need conversion. Camera choice does not guarantee views or a viral post.",
    },
  ],
  "mr-petcam-vs-whiskcam": [
    {
      question: "Is Whiskcam lighter than Mr Petcam HD?",
      answer: `No, on the published camera-body figures: Whiskcam is listed at ${PRODUCT_FACTS.weightGrams} g and Mr Petcam HD at 16 g. Include each mount and collar when comparing the load your cat would actually wear. These are listed specifications, not an independent weigh-in.`,
    },
    {
      question: "Do both cameras include a MicroSD card?",
      answer:
        "Mr Petcam HD lists a 16 GB MicroSD card in its package contents. Whiskcam currently requires a separate MicroSD card. Check the exact bundle at checkout because accessories can change.",
    },
    {
      question: "Which camera offers night vision?",
      answer:
        "Mr Petcam HD advertises infrared LEDs for night recording. Whiskcam does not offer night vision. Infrared hardware is a listed feature, not proof that the two cameras produce comparable footage in every low-light condition.",
    },
    {
      question: "Which should I choose for phone playback?",
      answer:
        "Whiskcam includes a phone adapter, but check its connection against your phone and test AVI playback with a compatible player. For Mr Petcam, check the current transfer instructions and whether a suitable reader is included in your chosen bundle.",
    },
  ],
};
