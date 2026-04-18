import Image from "next/image";
import { BLOG_ARTICLES } from "lib/blog";
import { Link } from "i18n/navigation";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";

export function FromTheBlog() {
  const latestArticles = [...BLOG_ARTICLES]
    .sort(
      (a, b) =>
        new Date(b.datePublished).getTime() -
        new Date(a.datePublished).getTime()
    )
    .slice(0, 3);

  return (
    <SectionWrapper bg="warm">
      <SectionHeading
        title="From the Blog"
        subtitle="Guides and research on cat collar cameras, safety, and pet behavior"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {latestArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={article.image ?? "/images/lifestyle/wk-cat-1.webp"}
                alt={article.imageAlt ?? article.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-wk-amber/10 px-2.5 py-1 text-xs font-medium text-wk-amber"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mt-3 line-clamp-2 text-lg font-bold leading-tight text-wk-black group-hover:text-wk-amber">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                {article.description}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400">
                <span>{article.readingTime}</span>
                <span>&middot;</span>
                <time dateTime={article.datePublished}>
                  {new Date(article.datePublished).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-wk-black/10 bg-white px-6 py-3 text-sm font-semibold text-wk-black transition-colors hover:bg-wk-black hover:text-white"
        >
          View all articles
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </SectionWrapper>
  );
}
