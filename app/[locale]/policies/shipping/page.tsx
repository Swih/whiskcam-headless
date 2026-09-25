import Footer from "components/layout/footer";
import { Link } from "i18n/navigation";
import { SHIPPING_COUNTRIES } from "lib/content";
import { alternatesFor } from "lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: "delivery"});
  return {title: t("shipping"), description: t("countries"), alternates: alternatesFor("/policies/shipping", locale)};
}

export default async function ShippingPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("delivery");
  const names = new Intl.DisplayNames([locale], {type: "region"});
  return <>
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-32 md:pt-40">
      <Link href="/" className="text-sm underline">Whiskcam</Link>
      <h1 className="mt-6 text-3xl font-bold">{t("shipping")}</h1>
      <p className="mt-6 text-wk-grey-600">{t("countries")}</p>
      <ul className="mt-6 space-y-3">
        {SHIPPING_COUNTRIES.map(country => {
          const [min,max] = country === "US" || country === "GB" ? [7,12] : country === "CA" || country === "AU" ? [10,14] : country === "NZ" ? [10,18] : [8,14];
          return <li key={country} className="flex flex-wrap justify-between gap-2 border-b border-wk-grey-100 pb-2"><strong>{names.of(country)}</strong><span className="text-sm text-wk-grey-600">{t("available",{min,max})}</span></li>;
        })}
      </ul>
      <p className="mt-6 text-sm text-wk-grey-600">{t("note")}</p>
      <p className="mt-4"><a className="underline" href="mailto:support@whiskcam.com">support@whiskcam.com</a></p>
    </div>
    <Footer />
  </>;
}
