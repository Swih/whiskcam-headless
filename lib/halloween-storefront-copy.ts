// Offer-panel strings for the homepage. `evergreen` copy is always shown;
// `season` copy is only rendered while a seasonal campaign is active (see
// lib/campaign.ts). Offer terms themselves live in lib/campaign-copy.ts, and the
// brand world (headline, screening, fit checklist) in lib/brand-storefront-copy.ts.

type StorefrontCopy = {
  evergreen: {
    productKind: string;
    productRecords: string;
    specVideo: string;
    specWeight: string;
    specView: string;
    specCharge: string;
  };
  season: {
    /** Ticket-stub headline in the offer panel, per campaign. */
    kicker: { halloween: string; autumn: string };
    withoutCode: string;
    autoApplied: string;
    termsTitle: string;
  };
};

const en: StorefrontCopy = {
  evergreen: {
    productKind: "Cat collar camera kit",
    productRecords:
      "Records to a microSD card (sold separately). No WiFi or app needed to record.",
    specVideo: "Video",
    specWeight: "Camera",
    specView: "Field of view",
    specCharge: "Charging",
  },
  season: {
    kicker: {
      halloween: "Little Monsters: the Halloween edit",
      autumn: "The autumn screening",
    },
    withoutCode: "{price} without the code",
    autoApplied:
      "The code is added to your bag automatically. Shopify checkout shows the final price before you pay.",
    termsTitle: "Offer terms",
  },
};

const copy: Record<string, StorefrontCopy> = {
  en,
  fr: {
    evergreen: {
      productKind: "Kit caméra collier pour chat",
      productRecords:
        "Enregistre sur carte microSD (vendue séparément). Sans WiFi ni appli pour filmer.",
      specVideo: "Vidéo",
      specWeight: "Caméra",
      specView: "Champ de vision",
      specCharge: "Recharge",
    },
    season: {
      kicker: {
        halloween: "Petits Monstres : l’édition Halloween",
        autumn: "La séance d’automne",
      },
      withoutCode: "{price} sans le code",
      autoApplied:
        "Le code est ajouté automatiquement à votre panier. Le paiement Shopify affiche le prix final avant de payer.",
      termsTitle: "Conditions de l’offre",
    },
  },
  de: {
    evergreen: {
      productKind: "Halsbandkamera-Set für Katzen",
      productRecords:
        "Speichert auf microSD-Karte (separat erhältlich). Zum Filmen sind weder WLAN noch App nötig.",
      specVideo: "Video",
      specWeight: "Kamera",
      specView: "Blickwinkel",
      specCharge: "Laden",
    },
    season: {
      kicker: {
        halloween: "Kleine Monster: die Halloween-Edition",
        autumn: "Die Herbstvorstellung",
      },
      withoutCode: "{price} ohne Code",
      autoApplied:
        "Der Code wird automatisch in deinen Warenkorb übernommen. Der Shopify-Checkout zeigt den Endpreis vor der Zahlung.",
      termsTitle: "Angebotsbedingungen",
    },
  },
  es: {
    evergreen: {
      productKind: "Kit de cámara de collar para gatos",
      productRecords:
        "Graba en una tarjeta microSD (se vende por separado). No necesita WiFi ni app para grabar.",
      specVideo: "Vídeo",
      specWeight: "Cámara",
      specView: "Ángulo de visión",
      specCharge: "Carga",
    },
    season: {
      kicker: {
        halloween: "Pequeños Monstruos: la edición Halloween",
        autumn: "La sesión de otoño",
      },
      withoutCode: "{price} sin el código",
      autoApplied:
        "El código se añade automáticamente a tu cesta. El pago de Shopify muestra el precio final antes de pagar.",
      termsTitle: "Condiciones de la oferta",
    },
  },
};

export function getStorefrontCopy(locale: string): StorefrontCopy {
  return copy[locale] ?? en;
}
