import Footer from "components/layout/footer";
import { CookiePreferences } from "components/cookie-consent";
import { Link } from "i18n/navigation";
import { LEGAL_IDENTITY as who, legalCopy, type PolicyName } from "lib/legal";

export default function PolicyPage({
  policy,
  locale,
}: {
  policy: PolicyName;
  locale: string;
}) {
  const copy = legalCopy(locale);
  const content = copy[policy];
  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pb-16 pt-32 md:pt-40">
        <Link href="/" className="text-sm underline underline-offset-4">
          Whiskcam
        </Link>
        <h1 className="mt-6 text-3xl font-bold leading-tight md:text-4xl">
          {content.title}
        </h1>
        <p className="mt-4 text-sm text-wk-grey-600">{copy.updated}</p>
        <div className="prose prose-neutral mt-8 max-w-none">
          <section
            aria-labelledby="seller-heading"
            className="rounded-xl border border-wk-grey-200 bg-wk-grey-50 px-5 py-4"
          >
            <h2 id="seller-heading">{copy.seller}</h2>
            <p>
              {who.name} — {copy.status}
            </p>
            <p>
              SIREN: {who.siren}
              <br />
              SIRET: {who.siret}
              <br />
              {who.address}
            </p>
            <p>
              <a href={`mailto:${who.email}`}>{who.email}</a>
              {" · "}
              <a href={`tel:${who.phone.replaceAll(" ", "")}`}>{who.phone}</a>
            </p>
            <p>{copy.vat}</p>
          </section>
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </section>
          ))}
          {who.mediator && (
            <p>
              {who.mediator.name}:{" "}
              <a href={who.mediator.url}>{who.mediator.url}</a>
            </p>
          )}
          <h2>{copy.contact}</h2>
          <p>
            <a href={`mailto:${who.supportEmail}`}>{who.supportEmail}</a>
          </p>
          {policy === "privacy" && (
            <>
              <CookiePreferences label={copy.cookies} />
              <p>
                <a href="https://www.shopify.com/legal/privacy/consumers">
                  Shopify
                </a>
                {" · "}
                <a href="https://vercel.com/legal/privacy-notice">Vercel</a>
                {" · "}
                <a href="https://www.cnil.fr/fr/adresser-une-plainte">CNIL</a>
              </p>
            </>
          )}
          <h2>{copy.related}</h2>
          <ul>
            {(["legal", "terms", "returns", "privacy"] as const)
              .filter((name) => name !== policy)
              .map((name) => (
                <li key={name}>
                  <Link href={`/policies/${name}`}>{copy[name].title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </article>
      <Footer />
    </>
  );
}
