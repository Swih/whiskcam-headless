const en = {
  name: "The Halloween edit",
  banner: "10% off Original & Duo",
  deadline: "Until 31 Oct, 23:59 Paris time",
  code: "Code HALLOWEEN10",
  terms:
    "Original and Duo only. Cannot be combined with other discounts. MicroSD not included. Delivery to supported destinations only; arrival by Halloween is not promised.",
  withCode: "with HALLOWEEN10",
  applied: "Halloween offer applied",
  pending: "HALLOWEEN10: 10% off eligible kits, applied at checkout.",
  beforeOffer: "Before any checkout discount",
  shipping: "Standard delivery to supported destinations",
  checkoutError:
    "Checkout could not open. Please try again or contact support@whiskcam.com.",
};

type CampaignCopy = typeof en;

const copy: Record<string, CampaignCopy> = {
  en,
  fr: {
    name: "L’édition Halloween",
    banner: "−10 % sur Original et Duo",
    deadline: "Jusqu’au 31 oct., 23 h 59, heure de Paris",
    code: "Code HALLOWEEN10",
    terms:
      "Sur Original et Duo uniquement. Non cumulable avec d’autres réductions. MicroSD non incluse. Livraison dans les destinations desservies ; arrivée avant Halloween non garantie.",
    withCode: "avec HALLOWEEN10",
    applied: "Offre Halloween appliquée",
    pending:
      "HALLOWEEN10 : −10 % sur les kits éligibles, appliqués au paiement.",
    beforeOffer: "Avant réduction éventuelle au paiement",
    shipping: "Livraison standard vers les destinations desservies",
    checkoutError:
      "Le paiement n’a pas pu s’ouvrir. Réessayez ou contactez support@whiskcam.com.",
  },
  de: {
    name: "Die Halloween-Edition",
    banner: "10 % Rabatt auf Original & Duo",
    deadline: "Bis 31. Okt., 23:59 Uhr Pariser Zeit",
    code: "Code HALLOWEEN10",
    terms:
      "Nur für Original und Duo. Nicht mit anderen Rabatten kombinierbar. MicroSD nicht enthalten. Lieferung nur an unterstützte Ziele; Ankunft bis Halloween nicht zugesichert.",
    withCode: "mit HALLOWEEN10",
    applied: "Halloween-Rabatt angewendet",
    pending: "HALLOWEEN10: 10 % auf berechtigte Sets, an der Kasse angewendet.",
    beforeOffer: "Vor einem möglichen Kassenrabatt",
    shipping: "Standardversand an unterstützte Ziele",
    checkoutError:
      "Die Kasse konnte nicht geöffnet werden. Versuche es erneut oder kontaktiere support@whiskcam.com.",
  },
  es: {
    name: "La edición Halloween",
    banner: "10 % de descuento en Original y Duo",
    deadline: "Hasta el 31 de oct., 23:59, hora de París",
    code: "Código HALLOWEEN10",
    terms:
      "Solo Original y Duo. No acumulable con otros descuentos. MicroSD no incluida. Envío solo a destinos disponibles; no se garantiza la llegada antes de Halloween.",
    withCode: "con HALLOWEEN10",
    applied: "Oferta Halloween aplicada",
    pending: "HALLOWEEN10: 10 % en kits elegibles, aplicado al pagar.",
    beforeOffer: "Antes de posibles descuentos al pagar",
    shipping: "Envío estándar a los destinos disponibles",
    checkoutError:
      "No se ha podido abrir el pago. Inténtalo de nuevo o contacta con support@whiskcam.com.",
  },
};

export function getCampaignCopy(locale: string): CampaignCopy {
  return copy[locale] ?? en;
}
