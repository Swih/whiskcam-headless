"use client";

import Image from "next/image";
import NextLink from "next/link";
import { Link } from "i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { addItem } from "components/cart/actions";
import { useCart } from "components/cart/cart-context";
import {
  hasConsent,
  trackAddToCart,
  trackViewContent,
} from "components/analytics";
import { useHalloweenCampaign } from "components/campaign/use-halloween-campaign";
import { DeliveryInfo } from "components/delivery-info";
import { trackUmami } from "lib/umami";
import { HERO_CONTENT, VIDEOS, PRODUCT_FACTS } from "lib/content";
import { halloweenPrice, isCampaignProduct } from "lib/campaign";
import { getCampaignCopy } from "lib/campaign-copy";
import { getStorefrontCopy } from "lib/halloween-storefront-copy";
import { startGuide } from "lib/start-guide";
import type { Product } from "lib/shopify/types";
import styles from "./storefront-v2.module.css";

const gallery = [
  "/images/product/whiskcam-product-studio.webp",
  "/images/product/whiskcam-scale.webp",
  "/images/reviews/customer-review-whiskcam-cat-camera-6.webp",
  "/images/product/whiskcam-kit-en.png",
];

const MORE_GUIDES = [
  { href: "/blog/mr-petcam-vs-whiskcam", label: "Mr Petcam HD vs Whiskcam" },
  {
    href: "/blog/cat-collar-weight-chart-by-size",
    label: "Cat collar weight chart",
  },
  {
    href: "/blog/cat-collar-camera-vs-gps-tracker-2026",
    label: "Collar camera or GPS tracker?",
  },
  {
    href: "/blog/cat-collar-camera-vs-insta360-go-3",
    label: "Collar camera vs Insta360 GO 3",
  },
  {
    href: "/blog/best-cat-collar-camera-for-maine-coon",
    label: "Collar cameras for large cats",
  },
  {
    href: "/blog/is-it-legal-to-put-a-camera-on-your-cat",
    label: "Is a cat camera legal?",
  },
];

const PROMISES = ["promiseRecord", "promiseWatch", "promiseKeep"] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

