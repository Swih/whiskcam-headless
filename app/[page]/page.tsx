import type { Metadata } from "next";
import Prose from "components/prose";
import Footer from "components/layout/footer";
import { getPage } from "lib/shopify";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
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
