import Footer from "components/layout/footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Whiskcam",
  description:
    "The story behind Whiskcam — a pet collar camera born from pure curiosity about what our cats really do.",
  keywords: ["Whiskcam", "cat collar camera", "pet camera", "cat POV camera", "about"],
  alternates: {
    canonical: "https://whiskcam.com/about",
  },
  openGraph: {
    title: "About Whiskcam",
    description:
      "The story behind Whiskcam — a pet collar camera born from pure curiosity about what our cats really do.",
    url: "https://whiskcam.com/about",
    siteName: "Whiskcam",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Whiskcam",
    description:
      "The story behind Whiskcam — a pet collar camera born from pure curiosity.",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  mainEntity: {
    "@type": "Organization",
    name: "Whiskcam",
    url: "https://whiskcam.com",
    description:
      "Whiskcam designs lightweight collar cameras for cats, helping owners see the world through their pet's eyes.",
    foundingDate: "2026",
    sameAs: [
      "https://tiktok.com/@whiskcam",
      "https://instagram.com/whiskcam",
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://whiskcam.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://whiskcam.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero band — portrait image, taller to showcase vertical composition */}
      <div className="relative flex h-[50vh] min-h-[340px] items-end overflow-hidden bg-wk-dark md:h-[55vh]">
        <Image
          src="/images/lifestyle/chat-unplash-2.webp"
          alt="Cat exploring outdoors"
          fill
          priority
          className="object-cover object-top opacity-40"
          sizes="100vw"
        />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-wk-amber">
            Our Story
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            Born from Curiosity
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-5 py-16 md:py-20">
        <div className="space-y-5 text-base leading-relaxed text-wk-grey-600">
          <p className="text-lg text-wk-black">
            It started with a simple question: <em>What does my cat actually do all day?</em>
          </p>
          <p>
            We&apos;d come home to knocked-over plants, mysterious scratches on the furniture,
            and a cat that looked suspiciously innocent. We had to know.
          </p>
          <p>
            So we strapped a tiny camera to our cat&apos;s collar and pressed record.
            What we saw blew our minds — garden patrols, rooftop adventures, secret meetings
            with the neighbor&apos;s cat. A whole world we never knew existed.
          </p>
          <p>
            That&apos;s when Whiskcam was born. We wanted every pet parent to experience that
            same joy — to see the world through their pet&apos;s eyes.
          </p>
          <p>
            We designed it to be dead simple. No app. No WiFi. No complicated setup.
            Just clip it on, press record, and let your pet do the rest.
          </p>
          <p className="font-semibold text-wk-black">
            See their world. You won&apos;t believe what you&apos;ve been missing.
          </p>
        </div>

        <div className="mt-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-wk-amber transition-colors hover:text-wk-amber-hover"
          >
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Back to shop
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
