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
import { PixelSprite, signalType } from "./pixel-art";
import { SignalPortrait } from "./signal-portrait";
import styles from "./storefront-v2.module.css";

const gallery = [
  "/images/product/whiskcam-product-studio.webp",
  "/images/product/whiskcam-scale.webp",
  "/images/reviews/customer-review-whiskcam-cat-camera-6.webp",
  "/images/product/whiskcam-kit-en.png",
];

/** The 22-second encounter leads the screening; it is also the hero clip. */
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
  return <span aria-hidden="true">↗</span>;
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
  const facts = `${PRODUCT_FACTS.weightGrams} g · 1080P · ${PRODUCT_FACTS.fieldOfViewDegrees}° · ${brand.sound}`;

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
  /** The hero monitor plays the real clip where it lives, in the screening. */
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

  const packLabel = (kind: Pack) => `Whiskcam ${t(`${kind}Name`)}`;
  const heroLabel = pending
    ? t("adding")
    : !canBuy
      ? t("unavailable")
      : `${brand.addKit[pack]} — ${selectedCode ?? money(selected)}`;
  const purchaseLabel = pending
    ? t("adding")
    : !canBuy
      ? t("unavailable")
      : selectedCode
        ? `${t("addShort")} — ${selectedCode} ${offer.withCode}`
        : t("add", { price: money(selected) });

  return (
    <div className={styles.storefront} data-season={season}>
      <section id="hero" className={styles.hero} aria-labelledby="hero-title">
        {/* One H1: the category descriptor plus the pixel display line. */}
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.category}>
            <PixelSprite name="cat" size={14} />
            {brand.category}
          </span>
          <span className={`${styles.display} ${signalType}`}>
            {brand.headline}
          </span>
        </h1>
        <p className={styles.intro}>
          {brand.intro.replace("{weight}", String(PRODUCT_FACTS.weightGrams))}
        </p>

        {/* The box office: real product, real Shopify price, direct add. */}
        <div ref={ticketRef} className={styles.ticket}>
          <p className={styles.ticketHead}>
            <span className={signalType}>{brand.boxOffice}</span>
            {campaign && (
              <span className={`${styles.ticketCode} ${signalType}`}>
                {campaign.code} −{campaign.percentage}%
              </span>
            )}
          </p>
          <div className={styles.ticketProduct}>
            <span className={styles.ticketShot}>
              <Image
                src={gallery[0]!}
                alt={t("gallery.0")}
                fill
                priority
                sizes="96px"
              />
            </span>
            <p>
              <strong>{packLabel(pack)}</strong>
              <span>{brand.kitLine[pack]}</span>
              <span>{facts}</span>
            </p>
          </div>
          <fieldset className={styles.toggle} disabled={pending}>
            <legend className={styles.srOnly}>{t("choosePack")}</legend>
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
                    name="whiskcam-pack-hero"
                    value={kind}
                    checked={pack === kind}
                    onChange={() => choose(kind)}
                  />
                  <span className={styles.toggleName}>{t(`${kind}Name`)}</span>
                  <strong>{code ?? money(item)}</strong>
                  {code && <small>{withoutCode(item)}</small>}
                  {item && !item.availableForSale && (
                    <small>{t("unavailable")}</small>
                  )}
                </label>
              );
            })}
          </fieldset>
          <button
            type="button"
            className={styles.primary}
            onClick={() => buy("hero")}
            disabled={pending || !canBuy}
            aria-busy={pending}
            aria-describedby="hero-ticket-note"
          >
            {heroLabel}
            <Arrow />
          </button>
          {errorAt("hero")}
          <p id="hero-ticket-note" className={styles.ticketNote}>
            {campaign && (
              <strong>
                {offer.withCode} · {offer.deadline}.{" "}
              </strong>
            )}
            {brand.panelNote}
          </p>
          <a href="#product" className={styles.ticketLink}>
            {brand.details} <span aria-hidden="true">↓</span>
          </a>
        </div>

        <SignalPortrait
          season={season}
          credit={brand.credits[season]}
          alt={brand.portraitAlt}
          fullColour={brand.fullColour}
        >
          <button
            type="button"
            className={styles.monitor}
            onClick={playFeature}
          >
            {/* Plain img: the page preloads this exact poster URL. */}
            <img src={HERO_CONTENT.posterSrc} alt="" width={240} height={150} />
            <span className={signalType}>
              <span aria-hidden="true">▶</span> {brand.realClip}
            </span>
            <span className={styles.srOnly}>{t("watch")}</span>
            <small aria-hidden="true">0:22</small>
          </button>
        </SignalPortrait>
      </section>

      <ul className={`${styles.strip} ${signalType}`}>
        {[
          `${PRODUCT_FACTS.weightGrams} g ${brand.strip.camera}`,
          brand.strip.sound,
          `${PRODUCT_FACTS.fieldOfViewDegrees}° ${brand.strip.view}`,
          PRODUCT_FACTS.charging,
          brand.strip.offline,
          brand.strip.card,
        ].map((item, i) => (
          <li key={item}>
            {i > 0 && (
              <PixelSprite
                name={
                  season === "halloween"
                    ? "pumpkin"
                    : season === "autumn"
                      ? "leaf"
                      : "cat"
                }
                size={12}
              />
            )}
            {item}
          </li>
        ))}
      </ul>

      <section
        id="footage"
        className={styles.footage}
        aria-labelledby="footage-title"
      >
        <div className={styles.sectionIntro}>
          <div>
            <p className={`${styles.eyebrow} ${signalType}`}>
              {season === "halloween"
                ? brand.screening.halloween
                : season === "autumn"
                  ? brand.screening.autumn
                  : brand.screening.eyebrow}
            </p>
            <h2 id="footage-title" className={signalType}>
              {brand.screening.title}
            </h2>
          </div>
          <div>
            <p>{brand.screening.intro}</p>
            {season === "halloween" && (
              <p className={styles.footageNote}>{brand.screening.nightNote}</p>
            )}
          </div>
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
                  <span>
                    <small className={signalType}>
                      {brand.screening.tape} 0{i + 1}
                    </small>
                    <strong>{t(`films.${index}`)}</strong>
                  </span>
                  <span className={signalType}>{v.duration}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
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
            <span
              className={`${styles.photoCount} ${signalType}`}
              aria-hidden="true"
            >
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
          <p className={`${styles.eyebrow} ${signalType}`}>
            {t("offerEyebrow")}
          </p>
          <h2 id="offer-title" className={signalType}>
            {t("offerTitle")}
          </h2>
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
              <PixelSprite
                name={season === "halloween" ? "pumpkin" : "leaf"}
                size={30}
              />
              <p>
                <strong className={signalType}>
                  {season === "halloween"
                    ? copy.season.kicker.halloween
                    : copy.season.kicker.autumn}
                </strong>
                <span>
                  {offer.banner} · {offer.code}
                </span>
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
              onClick={() => buy("offer")}
              disabled={pending || !canBuy}
              aria-busy={pending}
              aria-describedby={
                campaign ? "microsd-note offer-terms" : "microsd-note"
              }
            >
              {purchaseLabel}
              <Arrow />
            </button>
            {errorAt("offer")}
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

      <section className={styles.how} aria-labelledby="how-title">
        <div className={styles.sectionIntro}>
          <div>
            <p className={`${styles.eyebrow} ${signalType}`}>
              {brand.fit.eyebrow}
            </p>
            <h2 id="how-title" className={signalType}>
              {brand.fit.title}
            </h2>
          </div>
          <p>{brand.fit.intro}</p>
        </div>
        <div className={styles.checklist}>
          <div className={styles.yes}>
            <h3 className={signalType}>{brand.fit.yesTitle}</h3>
            <ul>
              {brand.fit.yes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className={styles.no}>
            <h3 className={signalType}>{brand.fit.noTitle}</h3>
            <ul>
              {brand.fit.no.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.steps}>
          {([0, 1, 2] as const).map((i) => (
            <article key={i}>
              <span className={`${styles.stepNumber} ${signalType}`}>
                0{i + 1}
              </span>
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
      </section>

      <section className={styles.value} aria-labelledby="value-title">
        <div className={styles.valueIntro}>
          <p className={`${styles.eyebrow} ${signalType}`}>
            {brand.value.eyebrow}
          </p>
          <h2 id="value-title" className={signalType}>
            {brand.value.title}
          </h2>
        </div>
        <ol className={styles.credits}>
          <li>
            <h3>{startGuide(locale).title}</h3>
            <p>{brand.value.guide.body}</p>
            <Link href="/start">
              {brand.value.guide.link} <Arrow />
            </Link>
          </li>
          <li>
            <h3>{brand.value.clips.title}</h3>
            <p>{brand.value.clips.body}</p>
            <a href="#footage">
              {brand.value.clips.link} <Arrow />
            </a>
          </li>
          <li>
            <h3>{brand.value.playback.title}</h3>
            <p>{brand.value.playback.body}</p>
            <NextLink href="/blog/how-to-watch-avi-on-iphone-cat-cam" lang="en">
              {brand.value.playback.link} <Arrow />
            </NextLink>
          </li>
          <li>
            <h3>{brand.value.support.title}</h3>
            <p>{brand.value.support.body}</p>
            <a href="mailto:support@whiskcam.com">
              support@whiskcam.com <Arrow />
            </a>
          </li>
          <li>
            <h3>{brand.value.refund.title}</h3>
            <p>{brand.value.refund.body}</p>
            <Link href="/policies/returns">
              {brand.value.refund.link} <Arrow />
            </Link>
          </li>
        </ol>
      </section>

      <div className={styles.audience}>{children}</div>

      <section className={styles.help}>
        <div>
          <p className={`${styles.eyebrow} ${signalType}`}>
            {t("helpEyebrow")}
          </p>
          <h2 className={signalType}>{t("helpTitle")}</h2>
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
