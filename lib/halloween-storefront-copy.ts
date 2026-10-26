// Offer-panel strings for the homepage. `evergreen` copy is always shown;
// `season` copy is only rendered while a seasonal campaign is active (see
// lib/campaign.ts). Offer terms themselves live in lib/campaign-copy.ts, and the
// brand story in lib/brand-storefront-copy.ts.

type StorefrontCopy = {
  evergreen: {
    specVideo: string;
    specWeight: string;
    specView: string;
    specCharge: string;
  };
  season: {
    withoutCode: string;
    autoApplied: string;
    termsTitle: string;
    termsLink: string;
  };
};

const en: StorefrontCopy = {
  evergreen: {
    specVideo: "Video",
    specWeight: "Camera",
    specView: "Field of view",
    specCharge: "Charging",
  },
  season: {
    withoutCode: "{price} without the code",
    autoApplied:
      "The code is added to your bag automatically. Shopify checkout shows the final price before you pay.",
    termsTitle: "Offer terms",
    termsLink: "Offer terms",
  },
};

const copy: Record<string, StorefrontCopy> = {
  en,
  fr: {
    evergreen: {
      specVideo: "Vidéo",
      specWeight: "Caméra",
      specView: "Champ de vision",
      specCharge: "Recharge",
    },
    season: {
      withoutCode: "{price} sans le code",
      autoApplied:
        "Le code est ajouté automatiquement à votre panier. Le paiement Shopify affiche le prix final avant de payer.",
      termsTitle: "Conditions de l’offre",
      termsLink: "Conditions",
    },
  },
  de: {
    evergreen: {
      specVideo: "Video",
      specWeight: "Kamera",
      specView: "Blickwinkel",
      specCharge: "Laden",
    },
    season: {
      withoutCode: "{price} ohne Code",
      autoApplied:
        "Der Code wird automatisch in deinen Warenkorb übernommen. Der Shopify-Checkout zeigt den Endpreis vor der Zahlung.",
      termsTitle: "Angebotsbedingungen",
      termsLink: "Bedingungen",
    },
  },
  es: {
    evergreen: {
      specVideo: "Vídeo",
      specWeight: "Cámara",
      specView: "Ángulo de visión",
      specCharge: "Carga",
    },
    season: {
      withoutCode: "{price} sin el código",
      autoApplied:
        "El código se añade automáticamente a tu cesta. El pago de Shopify muestra el precio final antes de pagar.",
      termsTitle: "Condiciones de la oferta",
      termsLink: "Condiciones",
    },
  },
};

export function getStorefrontCopy(locale: string): StorefrontCopy {
  return copy[locale] ?? en;
}
