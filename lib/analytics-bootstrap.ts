/** Consent must be read when the tag initializes, after hydration and script loading. */
export function ga4Bootstrap(measurementId: string, checkoutDomain?: string) {
  const domains = ["whiskcam.com", "checkout.whiskcam.com", checkoutDomain]
    .filter((domain): domain is string => Boolean(domain))
    .map((domain) => domain.replace(/^https?:\/\//, "").split("/")[0])
    .filter((domain, index, all) => all.indexOf(domain) === index);

  return `
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    var accepted = false;
    try {
      var raw = localStorage.getItem('wk-cookie-consent');
      accepted = raw === 'accepted' || JSON.parse(raw || 'null')?.accepted === true;
    } catch (_) {}
    var permission = accepted ? 'granted' : 'denied';
    window.gtag('consent', 'default', {
      analytics_storage: permission,
      ad_storage: permission,
      ad_user_data: permission,
      ad_personalization: permission
    });
    window.gtag('js', new Date());
    window.gtag('config', ${JSON.stringify(measurementId)}, {
      page_path: window.location.pathname,
      linker: { domains: ${JSON.stringify(domains)}, accept_incoming: true }
    });
  `;
}