/** The selected offer and request state are shared by the main and mobile controls. */
export function StorefrontV2({
  product,
  duoProduct,
  children,
}: {
  product?: Product;
  duoProduct?: Product;
  children: ReactNode;
}) {
  const t = useTranslations("v2");
  const locale = useLocale();
  const copy = getStorefrontCopy(locale);
  const offer = getCampaignCopy(locale);
  // False on the server and first render; switches itself off at the campaign end.
  const campaign = useHalloweenCampaign();
  const router = useRouter();
  const { addCartItem } = useCart();
  const [pack, setPack] = useState<"single" | "duo">("single");
  const [photo, setPhoto] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [showSticky, setShowSticky] = useState(false);
  const [heroPlaying, setHeroPlaying] = useState(false);
  const heroRef = useRef<HTMLVideoElement>(null);
  const purchaseRef = useRef<HTMLDivElement>(null);
  const selected = pack === "duo" ? duoProduct : product;
  const variant =
    selected?.variants.length === 1 ? selected.variants[0] : undefined;
  const canBuy = !!selected?.availableForSale && !!variant?.availableForSale;

  const format = (amount: number, currency: string) =>
    new Intl.NumberFormat(locale, { style: "currency", currency }).format(
      amount,
    );
  const money = (p?: Product) =>
    p
      ? format(
          Number(p.priceRange.maxVariantPrice.amount),
          p.priceRange.maxVariantPrice.currencyCode,
        )
      : t("unavailable");
  /** Code price, derived from the live Shopify price; null outside the campaign. */
  const codeMoney = (p?: Product) =>
    campaign && p && isCampaignProduct(p.handle)
      ? format(
          halloweenPrice(p.priceRange.maxVariantPrice.amount),
          p.priceRange.maxVariantPrice.currencyCode,
        )
      : null;
  const withoutCode = (p?: Product) =>
    copy.season.withoutCode.replace("{price}", money(p));

  const savings =
    product &&
    duoProduct &&
    product.priceRange.maxVariantPrice.currencyCode ===
      duoProduct.priceRange.maxVariantPrice.currencyCode
      ? 2 * Number(product.priceRange.maxVariantPrice.amount) -
        Number(duoProduct.priceRange.maxVariantPrice.amount)
      : 0;
  // The "vs 2 Originals" comparison competes with the code price, so it waits
  // until the campaign is over.
  const savingLabel =
    !campaign && savings > 0 && product
      ? format(savings, product.priceRange.maxVariantPrice.currencyCode)
      : null;
  const duoOnCode = !!duoProduct && !!codeMoney(duoProduct);
  const unitPrice = duoProduct
    ? t("perCamera", {
        price: format(
          (duoOnCode
            ? halloweenPrice(duoProduct.priceRange.maxVariantPrice.amount)
            : Number(duoProduct.priceRange.maxVariantPrice.amount)) / 2,
          duoProduct.priceRange.maxVariantPrice.currencyCode,
        ),
      }) + (duoOnCode ? ` ${offer.withCode}` : "")
    : null;
  const heroCode = codeMoney(product);
  const selectedCode = codeMoney(selected);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const button = purchaseRef.current;
    if (!hero || !button) return;
    let pastHero = false;
    let purchaseVisible = false;
    const update = () => setShowSticky(pastHero && !purchaseVisible);
    const heroObserver = new IntersectionObserver(([entry]) => {
      pastHero = !!entry && entry.boundingClientRect.bottom <= 0;
      update();
    });
    const buttonObserver = new IntersectionObserver(
      ([entry]) => {
        purchaseVisible = !!entry?.isIntersecting;
        update();
      },
      { rootMargin: "-75px 0px 0px 0px" },
    );
    heroObserver.observe(hero);
    buttonObserver.observe(button);
    return () => {
      heroObserver.disconnect();
      buttonObserver.disconnect();
    };
  }, []);

  // A product view is recorded when the offer is seen, not merely when the home page loads.
  useEffect(() => {
    const element = document.getElementById("product");
    if (!element || !selected) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || !hasConsent()) return;
        trackViewContent({
          name: selected.title,
          price: selected.priceRange.maxVariantPrice.amount,
          currency: selected.priceRange.maxVariantPrice.currencyCode,
        });
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [selected]);

  function choose(next: "single" | "duo") {
    trackUmami("variant_selected", {
      variant: next === "duo" ? "duo" : "original",
    });
    setPack(next);
    setError(null);
    if (hasConsent())
      window.gtag?.("event", "select_item", {
        item_list_name: "home_offer_selector",
        items: [
          {
            item_id: (next === "duo" ? duoProduct : product)?.id,
            item_name: next,
          },
        ],
      });
  }
  function buy() {
    if (!selected || !variant || !canBuy || pending) return;
    startTransition(async () => {
      setError(null);
      try {
        const result = await addItem(null, variant.id);
        if (result) {
          setError(t("cartError"));
          router.refresh();
          return;
        }
        addCartItem(variant, selected);
        if (hasConsent())
          trackAddToCart({
            name: selected.title,
            price: variant.price.amount,
            currency: variant.price.currencyCode,
            quantity: 1,
          });
        router.refresh();
      } catch {
        setError(t("cartError"));
      }
    });
  }
  async function playHero() {
    const video = heroRef.current;
    if (!video) return;
    try {
      document.querySelectorAll("video").forEach((other) => {
        if (other !== video) other.pause();
      });
      const rect = video.getBoundingClientRect();
      if (rect.top < 80 || rect.bottom > window.innerHeight)
        video.scrollIntoView({ block: "center", behavior: "smooth" });
      await video.play();
      setHeroPlaying(true);
      if (hasConsent())
        window.gtag?.("event", "product_video_play", {
          video_title: "Whiskcam POV encounter",
          placement: "home_hero",
        });
    } catch {
      setHeroPlaying(false);
    }
  }
  const purchaseLabel = pending
    ? t("adding")
    : !canBuy
      ? t("unavailable")
      : selectedCode
        ? `${t("addShort")} — ${selectedCode} ${offer.withCode}`
        : t("add", { price: money(selected) });

  return (
    <div
      className={styles.storefront}
      data-season={campaign ? "halloween" : undefined}
    >
      <section id="hero" className={styles.hero}>
        <div className={styles.heroCopy}>
          {/* The category line belongs to the H1 so the heading names the
              product ("cat collar camera"), not only the slogan. */}
          <h1>
            <span className={styles.eyebrow}>{t("eyebrow")}</span>{" "}
            {t("headline")} <em>{t("headlineAccent")}</em>
          </h1>
          <p className={styles.intro}>{t("intro")}</p>

          {/* The product, what it does and what it costs, before any scrolling. */}
          <div className={styles.plate}>
            {campaign && <p className={styles.plateTag}>{offer.name}</p>}
            <div className={styles.plateShot}>
              <Image
                src={gallery[0]!}
                alt={t("gallery.0")}
                fill
                priority
                sizes="(max-width: 760px) 104px, 168px"
              />
            </div>
            <div className={styles.plateBody}>
              <p className={styles.plateName}>
                <strong>Whiskcam Original</strong>
                <span>{copy.evergreen.productKind}</span>
              </p>
              <p className={styles.plateFacts}>
                {PRODUCT_FACTS.weightGrams} g · 1080P ·{" "}
                {PRODUCT_FACTS.fieldOfViewDegrees}°.{" "}
                {copy.evergreen.productRecords}
              </p>
              <p className={styles.platePrice}>
                <strong>{heroCode ?? money(product)}</strong>
                {heroCode && (
                  <span className={styles.withCode}>{offer.withCode}</span>
                )}
              </p>
              <p className={styles.plateNote}>
                {!product?.availableForSale
                  ? t("unavailable")
                  : heroCode
                    ? `${withoutCode(product)} · ${offer.deadline}`
                    : duoProduct?.availableForSale
                      ? `${t("noSubscription")} · ${t("duoName")} ${money(duoProduct)}`
                      : t("noSubscription")}
              </p>
            </div>
          </div>

          <div className={styles.heroActions}>
            <a href="#product" className={styles.primary}>
              {t("choose")} <Arrow />
            </a>
            <button
              type="button"
              onClick={playHero}
              className={styles.textButton}
            >
              {t("watch")} <span aria-hidden="true">▷</span>
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.filmFrame}>
            <div className={styles.filmLabel} aria-hidden="true">
              <span>
                {campaign
                  ? `${copy.season.filmLabel} · POV 003`
                  : "WHISKCAM / POV 003"}
              </span>
              <span>00:22</span>
            </div>
            <div className={styles.filmScreen}>
              <video
                ref={heroRef}
                poster={HERO_CONTENT.posterSrc}
                src={HERO_CONTENT.videoSrc}
                controls={heroPlaying}
                playsInline
                preload="none"
                onEnded={() => setHeroPlaying(false)}
                aria-label={t("heroVideo")}
              />
              {!heroPlaying && (
                <button
                  type="button"
                  className={styles.play}
                  onClick={playHero}
                  aria-label={t("watch")}
                >
                  <span aria-hidden="true">▷</span>
                </button>
              )}
            </div>
            <p className={styles.filmCaption}>{t("filmCaption")}</p>
          </div>
          <a href="#product" className={styles.scale}>
            <span className={styles.scaleShot}>
              <Image
                src={gallery[1]!}
                alt={t("gallery.1")}
                fill
                sizes="(max-width: 760px) 132px, 196px"
              />
            </span>
            <span className={styles.scaleCaption}>{t("scaleNote")}</span>
          </a>
        </div>
      </section>

      <section className={styles.ledger} aria-labelledby="ledger-title">
        <p id="ledger-title" className={styles.eyebrow}>
          {copy.evergreen.howItRecords}
        </p>
        <ol>
          {PROMISES.map((key, i) => (
            <li key={key}>
              <span className={styles.ledgerNumber}>0{i + 1}</span>
              <strong>{t(key)}</strong>
              <span>{copy.evergreen.promiseDetails[i]}</span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="product"
        className={styles.shop}
        aria-labelledby="offer-title"
      >
        <div className={styles.productGallery}>
          <div className={styles.mainPhoto}>
            <Image
              key={photo}
              src={gallery[photo]!}
              alt={t(`gallery.${photo}`)}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              className={styles.contain}
            />
            <span className={styles.photoCount} aria-hidden="true">
              {String(photo + 1).padStart(2, "0")} / 04
            </span>
          </div>
          <div
            className={styles.thumbnails}
            role="group"
            aria-label={t("galleryLabel")}
          >
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-pressed={photo === i}
                aria-label={t(`gallery.${i}`)}
                onClick={() => setPhoto(i)}
              >
                <Image src={src} width={68} height={54} alt="" />
                <span>{t(`galleryShort.${i}`)}</span>
              </button>
            ))}
          </div>
          <p className={styles.galleryCaption}>{t(`gallery.${photo}`)}</p>
        </div>

        <div className={styles.offer}>
          <p className={styles.eyebrow}>{t("offerEyebrow")}</p>
          <h2 id="offer-title">{t("offerTitle")}</h2>
          <p className={styles.offerIntro}>{t("offerIntro")}</p>
          <dl className={styles.specs}>
            <div>
              <dt>{copy.evergreen.specVideo}</dt>
              <dd>1080P</dd>
            </div>
            <div>
              <dt>{copy.evergreen.specWeight}</dt>
              <dd>{PRODUCT_FACTS.weightGrams} g</dd>
            </div>
            <div>
              <dt>{copy.evergreen.specView}</dt>
              <dd>{PRODUCT_FACTS.fieldOfViewDegrees}°</dd>
            </div>
            <div>
              <dt>{copy.evergreen.specCharge}</dt>
              <dd>{PRODUCT_FACTS.charging}</dd>
            </div>
          </dl>

          {campaign && (
            <div className={styles.season}>
              <p className={styles.seasonKicker}>{copy.season.kicker}</p>
              <p>
                <strong>{offer.name}</strong> · {offer.banner} · {offer.code}
              </p>
            </div>
          )}

          <fieldset className={styles.packs} disabled={pending}>
            <legend>{t("choosePack")}</legend>
            {(["single", "duo"] as const).map((kind) => {
              const item = kind === "duo" ? duoProduct : product;
              const code = codeMoney(item);
              return (
                <label
                  key={kind}
                  className={pack === kind ? styles.selectedPack : ""}
                >
                  <input
                    type="radio"
                    name="whiskcam-pack"
                    value={kind}
                    checked={pack === kind}
                    onChange={() => choose(kind)}
                  />
                  <span className={styles.packName}>
                    <strong>{t(`${kind}Name`)}</strong>
                    <small>{t(`${kind}Description`)}</small>
                  </span>
                  <span className={styles.packPrice}>
                    {code ? (
                      <>
                        <strong>{code}</strong>
                        <small className={styles.withCode}>
                          {offer.withCode}
                        </small>
                        <small>{withoutCode(item)}</small>
                      </>
                    ) : (
                      <strong>{money(item)}</strong>
                    )}
                    {kind === "duo" && savingLabel && (
                      <small>{t("save", { amount: savingLabel })}</small>
                    )}
                    {kind === "duo" && unitPrice && <small>{unitPrice}</small>}
                    {item && !item.availableForSale && (
                      <small className={styles.soldOut}>
                        {t("unavailable")}
                      </small>
                    )}
                  </span>
                </label>
              );
            })}
          </fieldset>

          <div className={styles.included}>
            <h3>{t("includedTitle")}</h3>
            <p>{pack === "duo" ? t("duoIncluded") : t("singleIncluded")}</p>
            <Link href="/start" className={styles.textButton}>
              {startGuide(locale).title} <Arrow />
            </Link>
          </div>
          <p id="microsd-note" className={styles.storage}>
            <span aria-hidden="true">＋</span>
            <span>
              <strong>{t("storageTitle")}</strong> {t("storageBody")}
            </span>
          </p>
          <div id="add-to-cart" ref={purchaseRef} className={styles.purchase}>
            <button
              className={styles.primary}
              type="button"
              onClick={buy}
              disabled={pending || !canBuy}
              aria-busy={pending}
              aria-describedby={
                campaign ? "microsd-note offer-terms" : "microsd-note"
              }
            >
              {purchaseLabel}
              <Arrow />
            </button>
            {error && (
              <p role="alert" className={styles.error}>
                {error}
              </p>
            )}
          </div>
          {campaign && (
            <div id="offer-terms" className={styles.terms}>
              <h3>
                {copy.season.termsTitle} · {offer.code}
              </h3>
              <p>{offer.terms}</p>
              <p>
                {offer.deadline}. {copy.season.autoApplied}
              </p>
            </div>
          )}
          <div className={styles.purchaseTrust}>
            <span>{t("secure")}</span>
            <Link href="/policies/returns">{t("returns")}</Link>
          </div>
          <DeliveryInfo compact expanded />
          <details className={styles.detail}>
            <summary>{t("beforeTitle")}</summary>
            <p>{t("beforeBody")}</p>
            <NextLink href="/blog/how-to-watch-avi-on-iphone-cat-cam">
              {t("phoneGuide")} <Arrow />
            </NextLink>
          </details>
        </div>
      </section>

      <section
        id="footage"
        className={styles.footage}
        aria-labelledby="footage-title"
      >
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.eyebrow}>
              {campaign ? copy.season.footageEyebrow : t("footageEyebrow")}
            </p>
            <h2 id="footage-title">{t("footageTitle")}</h2>
          </div>
          <div>
            <p>{t("footageIntro")}</p>
            {campaign && (
              <p className={styles.footageNote}>{copy.season.footageNote}</p>
            )}
          </div>
        </div>
        <div className={styles.films}>
          {VIDEOS.slice(0, 3).map((v, i) => (
            <figure key={v.src}>
              <video
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                preload="none"
                aria-label={t(`films.${i}`)}
                onPlay={(event) => {
                  const current = event.currentTarget;
                  document.querySelectorAll("video").forEach((video) => {
                    if (video !== current) video.pause();
                  });
                  if (hasConsent())
                    window.gtag?.("event", "product_video_play", {
                      video_title: v.title,
                      placement: "home_footage",
                    });
                }}
              />
              <figcaption>
                <span>
                  <small>0{i + 1} / POV</small>
                  <strong>{t(`films.${i}`)}</strong>
                </span>
                <span>{v.duration}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={styles.how} aria-labelledby="how-title">
        <div className={styles.sectionIntro}>
          <div>
            <p className={styles.eyebrow}>{t("howEyebrow")}</p>
            <h2 id="how-title">{t("howTitle")}</h2>
          </div>
          <p>{t("howIntro")}</p>
        </div>
        <div className={styles.steps}>
          {([0, 1, 2] as const).map((i) => (
            <article key={i}>
              <span className={styles.stepNumber}>0{i + 1}</span>
              <h3>{t(`steps.${i}.title`)}</h3>
              <p>{t(`steps.${i}.body`)}</p>
              <NextLink
                href={
                  i === 0
                    ? "/blog/are-cat-collar-cameras-safe"
                    : i === 1
                      ? "/what-is-whiskcam"
                      : "/blog/how-to-watch-avi-on-iphone-cat-cam"
                }
              >
                {t(`steps.${i}.link`)} <Arrow />
              </NextLink>
            </article>
          ))}
        </div>
        <div className={styles.honestNote}>
          <div>
            <h3>{t("fitTitle")}</h3>
            <p>{t("fitBody")}</p>
          </div>
          <div>
            <h3>{t("limitsTitle")}</h3>
            <p>{t("limitsBody")}</p>
          </div>
        </div>
      </section>

      {children}

      <section className={styles.help}>
        <div>
          <p className={styles.eyebrow}>{t("helpEyebrow")}</p>
          <h2>{t("helpTitle")}</h2>
          <p>{t("helpBody")}</p>
          <a href="mailto:support@whiskcam.com">
            support@whiskcam.com <Arrow />
          </a>
        </div>
        <div className={styles.reading}>
          <p>{t("guidesTitle")}</p>
          <NextLink href="/blog/best-cat-collar-cameras-2026">
            {t("guideCompare")} <Arrow />
          </NextLink>
          <NextLink href="/blog/are-cat-collar-cameras-safe">
            {t("guideFit")} <Arrow />
          </NextLink>
          <Link href="/policies/shipping">
            {t("guideDelivery")} <Arrow />
          </Link>
          {/* English-only guides, linked by their canonical titles so every
              article is reachable from the homepage. */}
          {MORE_GUIDES.map(({ href, label }) => (
            <NextLink key={href} href={href} lang="en">
              {label} <Arrow />
            </NextLink>
          ))}
        </div>
      </section>

      {showSticky && (
        <aside className={styles.sticky} aria-label={t("purchaseLabel")}>
          {error && (
            <p role="alert" className={styles.error}>
              {error}
            </p>
          )}
          <div>
            <a href="#product">
              <strong>
                {t(`${pack}Name`)} · {selectedCode ?? money(selected)}
              </strong>
              <small>
                {selectedCode
                  ? `${offer.withCode} · ${t("change")}`
                  : t("change")}
              </small>
            </a>
            <button
              type="button"
              className={styles.primary}
              disabled={pending || !canBuy}
              aria-busy={pending}
              onClick={buy}
            >
              {pending
                ? t("adding")
                : !canBuy
                  ? t("unavailable")
                  : t("addShort")}
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
