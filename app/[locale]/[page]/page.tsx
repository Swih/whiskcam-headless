import type { Metadata } from "next";
import Prose from "components/prose";
import Footer from "components/layout/footer";
import { getPage } from "lib/shopify";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { baseUrl } from "lib/utils";

function buildPageAlternates(locale: string, handle: string) {
  const canonical =
    locale === "en" ? `${baseUrl}/${handle}` : `${baseUrl}/${locale}/${handle}`;
  return {
    canonical,
    languages: {
      en: `${baseUrl}/${handle}`,
      fr: `${baseUrl}/fr/${handle}`,
      de: `${baseUrl}/de/${handle}`,
      es: `${baseUrl}/es/${handle}`,
      "x-default": `${baseUrl}/${handle}`,
    },
  };
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    alternates: buildPageAlternates(params.locale, params.page),
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

export default async function Page(props: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const params = await props.params;
  setRequestLocale(params.locale);
  const page = await getPage(params.page);

  if (!page) return notFound();

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 pt-32 pb-16 md:pt-40">
        <h1 className="text-4xl font-bold text-wk-black md:text-5xl">
          {page.title}
        </h1>
        <Prose className="mt-8" html={page.body} />
        <p className="mt-8 text-sm text-neutral-400">
          {`Last updated on ${new Intl.DateTimeFormat(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(page.updatedAt))}.`}
        </p>
      </div>
      <Footer />
    </>
  );
}
