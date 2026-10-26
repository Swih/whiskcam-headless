// The Whiskcam brand world on the homepage: "a film by your cat". The camera
// records at collar height and you watch the cut afterwards, so the language is
// film and tape (premiere, screening, box office), never live signal or
// streaming. Seasonal lines are chosen by campaign; everything else is evergreen.
// `{weight}` is filled from PRODUCT_FACTS so the spec cannot drift here.

export type Season = "halloween" | "autumn" | "evergreen";

type ValueItem = { title: string; body: string; link: string };

type BrandCopy = {
  /** Visible category descriptor, part of the H1. */
  category: string;
  /** Pixel display line of the H1. Campaign-neutral so the server H1 is stable. */
  headline: string;
  intro: string;
  credits: Record<Season, string>;
  portraitAlt: string;
  /** Toggle that removes the scanline treatment from the hero photo. */
  fullColour: string;
  realClip: string;
  boxOffice: string;
  kitLine: { single: string; duo: string };
  sound: string;
  addKit: { single: string; duo: string };
  panelNote: string;
  details: string;
  strip: {
    camera: string;
    sound: string;
    view: string;
    offline: string;
    card: string;
  };
  screening: {
    eyebrow: string;
    title: string;
    intro: string;
    tape: string;
    halloween: string;
    autumn: string;
    nightNote: string;
  };
  fit: {
    eyebrow: string;
    title: string;
    intro: string;
    yesTitle: string;
    yes: string[];
    noTitle: string;
    no: string[];
  };
  value: {
    eyebrow: string;
    title: string;
    guide: Omit<ValueItem, "title">;
    clips: ValueItem;
    playback: ValueItem;
    support: Omit<ValueItem, "link">;
    refund: ValueItem;
  };
};

const en: BrandCopy = {
  category: "Whiskcam cat collar camera",
  headline: "A film by your cat.",
  intro:
    "Clip the {weight} g camera to their collar, press record, and watch their 1080P point of view — with sound — once they’re home. No WiFi, app or subscription needed to record.",
  credits: {
    evergreen: "Whiskcam Pictures presents",
    halloween: "A Halloween premiere: Little Monsters",
    autumn: "An autumn screening",
  },
  portraitAlt:
    "Black and white cat resting on a sofa, wearing a Whiskcam camera on its collar",
  fullColour: "Full colour",
  realClip: "Real Whiskcam clip",
  boxOffice: "Box office",
  kitLine: {
    single: "Cat collar camera kit · 1 camera",
    duo: "2 cameras · for two cats",
  },
  sound: "sound",
  addKit: { single: "Add Original to bag", duo: "Add Duo to bag" },
  panelNote: "MicroSD card sold separately, one per camera.",
  details: "What’s in the kit, delivery & phones",
  strip: {
    camera: "camera",
    sound: "1080P with sound",
    view: "wide view",
    offline: "No WiFi, app or subscription to record",
    card: "MicroSD sold separately",
  },
  screening: {
    eyebrow: "Now screening",
    title: "Real clips, filmed at collar height.",
    intro:
      "Unscripted footage from Whiskcam cameras. Play one, look at the detail, and decide whether this is the view you want.",
    tape: "Tape",
    halloween: "Little Monsters · the daylight cut",
    autumn: "Autumn rounds",
    nightNote:
      "Monsters roam in daylight too: Whiskcam is not a night-vision camera, so film their daytime rounds.",
  },
  fit: {
    eyebrow: "Before the premiere",
    title: "Is it for your cat?",
    intro:
      "An honest checklist. If the right-hand column sounds more like you, another device will serve you better.",
    yesTitle: "A good fit if",
    yes: [
      "Your cat already wears a collar calmly, or you’ll get them used to a breakaway collar at home first.",
      "You want to watch their day afterwards, not follow them live.",
      "You’re happy to add a microSD card, one per camera.",
      "You can play AVI files, or don’t mind using VLC or converting to MP4 — on iPhone too.",
    ],
    noTitle: "Choose something else if",
    no: [
      "You need GPS location or live video.",
      "You mainly want footage at night: there is no night vision.",
      "Your cat won’t tolerate a collar, or your vet has advised against one.",
      "You need a guaranteed recording time: continuous runtime is still being verified.",
    ],
  },
  value: {
    eyebrow: "Buying from Whiskcam",
    title: "The camera, plus the help to use it.",
    guide: {
      body: "Our step-by-step guide: the card, the fit, a short test at home and playback. In English, French, German and Spanish.",
      link: "Read the guide",
    },
    clips: {
      title: "Real sample clips",
      body: "See what the camera actually films before you order. No simulated footage.",
      link: "Watch the clips",
    },
    playback: {
      title: "Phone playback help",
      body: "Clear instructions for AVI files, including on iPhone.",
      link: "Playback guide",
    },
    support: {
      title: "A person on email",
      body: "Questions about fit, your phone or delivery, before or after you order.",
    },
    refund: {
      title: "30-day refund policy",
      body: "Return shipping is normally paid by the customer. Read the full policy before ordering.",
      link: "Refund policy",
    },
  },
};

