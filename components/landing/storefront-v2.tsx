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
import { getBrandCopy, type Season } from "lib/brand-storefront-copy";
import { startGuide } from "lib/start-guide";
import type { Product } from "lib/shopify/types";
import styles from "./storefront-v2.module.css";

/** Existing Whiskcam photos; the camera is visible on the collar in both. */
const HERO_PHOTO = "/images/lifestyle/wk-cat-1.webp";
const STORY_PHOTO = "/images/lifestyle/wk-cat-2.webp";

const gallery = [
  "/images/product/whiskcam-product-studio.webp",
  "/images/product/whiskcam-scale.webp",
  "/images/reviews/customer-review-whiskcam-cat-camera-6.webp",
  "/images/product/whiskcam-kit-en.png",
];

/** The encounter leads the clips; it is also the hero teaser. */
const FILM_ORDER = [2, 0, 1] as const;

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

type Pack = "single" | "duo";
type Placement = "hero" | "offer" | "sticky";

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

/** The selected kit and request state are shared by every buy control. */
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
  const brand = getBrandCopy(locale);
  // Null on the server and first render; switches itself at each campaign boundary.
  const campaign = useHalloweenCampaign();
  const offer = getCampaignCopy(locale, campaign);
  const season: Season = !campaign
    ? "evergreen"
    : campaign.code === "HALLOWEEN15"
      ? "halloween"
      : "autumn";
  const router = useRouter();
  const { addCartItem } = useCart();
  const [pack, setPack] = useState<Pack>("single");
  const [photo, setPhoto] = useState(0);
  const [error, setError] = useState<{
    message: string;
    at: Placement;
  } | null>(null);
  const [pending, startTransition] = useTransition();
  const [showSticky, setShowSticky] = useState(false);
  const featureRef = useRef<HTMLVideoElement>(null);
  const playPlacement = useRef<string | null>(null);
  const purchaseRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const viewedProducts = useRef(new Set<string>());
  const selected = pack === "duo" ? duoProduct : product;
  const variant =
    selected?.variants.length === 1 ? selected.variants[0] : undefined;
  const canBuy = !!selected?.availableForSale && !!variant?.availableForSale;
  const fill = (text: string) =>
    text
      .replace("{weight}", String(PRODUCT_FACTS.weightGrams))
      .replace("{fov}", String(PRODUCT_FACTS.fieldOfViewDegrees));

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
          halloweenPrice(p.priceRange.maxVariantPrice.amount, campaign),
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
            ? halloweenPrice(
                duoProduct.priceRange.maxVariantPrice.amount,
                campaign!,
              )
            : Number(duoProduct.priceRange.maxVariantPrice.amount)) / 2,
          duoProduct.priceRange.maxVariantPrice.currencyCode,
        ),
      }) + (duoOnCode ? ` ${offer.withCode}` : "")
    : null;
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

  // The hero now contains a complete buy panel. Count an actually visible panel
  // once per variant, including when consent is granted while it is on screen.
  useEffect(() => {
    const panels = [
      ticketRef.current,
      document.getElementById("product"),
    ].filter((element): element is HTMLElement => !!element);
    if (!selected || viewedProducts.current.has(selected.id)) return;
    const record = (element: Element) => {
      if (!hasConsent() || viewedProducts.current.has(selected.id)) return;
      viewedProducts.current.add(selected.id);
      try {
        trackViewContent({
          name: selected.title,
          price: selected.priceRange.maxVariantPrice.amount,
          currency: selected.priceRange.maxVariantPrice.currencyCode,
          placement: element === ticketRef.current ? "hero" : "offer",
        });
      } catch {
        // Measurement must never affect browsing or shopping.
      }
      observer.disconnect();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) record(visible.target);
      },
      { threshold: 0.2 },
    );
    panels.forEach((element) => observer.observe(element));
    const onConsent = () => {
      const visible = panels.find((element) => {
        const rect = element.getBoundingClientRect();
        return (
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0) >=
          rect.height * 0.2
        );
      });
      if (visible) record(visible);
    };
    window.addEventListener("wk-consent-update", onConsent);
    return () => {
      observer.disconnect();
      window.removeEventListener("wk-consent-update", onConsent);
    };
  }, [selected]);

  function choose(next: Pack) {
    trackUmami("variant_selected", {
      variant: next === "duo" ? "duo" : "original",
    });
    setPack(next);
    setError(null);
    try {
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
    } catch {
      /* Analytics cannot block selecting a kit. */
    }
  }
  function buy(at: Placement) {
    if (!selected || !variant || !canBuy || pending) return;
    startTransition(async () => {
      setError(null);
      try {
        const result = await addItem(null, variant.id);
        if (result) {
          setError({ message: t("cartError"), at });
          router.refresh();
          return;
        }
        addCartItem(variant, selected);
        try {
          if (hasConsent())
            trackAddToCart({
              name: selected.title,
              price: variant.price.amount,
              currency: variant.price.currencyCode,
              quantity: 1,
              placement: at,
            });
        } catch {
          /* The Shopify add succeeded; do not report a false cart error. */
        }
        router.refresh();
      } catch {
        setError({ message: t("cartError"), at });
      }
    });
  }
  /** The hero teaser plays the real clip where it lives, in the footage section. */
  async function playFeature() {
    const video = featureRef.current;
    if (!video) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    playPlacement.current = "home_hero";
    video.scrollIntoView({
      block: "center",
      behavior: still ? "auto" : "smooth",
    });
    try {
      await video.play();
    } catch {
      playPlacement.current = null;
    }
  }
  const errorAt = (at: Placement) =>
    error?.at === at ? (
      <p role="alert" className={styles.error}>
        {error.message}
      </p>
    ) : null;

  const addLabel = pending
    ? t("adding")
    : !canBuy
      ? t("unavailable")
      : `${t("addShort")} — ${selectedCode ?? money(selected)}`;
  const purchaseLabel = pending
    ? t("adding")
    : !canBuy
      ? t("unavailable")
      : selectedCode
        ? `${t("addShort")} — ${selectedCode} ${offer.withCode}`
        : t("add", { price: money(selected) });
  /** One line under the hero price: how the price is reached, or the Duo saving. */
  const priceNote = selectedCode
    ? `${offer.withCode}, ${brand.applied} · ${withoutCode(selected)}`
    : pack === "duo" && savingLabel
      ? t("save", { amount: savingLabel })
      : null;

  return (
    <div className={styles.storefront} data-season={season}>
      {/* ------------------------------------------------------------ */}
      <section id="hero" className={styles.hero} aria-labelledby="hero-title">
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.category}>{brand.category}</span>
          <span className={styles.display}>{brand.headline}</span>
        </h1>

        <figure className={styles.heroMedia}>
          <div className={styles.heroPhoto}>
            <Image
              src={HERO_PHOTO}
              alt={brand.heroAlt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 56vw"
            />
          </div>
          <figcaption>
            <button
              type="button"
              className={styles.teaser}
              onClick={playFeature}
            >
              {/* Plain img: the page preloads this exact poster URL. */}
              <img src={HERO_CONTENT.posterSrc} alt="" width={96} height={54} />
              <span>
                <strong>{brand.clipTeaser}</strong>
                <small>
                  {HERO_CONTENT.duration} · {t("films.2")}
                </small>
              </span>
              <span aria-hidden="true" className={styles.play}>
                ▶
              </span>
            </button>
          </figcaption>
        </figure>

        <p className={styles.intro}>{fill(brand.intro)}</p>

        {/* Direct purchase: live Shopify prices, shared kit state. */}
        <div ref={ticketRef} className={styles.buy}>
          {campaign && (
            <p className={styles.seasonLine}>
              <span>{offer.name}</span> · {offer.banner}
            </p>
          )}
          <fieldset className={styles.toggle} disabled={pending}>
            <legend className={styles.srOnly}>{t("choosePack")}</legend>
            {(["single", "duo"] as const).map((kind) => {
              const item = kind === "duo" ? duoProduct : product;
              return (
                <label
                  key={kind}
                  className={pack === kind ? styles.selectedPack : ""}
                >
                  <input
                    type="radio"
                    name="whiskcam-pack-hero"
                    value={kind}
                    checked={pack === kind}
                    onChange={() => choose(kind)}
                  />
                  <span className={styles.toggleName}>
                    {t(`${kind}Name`)}
                    <small>{t(`${kind}Description`).split(" · ")[0]}</small>
                  </span>
                  <strong>
                    {item && !item.availableForSale
                      ? t("unavailable")
                      : (codeMoney(item) ?? money(item))}
                  </strong>
                </label>
              );
            })}
          </fieldset>
          <p className={styles.packTagline}>{brand.packTagline[pack]}</p>
          <button
            type="button"
            className={styles.primary}
            onClick={() => buy("hero")}
            disabled={pending || !canBuy}
            aria-busy={pending}
            aria-describedby="hero-price-note hero-microsd"
          >
            {addLabel}
          </button>
          {errorAt("hero")}
          <p id="hero-price-note" className={styles.priceNote}>
            {priceNote}
            {campaign && (
              <>
                {" "}
                <a href="#offer-terms">{copy.season.termsLink}</a>
              </>
            )}
          </p>
          <p id="hero-microsd" className={styles.microNote}>
            {brand.microsd} <a href="#product">{brand.details}</a>
          </p>
        </div>
      </section>

      <ul className={styles.facts}>
        {brand.facts.map(({ value, label }) => (
          <li key={label}>
            <strong>{fill(value)}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>

      {/* ------------------------------------------------------------ */}
      <section
        id="footage"
        className={styles.footage}
        aria-labelledby="footage-title"
      >
        <div className={styles.footageHead}>
          <p className={styles.eyebrow}>{brand.footage.eyebrow[season]}</p>
          <h2 id="footage-title">{brand.footage.title}</h2>
          <p>
            {brand.footage.intro}
            {season === "halloween" && <> {brand.footage.seasonNote}</>}
          </p>
        </div>
        <div className={styles.films}>
          {FILM_ORDER.map((index, i) => {
            const v = VIDEOS[index]!;
            return (
              <figure key={v.src}>
                <video
                  ref={i === 0 ? featureRef : undefined}
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="none"
                  aria-label={t(`films.${index}`)}
                  onPlay={(event) => {
                    const current = event.currentTarget;
                    document.querySelectorAll("video").forEach((video) => {
                      if (video !== current) video.pause();
                    });
                    const placement = playPlacement.current ?? "home_footage";
                    playPlacement.current = null;
                    trackUmami("product_video_play", {
                      cta_placement: placement,
                    });
                    if (hasConsent())
                      window.gtag?.("event", "product_video_play", {
                        video_title: v.title,
                        placement,
                      });
                  }}
                />
                <figcaption>
                  <strong>{t(`films.${index}`)}</strong>
                  <span>{v.duration}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      <section className={styles.story} aria-labelledby="story-title">
        <div className={styles.storyPhoto}>
          <Image
            src={STORY_PHOTO}
            alt={brand.story.photoAlt}
            fill
            sizes="(max-width: 760px) 100vw, 46vw"
          />
        </div>
        <div className={styles.storyText}>
          <p className={styles.eyebrow}>{brand.story.eyebrow}</p>
          <h2 id="story-title">{brand.story.title}</h2>
          <ol className={styles.beats}>
            {brand.story.beats.map((beat, i) => (
              <li key={beat.title}>
                <span className={styles.beatNumber}>{i + 1}</span>
                <h3>{beat.title}</h3>
                <p>{fill(beat.body)}</p>
              </li>
            ))}
          </ol>
          <Link href="/start" className={styles.textLink}>
            {brand.story.guideLink} <Arrow />
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
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
          <p className={styles.eyebrow}>{brand.shop.eyebrow}</p>
          <h2 id="offer-title">{brand.shop.title}</h2>
          <p className={styles.offerIntro}>{brand.shop.intro}</p>
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
            <p className={styles.seasonLine}>
              <span>{offer.name}</span> · {offer.banner} · {offer.code}
            </p>
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
                    <strong>Whiskcam {t(`${kind}Name`)}</strong>
                    <small>{brand.packTagline[kind]}</small>
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
          </div>
          <p id="microsd-note" className={styles.storage}>
            <strong>{t("storageTitle")}</strong> {t("storageBody")}
          </p>
          <div id="add-to-cart" ref={purchaseRef} className={styles.purchase}>
            <button
              className={styles.primary}
              type="button"
              onClick={() => buy("offer")}
              disabled={pending || !canBuy}
              aria-busy={pending}
              aria-describedby={
                campaign ? "microsd-note offer-terms" : "microsd-note"
              }
            >
              {purchaseLabel}
            </button>
            {errorAt("offer")}
          </div>
          <div className={styles.purchaseTrust}>
            <span>{t("secure")}</span>
            <Link href="/policies/returns">{t("returns")}</Link>
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

      {/* ------------------------------------------------------------ */}
      <section className={styles.know} aria-labelledby="know-title">
        <div className={styles.knowHead}>
          <p className={styles.eyebrow}>{brand.know.eyebrow}</p>
          <h2 id="know-title">{brand.know.title}</h2>
        </div>
        <dl className={styles.knowList}>
          {brand.know.items.map((item, i) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>
                {item.body}
                {i === 2 && (
                  <>
                    {" "}
                    <NextLink
                      href="/blog/how-to-watch-avi-on-iphone-cat-cam"
                      lang="en"
                    >
                      {brand.know.playbackLink}
                    </NextLink>
                  </>
                )}
                {i === 3 && (
                  <>
                    {" "}
                    <NextLink href="/blog/are-cat-collar-cameras-safe">
                      {brand.know.fitLink}
                    </NextLink>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <div className={styles.service}>
          <h3>{brand.know.helpTitle}</h3>
          <Link href="/start">
            <strong>{startGuide(locale).title}</strong>
            <span>{brand.know.guide}</span>
          </Link>
          <a href="mailto:support@whiskcam.com">
            <strong>support@whiskcam.com</strong>
            <span>{brand.know.support}</span>
          </a>
          <Link href="/policies/returns">
            <strong>{brand.know.refund}</strong>
            <span>{t("secure")}</span>
          </Link>
        </div>
      </section>

      <div className={styles.audience}>{children}</div>

      {/* ------------------------------------------------------------ */}
      <section className={styles.help} aria-labelledby="help-title">
        <div>
          <p className={styles.eyebrow}>{t("helpEyebrow")}</p>
          <h2 id="help-title">{t("helpTitle")}</h2>
          <p>{t("helpBody")}</p>
          <a href="mailto:support@whiskcam.com" className={styles.textLink}>
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
          <NextLink href="/what-is-whiskcam">
            {t("steps.1.link")} <Arrow />
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
          {errorAt("sticky")}
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
              onClick={() => buy("sticky")}
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
