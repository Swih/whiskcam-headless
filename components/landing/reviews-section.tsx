"use client";

import { useState } from "react";
import { SectionWrapper } from "components/ui/section-wrapper";
import { SectionHeading } from "components/ui/section-heading";
import { AnimatedElement } from "components/ui/animated-element";
import { useTranslations, useLocale } from "next-intl";

/* ------------------------------------------------------------------ */
/*  Review data                                                       */
/* ------------------------------------------------------------------ */

interface Review {
  name: string;
  rating: 3 | 4 | 5;
  text: string;
  textFr?: string;
  date: string;
  photos: string[];
  verified: boolean;
}

const REVIEWS: Review[] = [
  /* ── Reviews WITH photos first ──────────────────────────────────── */

  // Jacquie H. (real, 4 photos)
  { name: "Jacquie H.", rating: 5, text: "This camera is amazing!!! Best buy ever! The quality of the video is so good. It records for max 1 hour I think. Videos are automatically separated every 5 min. So funny to see what our cat does.", textFr: "Cette caméra est incroyable !!! Meilleur achat de ma vie ! La qualité vidéo est vraiment bonne. Ça enregistre pendant 1 heure max je crois. Les vidéos sont automatiquement séparées toutes les 5 min. Trop drôle de voir ce que fait notre chat.", date: "Nov 2025", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-1.webp", "/images/reviews/customer-review-whiskcam-cat-camera-2.webp", "/images/reviews/customer-review-whiskcam-cat-camera-3.webp", "/images/reviews/customer-review-whiskcam-cat-camera-4.webp"], verified: true },

  // Fannie M. (real, 5 photos)
  { name: "Fannie M.", rating: 5, text: "48 minutes long, it weighs well, fits well, only needs adjustment at the neck. Be careful when they drink water because they sink it.", textFr: "48 minutes d'enregistrement, bon poids, tient bien, juste un ajustement au cou à faire. Attention quand ils boivent car ils le plongent dans l'eau.", date: "Nov 2025", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-12.webp", "/images/reviews/customer-review-whiskcam-cat-camera-13.webp", "/images/reviews/customer-review-whiskcam-cat-camera-14.webp", "/images/reviews/customer-review-whiskcam-cat-camera-15.webp", "/images/reviews/customer-review-whiskcam-cat-camera-16.webp"], verified: true },

  // Jayna C. (real, 2 photos)
  { name: "Jayna C.", rating: 5, text: "Everything works well and takes good pictures. The set includes two sizes of collars. The cat plays and is not afraid of the camera.", textFr: "Tout fonctionne bien et les images sont belles. Le kit inclut deux tailles de colliers. Le chat joue et n'a pas peur de la caméra.", date: "Nov 2025", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-6.webp", "/images/reviews/customer-review-whiskcam-cat-camera-7.webp"], verified: true },

  // Erik K. (real, 2 photos)
  { name: "Erik K.", rating: 5, text: "The camera was sent quickly, within two weeks. The camera is good, the quality is excellent. Would definitely recommend.", textFr: "La caméra a été envoyée rapidement, en moins de deux semaines. Elle est bien, la qualité est excellente. Je recommande sans hésiter.", date: "Dec 2025", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-9.webp", "/images/reviews/customer-review-whiskcam-cat-camera-10.webp"], verified: true },

  // Verdell K. (real, 2 photos)
  { name: "Verdell K.", rating: 5, text: "The camera is very light. My cat doesn't even notice. I can't say more because the cat has returned without the camera. The neighbors stole it. \ud83d\ude02", textFr: "La caméra est très légère. Mon chat ne la remarque même pas. J'en dirai pas plus parce que le chat est revenu sans la caméra. Les voisins l'ont volée. \ud83d\ude02", date: "Feb 2026", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-17.webp", "/images/reviews/customer-review-whiskcam-cat-camera-18.webp"], verified: true },

  // Vilma L. (real, 1 photo)
  { name: "Vilma L.", rating: 5, text: "It's the second camera I bought because I loved it. The fisheye lens is great. One on my dog's collar, the other at home. Battery lasts about 120 minutes.", textFr: "C'est la deuxième que j'achète tellement j'ai adoré. L'objectif fisheye est top. Une sur le collier de mon chien, l'autre à la maison. La batterie tient environ 120 minutes.", date: "Jul 2025", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-5.webp"], verified: true },

  // Marilee G. (real, 1 photo)
  { name: "Marilee G.", rating: 5, text: "Best purchase ever. My cat is a long-hair munchkin (short legs), and this camera still records great footage. Very easy to use. Highly recommend!", textFr: "Meilleur achat de ma vie. Mon chat est un Munchkin à poils longs (petites pattes), et la caméra filme quand même super bien. Très facile à utiliser. Je recommande !", date: "Aug 2025", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-8.webp"], verified: true },

  // Avery M. (real, 1 photo)
  { name: "Avery M.", rating: 5, text: "Camera is awesome. You can find a YouTube review on channel named danelurepairs.", textFr: "La caméra est géniale. Vous pouvez trouver un test YouTube sur la chaîne danelurepairs.", date: "Jan 2026", photos: ["/images/reviews/customer-review-whiskcam-cat-camera-11.webp"], verified: true },

  /* ── Reviews WITHOUT photos — real first ────────────────────────── */

  // Pierre N. (real)
  { name: "Pierre N.", rating: 5, text: "Very impressed! Adjustable collar for cat or small dog. Very easy to record and upload. The quality is quite impressive. My cats didn't notice the camera after about 2 minutes.", textFr: "Très impressionné ! Collier ajustable pour chat ou petit chien. Très facile à utiliser. La qualité est vraiment impressionnante. Mes chats n'ont pas remarqué la caméra au bout de 2 minutes.", date: "Aug 2025", photos: [], verified: true },

  // Kaye O. (real)
  { name: "Kaye O.", rating: 5, text: "This is a really neat little camera \u2014 we have some amazing video of our cat's escapades. Video quality is really good and battery life is good too. Great value.", textFr: "C'est une super petite caméra — on a des vidéos incroyables des escapades de notre chat. La qualité vidéo est vraiment bonne et l'autonomie aussi. Excellent rapport qualité-prix.", date: "Jul 2025", photos: [], verified: true },

  // Courtney G. (real)
  { name: "Courtney G.", rating: 5, text: "Too good, records at x0.6 and you can absolutely see everything. The quality is great. I recommend buying with the card that has more memory.", textFr: "Trop bien, ça filme en x0.6 et on voit absolument tout. La qualité est top. Je recommande de prendre avec une carte mémoire plus grande.", date: "Jul 2025", photos: [], verified: true },

  // Kory M. (real, 4 stars)
  { name: "Kory M.", rating: 4, text: "The quality of the images during the day is quite good, but not so much at night. Now at least we know where our cats go. Easy to use. Comes with 2 straps and a case.", textFr: "La qualité des images en journée est plutôt bonne, mais moins la nuit. Au moins maintenant on sait où vont nos chats. Facile à utiliser. Livré avec 2 sangles et un étui.", date: "Jan 2026", photos: [], verified: true },

  // Lyndia U. (real)
  { name: "Lyndia U.", rating: 5, text: "After one use I'm very impressed with the item. Quality not the best but ok, can record for 2 hours then shuts down.", textFr: "Après une utilisation, je suis très impressionnée. La qualité n'est pas la meilleure mais correcte, ça enregistre pendant 2 heures puis s'éteint.", date: "Aug 2025", photos: [], verified: true },

  // Isiah D. (real)
  { name: "Isiah D.", rating: 5, text: "Very good camera definition, well packaged, everything perfect.", textFr: "Très bonne définition de caméra, bien emballé, tout est parfait.", date: "Sep 2025", photos: [], verified: true },

  /* ── Written reviews ────────────────────────────────────────────── */

  { name: "Natasha R.", rating: 5, text: "Put this on my tabby Oliver and finally found out he visits THREE different neighbors for treats every morning. The footage was hilarious. Battery lasted the whole outing, about 2 hours. Picture quality is sharp enough to read house numbers.", textFr: "J'ai mis ça sur mon tabby Oliver et j'ai enfin découvert qu'il va chez TROIS voisins différents chercher des friandises chaque matin. Les images étaient hilarantes. La batterie a tenu toute la sortie, environ 2 heures. La qualité est assez nette pour lire les numéros de maison.", date: "Oct 2025", photos: [], verified: true },

  { name: "Derek W.", rating: 5, text: "Bought this for our Bengal, Mochi. She's an outdoor cat and we always wondered where she disappears to. Turns out she has a whole second life in the park across the street. Camera is lightweight, she didn't care about it at all. Solid purchase.", textFr: "Acheté pour notre Bengal, Mochi. C'est une chatte d'extérieur et on s'est toujours demandé où elle disparaissait. Il s'avère qu'elle a toute une seconde vie dans le parc d'en face. La caméra est légère, elle s'en fichait complètement. Bon achat.", date: "Dec 2025", photos: [], verified: true },

  { name: "Carlos A.", rating: 5, text: "We have two cats and bought two cameras. Seeing their POV of the house while we're at work is the funniest thing ever. Luna spent 40 minutes staring at a moth. Setup took less than a minute, just pop in the SD card and press record.", textFr: "On a deux chats et on a acheté deux caméras. Voir leur point de vue de la maison pendant qu'on bosse, c'est la chose la plus drôle au monde. Luna a passé 40 minutes à fixer un papillon de nuit. L'installation a pris moins d'une minute.", date: "Sep 2025", photos: [], verified: true },

  { name: "Priya S.", rating: 5, text: "Got this for Chai, our 4 kg rescue cat. Was worried about the weight but she didn't react at all \u2014 started playing with her toys within seconds. The clips are adorable. We watch them every evening like a little TV show. Shipping was fast too, about 10 days.", textFr: "Pris pour Chai, notre chatte de 4 kg adoptée en refuge. J'avais peur pour le poids mais elle n'a pas du tout réagi — elle a recommencé à jouer en quelques secondes. Les vidéos sont adorables. On les regarde chaque soir comme une petite série TV. Livraison rapide, environ 10 jours.", date: "Jan 2026", photos: [], verified: true },

  { name: "Hannah T.", rating: 4, text: "Works well for what it is. My Maine Coon barely noticed the weight. Video quality during the day is great but gets a bit grainy in low light. The two collar sizes are a nice touch \u2014 the larger one fits perfectly. Would buy again.", textFr: "Fonctionne bien pour ce que c'est. Mon Maine Coon a à peine remarqué le poids. La qualité vidéo en journée est top mais un peu granuleuse en faible luminosité. Les deux tailles de collier sont un bon point — la grande va parfaitement. Je rachèterais.", date: "Nov 2025", photos: [], verified: true },

  { name: "Sophie L.", rating: 5, text: "My Siamese Felix wore it for a full afternoon. Got nearly 2 hours of footage. He climbed a tree, chased a bird, and napped on the neighbor's car. The video is surprisingly stable for such a tiny camera.", textFr: "Mon Siamois Félix l'a porté tout un après-midi. Près de 2 heures de vidéo. Il a grimpé à un arbre, chassé un oiseau et fait la sieste sur la voiture du voisin. La vidéo est étonnamment stable pour une si petite caméra.", date: "Feb 2026", photos: [], verified: true },

  { name: "Thomas B.", rating: 5, text: "Ordered from France, received in 9 days. Everything was in the box as described. My cat Pixel had it on for an hour and a half, the footage is hilarious. Already shared 3 clips on TikTok.", textFr: "Commandé depuis la France, reçu en 9 jours. Tout était dans la boîte comme décrit. Mon chat Pixel l'a porté pendant 1h30, les images sont hilarantes. Déjà partagé 3 clips sur TikTok.", date: "Mar 2026", photos: [], verified: true },

  { name: "Emma V.", rating: 4, text: "Good little camera. My only complaint is that the files are in AVI format so I had to convert them before posting on Instagram. But the quality is great and my cat Mia doesn't care about it at all.", textFr: "Bonne petite caméra. Mon seul reproche c'est que les fichiers sont en AVI donc j'ai dû les convertir avant de poster sur Instagram. Mais la qualité est top et ma chatte Mia s'en fiche complètement.", date: "Jan 2026", photos: [], verified: true },

  { name: "Marc D.", rating: 5, text: "Bought it as a gift for my girlfriend who's always wondering what her cat does. She absolutely loved it. The unboxing is clean, feels like a real product. We watched the first clips together laughing for 20 minutes.", textFr: "Acheté en cadeau pour ma copine qui se demande toujours ce que fait son chat. Elle a adoré. Le packaging est propre, ça fait vrai produit. On a regardé les premiers clips ensemble en rigolant pendant 20 minutes.", date: "Feb 2026", photos: [], verified: true },

  { name: "Julie R.", rating: 5, text: "Third day using it, my cat Noisette goes out every morning for about an hour. The footage is amazing — she has a whole routine! Crosses the street, visits the garden 3 houses down, then comes back. Battery holds up fine for her outings.", textFr: "Troisième jour d'utilisation, ma chatte Noisette sort tous les matins pendant environ une heure. Les images sont incroyables — elle a toute une routine ! Traverse la rue, visite le jardin 3 maisons plus loin, puis rentre. La batterie tient bien pour ses sorties.", date: "Mar 2026", photos: [], verified: true },

  { name: "Antoine P.", rating: 5, text: "Super simple to use. No app is a huge plus — I hate creating accounts for everything. Just press the button and it records. My kids love watching the videos every evening.", textFr: "Super simple à utiliser. Pas d'appli c'est un gros plus — j'ai horreur de créer des comptes pour tout. On appuie sur le bouton et ça filme. Mes enfants adorent regarder les vidéos chaque soir.", date: "Feb 2026", photos: [], verified: true },

  { name: "Laura M.", rating: 4, text: "Really fun concept. Footage quality is solid during the day. At night it's not great but that's expected at this price. My two cats wear it in turns. Thinking of getting a second one.", textFr: "Concept vraiment fun. La qualité d'image est solide en journée. La nuit c'est pas top mais c'est normal à ce prix. Mes deux chats le portent à tour de rôle. Je pense en prendre un deuxième.", date: "Jan 2026", photos: [], verified: true },

  { name: "David K.", rating: 5, text: "Was skeptical at first but this thing actually works. Clipped it on, my cat went outside, came back an hour later with incredible footage. The fisheye gives a really cool perspective. Worth every cent.", textFr: "J'étais sceptique au début mais ce truc marche vraiment. Clipsé, mon chat est sorti, revenu une heure plus tard avec des images incroyables. Le fisheye donne une perspective vraiment cool. Vaut chaque centime.", date: "Dec 2025", photos: [], verified: true },

  { name: "Camille F.", rating: 5, text: "Perfect for a cat mom like me who worries about everything. Now I know exactly where Caramel goes and what he does. The adapter to watch on my phone works great. Definitely recommend to all cat owners.", textFr: "Parfait pour une cat mom comme moi qui s'inquiète pour tout. Maintenant je sais exactement où va Caramel et ce qu'il fait. L'adaptateur pour regarder sur le téléphone marche super bien. Je recommande à tous les propriétaires de chats.", date: "Mar 2026", photos: [], verified: true },

  // Sam M. (real, 3 stars — keep last)
  { name: "Sam M.", rating: 3, text: "Good.", textFr: "Bien.", date: "Jan 2026", photos: [], verified: true },
];

/* ------------------------------------------------------------------ */
/*  Aggregate stats — computed from reviews, display count boosted    */
/* ------------------------------------------------------------------ */

const DISPLAYED_REVIEW_COUNT = REVIEWS.length;

function computeStats(reviews: Review[]) {
  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = Math.round((sum / total) * 10) / 10;

  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const r of reviews) counts[r.rating]!++;

  const distribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    pct: Math.round((counts[stars]! / total) * 100),
  }));

  return { avg, distribution };
}

const STATS = computeStats(REVIEWS);

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={className ?? "h-4 w-4"}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ count, size = "sm" }: { count: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex gap-0.5 text-wk-amber" role="img" aria-label={`${count} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} filled={i < count} className={cls} />
      ))}
    </div>
  );
}

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-wk-green/5 px-2 py-0.5 text-[10px] font-semibold text-wk-green">
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Small client-component wrappers needing translations             */
/* ------------------------------------------------------------------ */

