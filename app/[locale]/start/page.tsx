import Image from "next/image";
import NextLink from "next/link";
import { Link } from "i18n/navigation";
import Footer from "components/layout/footer";
import { setRequestLocale } from "next-intl/server";
import { alternatesFor } from "lib/seo";
import { startGuide } from "lib/start-guide";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const guide = startGuide(locale);
  return {
    title: guide.title,
    description: guide.description,
    alternates: alternatesFor("/start", locale),
  };
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const guide = startGuide(locale);
  return (
    <>
      <article className="bg-[#f5f1e8] px-5 py-12 text-[#242920] sm:px-10 md:py-20">
        <header className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-widest text-[#91421e]">
              {guide.eyebrow}
            </p>
            <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-tight md:text-6xl">
              {guide.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">
              {guide.intro}
            </p>
            <p className="mt-5 text-sm text-neutral-600">{guide.updated}</p>
          </div>
          <Image
            src="/images/product/whiskcam-scale.webp"
            alt="Whiskcam · 24 g"
            width={720}
            height={600}
            className="h-auto w-full rounded-xl mix-blend-multiply"
          />
        </header>
        <div className="mx-auto mt-12 max-w-6xl border-y border-[#d7cabc] py-7">
          <h2 className="text-xl font-semibold">{guide.before}</h2>
          <ul className="mt-4 grid list-inside list-disc gap-4 text-base leading-relaxed md:grid-cols-3">
            {guide.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
        <ol className="mx-auto mt-12 grid max-w-6xl gap-x-12 gap-y-10 md:grid-cols-2">
          {guide.steps.map((step, i) => (
            <li key={step.title} className="border-t border-[#d7cabc] pt-5">
              <span className="text-sm font-semibold text-[#91421e]">
                0{i + 1}
              </span>
              <h2 className="mt-3 text-2xl font-semibold">{step.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-neutral-700">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
        <section className="mx-auto mt-14 max-w-6xl bg-white p-6 md:p-10">
          <h2 className="text-2xl font-semibold">{guide.troubleshooting}</h2>
          <div className="mt-6 grid gap-7 md:grid-cols-3">
            {guide.problems.map(([title, body]) => (
              <div key={title}>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-base leading-relaxed text-neutral-700">
                  {body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-5 text-base underline underline-offset-4">
            <NextLink href="/blog/are-cat-collar-cameras-safe">
              {guide.safetyLink}
            </NextLink>
            <NextLink href="/blog/how-to-watch-avi-on-iphone-cat-cam">
              {guide.playbackLink}
            </NextLink>
          </div>
        </section>
        <section className="mx-auto mt-10 max-w-6xl border-l-2 border-[#91421e] pl-6">
          <h2 className="text-xl font-semibold">{guide.limitsTitle}</h2>
          <p className="mt-3 max-w-4xl text-base leading-relaxed text-neutral-700">
            {guide.limits}
          </p>
        </section>
        <section className="mx-auto mt-14 max-w-6xl border-t border-[#d7cabc] pt-9">
          <h2 className="text-2xl font-semibold">{guide.supportTitle}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed">
            {guide.support}
          </p>
          <a
            href="mailto:support@whiskcam.com"
            className="mt-5 inline-block text-lg underline underline-offset-4"
          >
            support@whiskcam.com
          </a>
          <p className="mt-5 text-sm text-neutral-600">{guide.print}</p>
          <Link
            href="/#product"
            className="mt-7 inline-flex min-h-12 items-center rounded-md bg-wk-amber px-7 py-3 text-base font-semibold text-wk-black"
          >
            {guide.shop} ↗
          </Link>
        </section>
      </article>
      <Footer />
    </>
  );
}
