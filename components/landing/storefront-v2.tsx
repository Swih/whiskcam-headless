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
import { DeliveryInfo } from "components/delivery-info";
import { HERO_CONTENT, VIDEOS, PRODUCT_FACTS } from "lib/content";
import type { Product } from "lib/shopify/types";
import styles from "./storefront-v2.module.css";

const gallery = [
  "/images/product/whiskcam-product-studio.webp",
  "/images/product/whiskcam-scale.webp",
  "/images/reviews/customer-review-whiskcam-cat-camera-6.webp",
  "/images/product/whiskcam-kit-en.png",
];

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
  const money = (p?: Product) =>
    p
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency: p.priceRange.maxVariantPrice.currencyCode,
        }).format(Number(p.priceRange.maxVariantPrice.amount))
      : t("unavailable");
  const savings =
    product &&
    duoProduct &&
    product.priceRange.maxVariantPrice.currencyCode ===
      duoProduct.priceRange.maxVariantPrice.currencyCode
      ? 2 * Number(product.priceRange.maxVariantPrice.amount) -
        Number(duoProduct.priceRange.maxVariantPrice.amount)
      : 0;
  const savingLabel =
    savings > 0 && product
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency: product.priceRange.maxVariantPrice.currencyCode,
        }).format(savings)
      : null;
  const unitPrice = duoProduct
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: duoProduct.priceRange.maxVariantPrice.currencyCode,
      }).format(Number(duoProduct.priceRange.maxVariantPrice.amount) / 2)
    : null;

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
      : t("add", { price: money(selected) });

  return (
    <div className={styles.storefront}>
      <section id="hero" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t("eyebrow")}</p>
          <h1>
            {t("headline")} <em>{t("headlineAccent")}</em>
          </h1>
          <p className={styles.intro}>{t("intro")}</p>
          <div className={styles.heroActions}>
            <a href="#product" className={styles.primary}>
              {t("choose")} <Arrow />
            </a>
            <button onClick={playHero} className={styles.textButton}>
              {t("watch")} <span aria-hidden="true">▷</span>
            </button>
          </div>
          <div className={styles.heroNote}>
            <span>{money(product)}</span>
            <span>{t("noSubscription")}</span>
            <a href="#reviews">{t("readReviews")}</a>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.filmFrame}>
            <div className={styles.filmLabel}>
              <span>WHISKCAM / POV 003</span>
              <span>00:22</span>
            </div>
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
                className={styles.play}
                onClick={playHero}
                aria-label={t("watch")}
              >
                <span aria-hidden="true">▷</span>
              </button>
            )}
            <p className={styles.filmCaption}>{t("filmCaption")}</p>
          </div>
          <a href="#product" className={styles.cameraNote}>
            <Image
              src={gallery[1]!}
              width={104}
              height={84}
              alt={t("gallery.1")}
            />
            <span>
              <strong>Whiskcam Original</strong>
              <small>{t("scaleNote")}</small>
            </span>
            <Arrow />
          </a>
        </div>
      </section>

      <div className={styles.promiseStrip}>
        <p>
          <span>01</span>
          {t("promiseRecord")}
        </p>
        <p>
          <span>02</span>
          {t("promiseWatch")}
        </p>
        <p>
          <span>03</span>
          {t("promiseKeep")}
        </p>
      </div>

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
            <span className={styles.photoCount}>
              {String(photo + 1).padStart(2, "0")} / 04
            </span>
          </div>
          <div className={styles.thumbnails} aria-label={t("galleryLabel")}>
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
          <div className={styles.specLine}>
            <span>1080P</span>
            <span>{PRODUCT_FACTS.weightGrams} g</span>
            <span>170°</span>
            <span>USB-C</span>
          </div>
          <fieldset className={styles.packs} disabled={pending}>
            <legend>{t("choosePack")}</legend>
            {(["single", "duo"] as const).map((kind) => {
              const item = kind === "duo" ? duoProduct : product;
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
                  <span>
                    <strong>{t(`${kind}Name`)}</strong>
                    <small>{t(`${kind}Description`)}</small>
                  </span>
                  <span className={styles.packPrice}>
                    <strong>{money(item)}</strong>
                    {kind === "duo" && savingLabel && (
                      <small>{t("save", { amount: savingLabel })}</small>
                    )}
                    {kind === "duo" && unitPrice && (
                      <small>{t("perCamera", { price: unitPrice })}</small>
                    )}
                    {!item?.availableForSale && (
                      <small>{t("unavailable")}</small>
                    )}
                  </span>
                </label>
              );
            })}
          </fieldset>
          <div className={styles.included}>
            <h3>{t("includedTitle")}</h3>
            <p>{pack === "duo" ? t("duoIncluded") : t("singleIncluded")}</p>
            <p className={styles.storage}>
              <span aria-hidden="true">＋</span>
              <span>
                <strong>{t("storageTitle")}</strong> {t("storageBody")}
              </span>
            </p>
          </div>
          <div id="add-to-cart" ref={purchaseRef} className={styles.purchase}>
            <button
              className={styles.primary}
              type="button"
              onClick={buy}
              disabled={pending || !canBuy}
              aria-busy={pending}
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
            <p className={styles.eyebrow}>{t("footageEyebrow")}</p>
            <h2 id="footage-title">{t("footageTitle")}</h2>
          </div>
          <p>{t("footageIntro")}</p>
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
              <strong>{t(`${pack}Name`)}</strong>
              <small>
                {money(selected)} · {t("change")}
              </small>
            </a>
            <button
              type="button"
              className={styles.primary}
              disabled={pending || !canBuy}
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
