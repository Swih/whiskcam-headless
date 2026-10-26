import type { SeasonalCampaign } from "./campaign";

const en = {
  name: "The Halloween edit",
  banner: "15% off Original & Duo",
  deadline: "Until 31 Oct, 23:59 Paris time",
  code: "Code HALLOWEEN15",
  terms:
    "Original and Duo only. Cannot be combined with other discounts. MicroSD not included. Delivery to supported destinations only; arrival by Halloween is not promised.",
  withCode: "with HALLOWEEN15",
  applied: "Halloween offer applied",
  pending: "HALLOWEEN15: 15% off eligible kits, applied at checkout.",
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
    banner: "−15 % sur Original et Duo",
    deadline: "Jusqu’au 31 oct., 23 h 59, heure de Paris",
    code: "Code HALLOWEEN15",
    terms:
      "Sur Original et Duo uniquement. Non cumulable avec d’autres réductions. MicroSD non incluse. Livraison dans les destinations desservies ; arrivée avant Halloween non garantie.",
    withCode: "avec HALLOWEEN15",
    applied: "Offre Halloween appliquée",
    pending:
      "HALLOWEEN15 : −15 % sur les kits éligibles, appliqués au paiement.",
    beforeOffer: "Avant réduction éventuelle au paiement",
    shipping: "Livraison standard vers les destinations desservies",
    checkoutError:
      "Le paiement n’a pas pu s’ouvrir. Réessayez ou contactez support@whiskcam.com.",
  },
  de: {
    name: "Die Halloween-Edition",
    banner: "15 % Rabatt auf Original & Duo",
    deadline: "Bis 31. Okt., 23:59 Uhr Pariser Zeit",
    code: "Code HALLOWEEN15",
    terms:
      "Nur für Original und Duo. Nicht mit anderen Rabatten kombinierbar. MicroSD nicht enthalten. Lieferung nur an unterstützte Ziele; Ankunft bis Halloween nicht zugesichert.",
    withCode: "mit HALLOWEEN15",
    applied: "Halloween-Rabatt angewendet",
    pending: "HALLOWEEN15: 15 % auf berechtigte Sets, an der Kasse angewendet.",
    beforeOffer: "Vor einem möglichen Kassenrabatt",
    shipping: "Standardversand an unterstützte Ziele",
    checkoutError:
      "Die Kasse konnte nicht geöffnet werden. Versuche es erneut oder kontaktiere support@whiskcam.com.",
  },
  es: {
    name: "La edición Halloween",
    banner: "15 % de descuento en Original y Duo",
    deadline: "Hasta el 31 de oct., 23:59, hora de París",
    code: "Código HALLOWEEN15",
    terms:
      "Solo Original y Duo. No acumulable con otros descuentos. MicroSD no incluida. Envío solo a destinos disponibles; no se garantiza la llegada antes de Halloween.",
    withCode: "con HALLOWEEN15",
    applied: "Oferta Halloween aplicada",
    pending: "HALLOWEEN15: 15 % en kits elegibles, aplicado al pagar.",
    beforeOffer: "Antes de posibles descuentos al pagar",
    shipping: "Envío estándar a los destinos disponibles",
    checkoutError:
      "No se ha podido abrir el pago. Inténtalo de nuevo o contacta con support@whiskcam.com.",
  },
};

const autumn: Record<
  string,
  Pick<CampaignCopy, "name" | "deadline" | "applied" | "terms">
> = {
  en: {
    name: "The autumn edit",
    deadline: "Until 8 Nov, 23:59 Paris time",
    applied: "Autumn offer applied",
    terms:
      "Original and Duo only. Cannot be combined with other discounts. MicroSD not included. Delivery to supported destinations only; check the estimate before ordering.",
  },
  fr: {
    name: "L’édition automne",
    deadline: "Jusqu’au 8 nov., 23 h 59, heure de Paris",
    applied: "Offre automne appliquée",
    terms:
      "Sur Original et Duo uniquement. Non cumulable avec d’autres réductions. MicroSD non incluse. Livraison dans les destinations desservies ; vérifiez le délai estimé avant de commander.",
  },
  de: {
    name: "Die Herbst-Edition",
    deadline: "Bis 8. Nov., 23:59 Uhr Pariser Zeit",
    applied: "Herbstrabatt angewendet",
    terms:
      "Nur für Original und Duo. Nicht mit anderen Rabatten kombinierbar. MicroSD nicht enthalten. Lieferung nur an unterstützte Ziele; prüfe die Lieferzeit vor der Bestellung.",
  },
  es: {
    name: "La edición otoño",
    deadline: "Hasta el 8 de nov., 23:59, hora de París",
    applied: "Oferta de otoño aplicada",
    terms:
      "Solo Original y Duo. No acumulable con otros descuentos. MicroSD no incluida. Envío solo a destinos disponibles; consulta el plazo estimado antes de comprar.",
  },
};

export function getCampaignCopy(
  locale: string,
  campaign?: SeasonalCampaign | null,
): CampaignCopy {
  const base = copy[locale] ?? en;
  if (campaign?.code !== "AUTUMN10") return base;
  return {
    ...base,
    ...(autumn[locale] ?? autumn.en),
    banner: base.banner.replace("15", "10"),
    code: base.code.replace("HALLOWEEN15", "AUTUMN10"),
    withCode: base.withCode.replace("HALLOWEEN15", "AUTUMN10"),
    pending: base.pending
      .replace("HALLOWEEN15", "AUTUMN10")
      .replace("15", "10"),
  } as CampaignCopy;
}
