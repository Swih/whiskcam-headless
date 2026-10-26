// Whiskcam's consented, bounded Umami collector. No accounts, form values or cart IDs.
const ORIGIN = "https://stats.ritoko.com";
const WEBSITE_ID = "75177f54-582a-473a-b635-57e6a58ed15e";
const CONSENT_KEY = "wk-cookie-consent";
const CONSENT_VERSION = "2";
const EVENTS = new Set([
  "product_view",
  "add_to_cart",
  "checkout_started",
  "blog_product_click",
  "variant_selected",
]);
let started = false;
let lastPage = "";
const pendingEvents: {
  name: string;
  data?: Record<string, unknown>;
  page: string;
}[] = [];

declare global {
  interface Window {
    umami?: {
      track: (
        nameOrPayload?:
          | string
          | ((payload: Record<string, unknown>) => Record<string, unknown>),
        data?: Record<string, unknown>,
      ) => Promise<unknown>;
    };
    whiskcamUmamiBeforeSend?: (
      type: string,
      payload: Record<string, unknown>,
    ) => Record<string, unknown> | false;
  }
}
export function umamiAllowed() {
  if (
    typeof window === "undefined" ||
    !["whiskcam.com", "www.whiskcam.com"].includes(location.hostname)
  )
    return false;
  if (
    navigator.doNotTrack === "1" ||
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl
  )
    return false;
  try {
    const consent = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    const at = Date.parse(consent?.timestamp || "");
    return (
      consent?.accepted === true &&
      consent.version === CONSENT_VERSION &&
      Number.isFinite(at) &&
      at <= Date.now() &&
      Date.now() - at < 180 * 86400_000
    );
  } catch {
    return false;
  }
}
// Only published public pages. Blog article IDs are configured from the registry by the component.
let articleSlugs = new Set<string>();
export function configureUmamiPages(slugs: string[]) {
  articleSlugs = new Set(slugs);
}
export function umamiPath(path: string): string | null {
  const clean = path.split(/[?#]/)[0]?.replace(/\/+$/, "") || "/";
  const unprefixed = clean.replace(/^\/(fr|de|es)(?=\/|$)/, "") || "/";
  if (
    ["/", "/about", "/faq", "/what-is-whiskcam", "/blog"].includes(unprefixed)
  )
    return clean;
  const article = unprefixed.match(/^\/blog\/([a-z0-9-]+)$/)?.[1];
  return article && articleSlugs.has(article) ? clean : null;
}
export function umamiBeforeSend(
  type: string,
  payload: Record<string, unknown>,
) {
  const page = umamiPath(location.pathname);
  if (type !== "event" || !umamiAllowed() || !page) return false;
  if (
    payload.name &&
    (typeof payload.name !== "string" || !EVENTS.has(payload.name))
  )
    return false;
  let referrer = "";
  try {
    referrer = document.referrer ? new URL(document.referrer).origin : "";
  } catch {}
  const raw =
    payload.data && typeof payload.data === "object"
      ? (payload.data as Record<string, unknown>)
      : {};
  const data: Record<string, unknown> = {};
  if (raw.promo === "halloween15" || raw.promo === "autumn10")
    data.promo = raw.promo;
  if (raw.variant === "original" || raw.variant === "duo")
    data.variant = raw.variant;
  if (
    typeof raw.quantity === "number" &&
    Number.isInteger(raw.quantity) &&
    raw.quantity >= 1 &&
    raw.quantity <= 20
  )
    data.quantity = raw.quantity;
  if (
    typeof raw.article_slug === "string" &&
    articleSlugs.has(raw.article_slug)
  )
    data.article_slug = raw.article_slug;
  if (["comparison", "article-footer"].includes(String(raw.cta_placement)))
    data.cta_placement = raw.cta_placement;
  return {
    website: WEBSITE_ID,
    hostname: location.hostname,
    url: page,
    referrer,
    language: navigator.language,
    screen: `${screen.width}x${screen.height}`,
    ...(payload.name ? { name: payload.name, data } : {}),
  };
}
export function trackUmami(name: string, data?: Record<string, unknown>) {
  if (!EVENTS.has(name) || !umamiAllowed() || !umamiPath(location.pathname))
    return;
  if (!window.umami) {
    if (pendingEvents.length < 20)
      pendingEvents.push({ name, data, page: umamiPath(location.pathname)! });
    return;
  }
  try {
    Promise.resolve(window.umami?.track(name, data)).catch(() => {});
  } catch {
    /* analytics cannot break shopping */
  }
}
function pageView() {
  const page = umamiPath(location.pathname);
  if (!umamiAllowed() || !page || !window.umami || page === lastPage) return;
  lastPage = page;
  try {
    Promise.resolve(window.umami.track()).catch(() => {
      lastPage = "";
    });
  } catch {
    lastPage = "";
  }
}
export function syncUmami() {
  if (!umamiAllowed()) {
    lastPage = "";
    pendingEvents.length = 0;
    return;
  }
  window.whiskcamUmamiBeforeSend = umamiBeforeSend;
  if (started) {
    pageView();
    return;
  }
  if (!umamiPath(location.pathname)) return;
  started = true;
  const script = document.createElement("script");
  script.id = "wk-umami";
  script.src = `${ORIGIN}/script.js`;
  script.defer = true;
  script.dataset.websiteId = WEBSITE_ID;
  script.dataset.autoTrack = "false";
  script.dataset.doNotTrack = "true";
  script.dataset.excludeSearch = "true";
  script.dataset.excludeHash = "true";
  script.dataset.beforeSend = "whiskcamUmamiBeforeSend";
  script.onload = () => {
    pageView();
    for (const entry of pendingEvents.splice(0))
      if (entry.page === umamiPath(location.pathname))
        trackUmami(entry.name, entry.data);
  };
  script.onerror = () => {
    started = false;
    script.remove();
  };
  document.head.append(script);
}
