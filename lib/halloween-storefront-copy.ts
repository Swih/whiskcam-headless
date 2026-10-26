// Storefront strings added with the autumn 2026 homepage. `evergreen` copy is
// always shown; `season` copy is only rendered while the Halloween campaign is
// active (see lib/campaign.ts). Offer terms themselves live in lib/campaign-copy.ts.

type StorefrontCopy = {
  evergreen: {
    productKind: string;
    productRecords: string;
    specVideo: string;
    specWeight: string;
    specView: string;
    specCharge: string;
    promiseDetails: [string, string, string];
    howItRecords: string;
  };
  season: {
    kicker: string;
    withoutCode: string;
    autoApplied: string;
    termsTitle: string;
    filmLabel: string;
    footageEyebrow: string;
    footageNote: string;
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
    promiseDetails: [
      "Press the button. Video is saved to a microSD card, sold separately.",
      "Open the card on your phone with the included adapter or a card reader.",
      "No account, no cloud, no subscription.",
    ],
    howItRecords: "How it records",
  },
  season: {
    kicker: "Halloween, in broad daylight.",
    withoutCode: "{price} without the code",
    autoApplied:
      "The code is added to your bag automatically. Shopify checkout shows the final price before you pay.",
    termsTitle: "Offer terms",
    filmLabel: "DAYLIGHT ROUNDS",
    footageEyebrow: "DAYLIGHT MISCHIEF",
    footageNote:
      "Their mischief doesn’t wait for dark. Film their daytime rounds — Whiskcam is not a night-vision camera.",
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
      promiseDetails: [
        "Un bouton. La vidéo s’enregistre sur une carte microSD, vendue séparément.",
        "Ouvrez la carte sur votre téléphone avec l’adaptateur inclus ou un lecteur.",
        "Sans compte, sans cloud, sans abonnement.",
      ],
      howItRecords: "Comment elle filme",
    },
    season: {
      kicker: "Halloween, en plein jour.",
      withoutCode: "{price} sans le code",
      autoApplied:
        "Le code est ajouté automatiquement à votre panier. Le paiement Shopify affiche le prix final avant de payer.",
      termsTitle: "Conditions de l’offre",
      filmLabel: "RONDE DE JOUR",
      footageEyebrow: "MALICES EN PLEIN JOUR",
      footageNote:
        "Ses bêtises n’attendent pas la nuit. Filmez ses rondes de jour — Whiskcam n’est pas une caméra de vision nocturne.",
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
      promiseDetails: [
        "Knopf drücken. Das Video wird auf einer microSD-Karte gespeichert (separat erhältlich).",
        "Öffne die Karte mit dem beiliegenden Adapter oder einem Kartenleser auf deinem Handy.",
        "Kein Konto, keine Cloud, kein Abo.",
      ],
      howItRecords: "So nimmt sie auf",
    },
    season: {
      kicker: "Halloween am helllichten Tag.",
      withoutCode: "{price} ohne Code",
      autoApplied:
        "Der Code wird automatisch in deinen Warenkorb übernommen. Der Shopify-Checkout zeigt den Endpreis vor der Zahlung.",
      termsTitle: "Angebotsbedingungen",
      filmLabel: "TAGESRUNDE",
      footageEyebrow: "UNFUG BEI TAGESLICHT",
      footageNote:
        "Ihr Unfug wartet nicht auf die Dunkelheit. Filme ihre Runden bei Tag — Whiskcam ist keine Nachtsichtkamera.",
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
      promiseDetails: [
        "Pulsa el botón. El vídeo se guarda en una tarjeta microSD, que se vende por separado.",
        "Abre la tarjeta en tu móvil con el adaptador incluido o un lector de tarjetas.",
        "Sin cuenta, sin nube, sin suscripción.",
      ],
      howItRecords: "Cómo graba",
    },
    season: {
      kicker: "Halloween a plena luz del día.",
      withoutCode: "{price} sin el código",
      autoApplied:
        "El código se añade automáticamente a tu cesta. El pago de Shopify muestra el precio final antes de pagar.",
      termsTitle: "Condiciones de la oferta",
      filmLabel: "RONDA DE DÍA",
      footageEyebrow: "TRAVESURAS A PLENA LUZ",
      footageNote:
        "Sus travesuras no esperan a la noche. Graba sus rondas de día — Whiskcam no es una cámara de visión nocturna.",
    },
  },
};

export function getStorefrontCopy(locale: string): StorefrontCopy {
  return copy[locale] ?? en;
}