const copy: Record<string, BrandCopy> = {
  en,
  fr: {
    category: "Caméra collier pour chat Whiskcam",
    headline: "Un film de votre chat.",
    intro:
      "Fixez la caméra de {weight} g à son collier, lancez l’enregistrement et découvrez son point de vue en 1080P, avec le son, à son retour. Ni WiFi, ni appli, ni abonnement pour filmer.",
    credits: {
      evergreen: "Whiskcam Pictures présente",
      halloween: "Avant-première d’Halloween : Petits Monstres",
      autumn: "Une séance d’automne",
    },
    portraitAlt:
      "Chat noir et blanc allongé sur un canapé, une caméra Whiskcam au collier",
    fullColour: "Couleurs réelles",
    realClip: "Vraie vidéo Whiskcam",
    boxOffice: "Billetterie",
    kitLine: {
      single: "Kit caméra collier pour chat · 1 caméra",
      duo: "2 caméras · pour deux chats",
    },
    sound: "son",
    addKit: {
      single: "Ajouter l’Original au panier",
      duo: "Ajouter le Duo au panier",
    },
    panelNote: "Carte microSD vendue séparément, une par caméra.",
    details: "Contenu du kit, livraison et téléphones",
    strip: {
      camera: "caméra",
      sound: "1080P avec le son",
      view: "grand angle",
      offline: "Ni WiFi, ni appli, ni abonnement pour filmer",
      card: "MicroSD vendue séparément",
    },
    screening: {
      eyebrow: "À l’affiche",
      title: "De vraies vidéos, filmées à hauteur de collier.",
      intro:
        "Des images Whiskcam sans mise en scène. Lancez-en une, regardez les détails et voyez si c’est le point de vue que vous voulez.",
      tape: "Bande",
      halloween: "Petits Monstres · version plein jour",
      autumn: "Rondes d’automne",
      nightNote:
        "Les monstres sortent aussi en plein jour : Whiskcam n’a pas de vision nocturne, filmez donc ses rondes de jour.",
    },
    fit: {
      eyebrow: "Avant la séance",
      title: "Est-ce fait pour votre chat ?",
      intro:
        "Une liste honnête. Si la colonne de droite vous ressemble davantage, un autre appareil vous conviendra mieux.",
      yesTitle: "Bon choix si",
      yes: [
        "Votre chat porte déjà calmement un collier, ou vous l’habituerez d’abord à la maison à un collier anti-étranglement.",
        "Vous voulez revoir sa journée ensuite, pas le suivre en direct.",
        "Vous acceptez d’ajouter une carte microSD, une par caméra.",
        "Vous pouvez lire des fichiers AVI, ou utiliser VLC ou une conversion en MP4, y compris sur iPhone.",
      ],
      noTitle: "Choisissez autre chose si",
      no: [
        "Vous avez besoin d’une localisation GPS ou de vidéo en direct.",
        "Vous voulez surtout filmer la nuit : il n’y a pas de vision nocturne.",
        "Votre chat ne supporte pas le collier, ou votre vétérinaire le déconseille.",
        "Il vous faut une durée d’enregistrement garantie : l’autonomie en continu est encore en cours de vérification.",
      ],
    },
    value: {
      eyebrow: "Acheter chez Whiskcam",
      title: "La caméra, et l’aide pour bien l’utiliser.",
      guide: {
        body: "Notre guide pas à pas : la carte, l’ajustement, un court essai à la maison et la lecture. En français, anglais, allemand et espagnol.",
        link: "Lire le guide",
      },
      clips: {
        title: "De vraies vidéos d’exemple",
        body: "Voyez ce que filme vraiment la caméra avant de commander. Aucune image simulée.",
        link: "Voir les vidéos",
      },
      playback: {
        title: "Aide à la lecture sur téléphone",
        body: "Des explications claires pour les fichiers AVI, y compris sur iPhone.",
        link: "Guide de lecture",
      },
      support: {
        title: "Une vraie personne par e-mail",
        body: "Ajustement, téléphone ou livraison : posez vos questions avant ou après la commande.",
      },
      refund: {
        title: "Remboursement sous 30 jours",
        body: "Les frais de retour sont normalement à la charge du client. Lisez la politique complète avant de commander.",
        link: "Politique de remboursement",
      },
    },
  },
  de: {
    category: "Whiskcam Halsbandkamera für Katzen",
    headline: "Ein Film von deiner Katze.",
    intro:
      "Befestige die {weight}-g-Kamera am Halsband, starte die Aufnahme und sieh dir ihre Perspektive in 1080P – mit Ton – an, wenn sie zurück ist. Zum Aufnehmen brauchst du weder WLAN noch App oder Abo.",
    credits: {
      evergreen: "Whiskcam Pictures präsentiert",
      halloween: "Halloween-Premiere: Kleine Monster",
      autumn: "Eine Herbstvorstellung",
    },
    portraitAlt:
      "Schwarz-weiße Katze auf einem Sofa, mit einer Whiskcam-Kamera am Halsband",
    fullColour: "Echte Farben",
    realClip: "Echter Whiskcam-Clip",
    boxOffice: "Kasse",
    kitLine: {
      single: "Halsbandkamera-Set für Katzen · 1 Kamera",
      duo: "2 Kameras · für zwei Katzen",
    },
    sound: "Ton",
    addKit: {
      single: "Original in den Warenkorb",
      duo: "Duo in den Warenkorb",
    },
    panelNote: "MicroSD-Karte separat erhältlich, eine pro Kamera.",
    details: "Lieferumfang, Versand & Handys",
    strip: {
      camera: "Kamera",
      sound: "1080P mit Ton",
      view: "Weitwinkel",
      offline: "Kein WLAN, keine App, kein Abo zum Aufnehmen",
      card: "MicroSD separat erhältlich",
    },
    screening: {
      eyebrow: "Jetzt im Programm",
      title: "Echte Clips, gefilmt auf Halsbandhöhe.",
      intro:
        "Ungestellte Aufnahmen von Whiskcam-Kameras. Spiel einen Clip ab, achte auf die Details und entscheide, ob das die Perspektive ist, die du willst.",
      tape: "Band",
      halloween: "Kleine Monster · die Tageslicht-Fassung",
      autumn: "Herbstrunden",
      nightNote:
        "Monster sind auch tagsüber unterwegs: Whiskcam hat keine Nachtsicht – filme also ihre Runden bei Tag.",
    },
    fit: {
      eyebrow: "Vor der Vorstellung",
      title: "Passt sie zu deiner Katze?",
      intro:
        "Eine ehrliche Checkliste. Wenn die rechte Spalte eher auf dich zutrifft, ist ein anderes Gerät die bessere Wahl.",
      yesTitle: "Passt gut, wenn",
      yes: [
        "deine Katze bereits ruhig ein Halsband trägt oder du sie zu Hause zuerst an ein Sicherheitshalsband gewöhnst.",
        "du ihren Tag später ansehen möchtest, statt ihr live zu folgen.",
        "du bereit bist, eine microSD-Karte dazuzukaufen, eine pro Kamera.",
        "du AVI-Dateien abspielen kannst oder VLC bzw. eine MP4-Umwandlung nutzt – auch auf dem iPhone.",
      ],
      noTitle: "Wähle etwas anderes, wenn",
      no: [
        "du GPS-Ortung oder Live-Video brauchst.",
        "du vor allem nachts filmen willst: Es gibt keine Nachtsicht.",
        "deine Katze kein Halsband verträgt oder dein Tierarzt davon abrät.",
        "du eine garantierte Aufnahmedauer brauchst: Die Dauerlaufzeit wird noch überprüft.",
      ],
    },
    value: {
      eyebrow: "Bei Whiskcam kaufen",
      title: "Die Kamera – und Hilfe, damit sie gut funktioniert.",
      guide: {
        body: "Unsere Schritt-für-Schritt-Anleitung: Karte, Sitz, ein kurzer Test zu Hause und Wiedergabe. Auf Deutsch, Englisch, Französisch und Spanisch.",
        link: "Zur Anleitung",
      },
      clips: {
        title: "Echte Beispielclips",
        body: "Sieh vor der Bestellung, was die Kamera wirklich filmt. Keine simulierten Aufnahmen.",
        link: "Clips ansehen",
      },
      playback: {
        title: "Hilfe bei der Wiedergabe am Handy",
        body: "Klare Anleitung für AVI-Dateien, auch auf dem iPhone.",
        link: "Zur Wiedergabe-Anleitung",
      },
      support: {
        title: "Ein Mensch per E-Mail",
        body: "Fragen zu Sitz, Handy oder Versand – vor oder nach der Bestellung.",
      },
      refund: {
        title: "30-Tage-Erstattungsrichtlinie",
        body: "Die Rücksendekosten trägt in der Regel der Kunde. Lies die vollständige Richtlinie vor der Bestellung.",
        link: "Erstattungsrichtlinie",
      },
    },
  },
  es: {
    category: "Cámara de collar para gatos Whiskcam",
    headline: "Una película de tu gato.",
    intro:
      "Engancha la cámara de {weight} g a su collar, pulsa grabar y descubre su punto de vista en 1080P, con sonido, cuando vuelva. Sin WiFi, app ni suscripción para grabar.",
    credits: {
      evergreen: "Whiskcam Pictures presenta",
      halloween: "Estreno de Halloween: Pequeños Monstruos",
      autumn: "Una sesión de otoño",
    },
    portraitAlt:
      "Gato blanco y negro tumbado en un sofá, con una cámara Whiskcam en el collar",
    fullColour: "Color real",
    realClip: "Vídeo real de Whiskcam",
    boxOffice: "Taquilla",
    kitLine: {
      single: "Kit de cámara de collar para gatos · 1 cámara",
      duo: "2 cámaras · para dos gatos",
    },
    sound: "sonido",
    addKit: {
      single: "Añadir Original a la cesta",
      duo: "Añadir Duo a la cesta",
    },
    panelNote: "Tarjeta microSD no incluida, una por cámara.",
    details: "Contenido del kit, envío y móviles",
    strip: {
      camera: "cámara",
      sound: "1080P con sonido",
      view: "gran angular",
      offline: "Sin WiFi, app ni suscripción para grabar",
      card: "MicroSD no incluida",
    },
    screening: {
      eyebrow: "En cartelera",
      title: "Vídeos reales, grabados a la altura del collar.",
      intro:
        "Imágenes de cámaras Whiskcam sin guion. Reproduce una, fíjate en los detalles y decide si es el punto de vista que quieres.",
      tape: "Cinta",
      halloween: "Pequeños Monstruos · versión a plena luz",
      autumn: "Rondas de otoño",
      nightNote:
        "Los monstruos también salen de día: Whiskcam no tiene visión nocturna, así que graba sus rondas diurnas.",
    },
    fit: {
      eyebrow: "Antes de la función",
      title: "¿Es para tu gato?",
      intro:
        "Una lista honesta. Si te identificas más con la columna derecha, otro dispositivo te servirá mejor.",
      yesTitle: "Encaja si",
      yes: [
        "Tu gato ya lleva collar con calma, o primero lo acostumbrarás en casa a un collar con cierre de seguridad.",
        "Quieres ver su día después, no seguirlo en directo.",
        "No te importa añadir una tarjeta microSD, una por cámara.",
        "Puedes reproducir archivos AVI, o usar VLC o convertirlos a MP4, también en iPhone.",
      ],
      noTitle: "Elige otra cosa si",
      no: [
        "Necesitas localización GPS o vídeo en directo.",
        "Quieres grabar sobre todo de noche: no tiene visión nocturna.",
        "Tu gato no tolera el collar o tu veterinario lo desaconseja.",
        "Necesitas un tiempo de grabación garantizado: la autonomía continua aún se está verificando.",
      ],
    },
    value: {
      eyebrow: "Comprar en Whiskcam",
      title: "La cámara, y ayuda para usarla bien.",
      guide: {
        body: "Nuestra guía paso a paso: la tarjeta, el ajuste, una prueba corta en casa y la reproducción. En español, inglés, francés y alemán.",
        link: "Leer la guía",
      },
      clips: {
        title: "Vídeos de ejemplo reales",
        body: "Mira lo que graba de verdad la cámara antes de pedir. Sin imágenes simuladas.",
        link: "Ver los vídeos",
      },
      playback: {
        title: "Ayuda para verlo en el móvil",
        body: "Instrucciones claras para archivos AVI, también en iPhone.",
        link: "Guía de reproducción",
      },
      support: {
        title: "Una persona por correo",
        body: "Dudas sobre el ajuste, tu móvil o el envío, antes o después de tu pedido.",
      },
      refund: {
        title: "Política de reembolso de 30 días",
        body: "Normalmente el cliente paga el envío de devolución. Lee la política completa antes de comprar.",
        link: "Política de reembolso",
      },
    },
  },
};

export function getBrandCopy(locale: string): BrandCopy {
  return copy[locale] ?? en;
}