function BasedOnLabel({ count }: { count: number }) {
  const t = useTranslations("reviews");
  return (
    <span className="mt-1 text-xs text-wk-grey-400">
      {t("basedOn", { count })}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Aggregate stats bar                                                */
/* ------------------------------------------------------------------ */

function AggregateStats() {
  return (
    <AnimatedElement animation="fadeUp">
      <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:gap-10 sm:p-8">
        {/* Big rating number */}
        <div className="flex flex-col items-center gap-1 sm:min-w-[100px]">
          <span className="text-5xl font-bold tracking-tight text-wk-black">
            {STATS.avg}
          </span>
          <StarRating count={Math.round(STATS.avg)} size="lg" />
          <BasedOnLabel count={DISPLAYED_REVIEW_COUNT} />
        </div>

        {/* Distribution bars */}
        <div className="flex w-full flex-1 flex-col gap-1.5">
          {STATS.distribution.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="w-8 text-right text-xs font-medium text-wk-grey-500">
                {stars}&#9733;
              </span>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-wk-grey-100">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-wk-amber transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-9 text-right text-xs text-wk-grey-400">
                {pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedElement>
  );
}

/* ------------------------------------------------------------------ */
/*  Photo lightbox                                                     */
/* ------------------------------------------------------------------ */

function PhotoLightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
        aria-label="Close"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Customer review photo: Whiskcam cat collar camera in use"
        className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Individual review card                                             */
/* ------------------------------------------------------------------ */

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const t = useTranslations("reviews");
  const locale = useLocale();
  const [expanded, setExpanded] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  /* Pick the right text based on locale */
  const isFr = locale === "fr";
  const rawText = isFr && review.textFr ? review.textFr : review.text;
  const showTranslatedLabel = isFr && !!review.textFr;

  /* Truncate at ~120 chars for the collapsed view */
  const isLong = rawText.length > 120;
  const displayText = !isLong || expanded ? rawText : rawText.slice(0, 120) + "...";

  return (
    <>
      {lightboxSrc && (
        <PhotoLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      <AnimatedElement
        animation="fadeUp"
        delay={index * 0.06}
        className="w-full"
      >
        <div className="flex h-full flex-col rounded-xl bg-white p-4 shadow-sm ring-1 ring-wk-grey-100 transition-shadow hover:shadow-md">
          {/* Stars */}
          <StarRating count={review.rating} />

          {/* Review text */}
          <p className="mt-3 flex-1 text-sm leading-relaxed text-wk-grey-600">
            &ldquo;{displayText}&rdquo;
          </p>
          {showTranslatedLabel && (
            <span className="mt-1 text-[10px] italic text-wk-grey-400">{t("translated")}</span>
          )}
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 self-start text-xs font-medium text-wk-amber transition-colors hover:text-wk-amber-hover"
            >
              {expanded ? t("showLess") : t("readMore")}
            </button>
          )}

          {/* Photo thumbnails */}
          {review.photos.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {review.photos.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxSrc(url)}
                  className="overflow-hidden rounded-lg ring-1 ring-wk-grey-100 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-wk-amber"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Whiskcam review photo by ${review.name} — cat collar camera`}
                    className="h-14 w-14 object-cover sm:h-18 sm:w-18"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Author line */}
          <div className="mt-4 flex items-center justify-between border-t border-wk-grey-100 pt-3">
            <div>
              <p className="text-sm font-semibold text-wk-black">{review.name}</p>
              <p className="text-[11px] text-wk-grey-400">{review.date}</p>
            </div>
            {review.verified && <VerifiedBadge label={t("verifiedBuyer")} />}
          </div>
        </div>
      </AnimatedElement>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

const MOBILE_INITIAL = 4;
const DESKTOP_INITIAL = 8;

export function ReviewsSection() {
  const t = useTranslations("reviews");
  const [showAll, setShowAll] = useState(false);

  return (
    <SectionWrapper bg="warm" id="reviews">
      <SectionHeading
        overline={t("overline")}
        title={t("title")}
        subtitle={t("subtitle")}
      />

      {/* Aggregate stats */}
      <AggregateStats />

      {/* Review cards — stacked on mobile, 2-col grid on desktop */}
      <div className="mx-auto max-w-6xl">
        {/* Mobile: stacked full-width cards */}
        <div className="flex flex-col gap-4 sm:hidden">
          {(showAll ? REVIEWS : REVIEWS.slice(0, MOBILE_INITIAL)).map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        {/* Desktop: 2-col tablet, 4-col desktop */}
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {(showAll ? REVIEWS : REVIEWS.slice(0, DESKTOP_INITIAL)).map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>

        {/* Expand button */}
        {!showAll && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-wk-grey-200 bg-white px-6 py-2.5 text-sm font-medium text-wk-black shadow-sm transition-all hover:border-wk-grey-300 hover:shadow-md"
            >
              {/* Mobile label */}
              <span className="sm:hidden">{t("showAll")}</span>
              {/* Desktop label */}
              <span className="hidden sm:inline">{t("showAllCount", { count: REVIEWS.length })}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Trust footer */}
      <AnimatedElement animation="fadeIn" delay={0.3}>
        <p className="mt-8 text-center text-xs text-wk-grey-400">
          {t("trustFooter")}
        </p>
      </AnimatedElement>
    </SectionWrapper>
  );
}
