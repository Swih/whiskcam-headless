export const SAFETY_REVIEWED = "2026-09-25T00:00:00Z";

export const COLLAR_GUIDANCE_URL =
  "https://www.cats.org.uk/help-and-advice/getting-a-cat/choosing-a-cat-collar";

export const SAFETY_FAQS = [
  {
    question: "Are cat collar cameras safe for every cat?",
    answer:
      "No. Suitability depends on the individual cat, collar fit, the complete mounted equipment and its effect on movement. A low camera weight or a breakaway collar alone does not guarantee safety. Ask your vet about your cat if you are unsure.",
  },
  {
    question: "How heavy can a cat collar camera be?",
    answer:
      "There is no universal camera-weight limit established by the sources in this guide. Weigh the collar, camera, mount and tags together. A percentage calculation describes the load; it does not certify safe wear or a safe session duration.",
  },
  {
    question: "What should I do if my cat freezes or scratches at the camera?",
    answer:
      "Remove the equipment rather than waiting for a fixed adjustment time. Check the fit and mount. Do not force another attempt if your cat continues to resist; a stationary camera avoids adding equipment to the collar.",
  },
  {
    question: "Can I charge a collar camera while my cat wears it?",
    answer:
      "No. Remove the camera for charging and follow its instructions. Stop using equipment that becomes unusually hot, is damaged or has a swollen battery. Keep loose parts and cables away from your cat.",
  },
] as const;

export const WEIGHT_FAQS = [
  {
    question: "How do I calculate the total collar-camera load?",
    answer:
      "Weigh the complete setup in grams: collar, camera, mount, tag and any other device. Divide that total by your cat's weight in grams and multiply by 100. For example, 40 g on a 4 kg cat is 1% of body weight; this is arithmetic, not a safety verdict.",
  },
  {
    question: "Is 40 grams too heavy for a cat?",
    answer:
      "Weight alone cannot answer that question. Check whether 40 g includes all accessories, how the mount sits, whether the collar can release and whether your cat moves normally. Your vet can advise on individual suitability.",
  },
  {
    question: "Can I use breed averages to choose a camera?",
    answer:
      "Use your cat's actual measured weight and fit instead of a breed average. Cats of the same breed differ in size, age, health and tolerance. Being a larger breed does not make a heavy or bulky mount automatically suitable.",
  },
] as const;
