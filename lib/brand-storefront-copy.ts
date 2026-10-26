// Homepage brand copy. Desire first: the cat's secret life, seen and heard
// when they come home. Facts stay exact; limits live in "Good to know", near
// the purchase and in the FAQ, never as the headline.
// `{weight}` and `{fov}` are filled from PRODUCT_FACTS so specs cannot drift here.

export type Season = "halloween" | "autumn" | "evergreen";

type Item = { title: string; body: string };

type BrandCopy = {
  /** Visible category descriptor, part of the H1. */
  category: string;
  /** Display line of the H1. Campaign-neutral so the server H1 is stable. */
  headline: string;
  intro: string;
  heroAlt: string;
  clipTeaser: string;
  packTagline: { single: string; duo: string };
  /** After "with CODE": the code needs no typing. */
  applied: string;
  microsd: string;
  details: string;
  facts: { value: string; label: string }[];
  footage: {
    eyebrow: Record<Season, string>;
    title: string;
    intro: string;
    seasonNote: string;
  };
  story: {
    eyebrow: string;
    title: string;
    photoAlt: string;
    beats: [Item, Item, Item];
    guideLink: string;
  };
  shop: { eyebrow: string; title: string; intro: string };
  know: {
    eyebrow: string;
    title: string;
    items: [Item, Item, Item, Item];
    playbackLink: string;
    fitLink: string;
    helpTitle: string;
    guide: string;
    support: string;
    refund: string;
  };
};

const en: BrandCopy = {
  category: "Whiskcam · the cat collar camera",
  headline: "Their secret life. Your front-row seat.",
  intro:
    "Clip a {weight} g camera to their collar and let them explore. When they come home, relive their adventures in 1080P — and hear them too. No WiFi, app or subscription to record.",
  heroAlt:
    "Ginger cat walking through a sunny meadow, wearing a Whiskcam camera on its collar",
  clipTeaser: "Watch a real clip",
  packTagline: {
    single: "For one curious cat",
    duo: "Two adventurers. Two points of view.",
  },
  applied: "applied automatically",
  microsd: "MicroSD card sold separately, one per camera.",
  details: "What’s in the box",
  facts: [
    { value: "{weight} g", label: "light on the collar" },
    { value: "1080P", label: "video, with sound" },
    { value: "{fov}°", label: "wide-angle view" },
    { value: "0", label: "apps or subscriptions to record" },
  ],
  footage: {
    eyebrow: {
      evergreen: "Real Whiskcam clips",
      halloween: "The Halloween edit · real clips",
      autumn: "The autumn edit · real clips",
    },
    title: "Their day, as if you were there.",
    intro:
      "Garden patrols, a standoff at the fence, a sudden sprint. This is what the camera actually brings home.",
    seasonNote:
      "Little monsters, caught in the act. Whiskcam films best in daylight and bright rooms.",
  },
  story: {
    eyebrow: "How it works",
    title: "Clip it on. Let them explore. Relive it together.",
    photoAlt:
      "Black and white cat resting on a sofa, wearing a Whiskcam camera on its collar",
    beats: [
      {
        title: "Clip it on",
        body: "{weight} g on their collar and a single press to record. Nothing to pair, no account to create.",
      },
      {
        title: "Let them explore",
        body: "Garden patrols, sofa naps, a neighbour at the window: their day is recorded in 1080P, with sound.",
      },
      {
        title: "Relive it together",
        body: "Back home, connect the card to your phone with the included adapter. Watch their day, then share the best bits.",
      },
    ],
    guideLink: "Step-by-step setup guide",
  },
  shop: {
    eyebrow: "Choose your kit",
    title: "Small on the collar. Big on stories.",
    intro:
      "One press to record, nothing to set up online. Add a microSD card and you’re ready for the first adventure.",
  },
  know: {
    eyebrow: "Good to know",
    title: "Simple by design.",
    items: [
      {
        title: "Records offline",
        body: "Everything is saved to the card: no WiFi, app or subscription. It isn’t a GPS tracker or a live camera.",
      },
      {
        title: "MicroSD sold separately",
        body: "Add one compatible card per camera before the first outing. Not sure which one? Just ask us.",
      },
      {
        title: "Watching on your phone",
        body: "Files are AVI. On iPhone, a free player such as VLC opens them, and converting to MP4 makes sharing easy.",
      },
      {
        title: "Comfort first",
        body: "Use a breakaway collar and start with short, supervised sessions at home.",
      },
    ],
    playbackLink: "Playback guide",
    fitLink: "Fit & comfort guide",
    helpTitle: "Help comes in the box",
    guide: "Step-by-step guide in 4 languages",
    support: "A real person on email, before and after you order",
    refund: "30-day refund policy",
  },
};

const copy: Record<string, BrandCopy> = {
  en,
  fr: {
    category: "Whiskcam · la caméra collier pour chat",
    headline: "Le monde de votre chat. Enfin à l’écran.",
    intro:
      "Une caméra de {weight} g sur son collier, et le voilà parti. À son retour, revivez ses aventures en 1080P, avec le son. Ni WiFi, ni appli, ni abonnement pour filmer.",
    heroAlt:
      "Chat roux marchant dans une prairie ensoleillée, une caméra Whiskcam au collier",
    clipTeaser: "Voir un vrai extrait",
    packTagline: {
      single: "Pour un chat curieux",
      duo: "Deux aventuriers. Deux points de vue.",
    },
    applied: "appliqué automatiquement",
    microsd: "Carte microSD vendue séparément, une par caméra.",
    details: "Contenu de la boîte",
    facts: [
      { value: "{weight} g", label: "léger au collier" },
      { value: "1080P", label: "vidéo, avec le son" },
      { value: "{fov}°", label: "grand angle" },
      { value: "0", label: "appli ou abonnement pour filmer" },
    ],
    footage: {
      eyebrow: {
        evergreen: "Vraies vidéos Whiskcam",
        halloween: "L’édition Halloween · vraies vidéos",
        autumn: "L’édition automne · vraies vidéos",
      },
      title: "Sa journée, comme si vous y étiez.",
      intro:
        "Rondes au jardin, face-à-face à la clôture, sprint soudain. Voilà ce que la caméra rapporte vraiment.",
      seasonNote:
        "Petits monstres pris sur le fait. Whiskcam filme au mieux en journée et dans les pièces lumineuses.",
    },
    story: {
      eyebrow: "Comment ça marche",
      title: "Clipsez. Laissez-le explorer. Revivez tout ensemble.",
      photoAlt:
        "Chat noir et blanc allongé sur un canapé, une caméra Whiskcam au collier",
      beats: [
        {
          title: "Clipsez",
          body: "{weight} g sur son collier et une simple pression pour filmer. Rien à appairer, aucun compte à créer.",
        },
        {
          title: "Il explore",
          body: "Rondes au jardin, siestes sur le canapé, un voisin à la fenêtre : sa journée est filmée en 1080P, avec le son.",
        },
        {
          title: "Revivez tout ensemble",
          body: "À son retour, branchez la carte sur votre téléphone grâce à l’adaptateur inclus. Regardez sa journée, puis partagez les meilleurs moments.",
        },
      ],
      guideLink: "Guide de démarrage pas à pas",
    },
    shop: {
      eyebrow: "Choisissez votre kit",
      title: "Petite au collier. Grande en histoires.",
      intro:
        "Une pression pour filmer, rien à configurer en ligne. Ajoutez une carte microSD et la première aventure peut commencer.",
    },
    know: {
      eyebrow: "Bon à savoir",
      title: "Simple, par nature.",
      items: [
        {
          title: "Enregistre hors ligne",
          body: "Tout est enregistré sur la carte : ni WiFi, ni appli, ni abonnement. Ce n’est ni un traceur GPS ni une caméra en direct.",
        },
        {
          title: "Carte microSD vendue séparément",
          body: "Prévoyez une carte compatible par caméra avant la première sortie. Un doute ? Écrivez-nous.",
        },
        {
          title: "Sur votre téléphone",
          body: "Les fichiers sont en AVI. Sur iPhone, un lecteur gratuit comme VLC les ouvre, et une conversion en MP4 facilite le partage.",
        },
        {
          title: "Le confort d’abord",
          body: "Utilisez un collier anti-étranglement et commencez par de courtes sessions à la maison, sous surveillance.",
        },
      ],
      playbackLink: "Guide de lecture",
      fitLink: "Guide ajustement et confort",
      helpTitle: "L’aide est incluse",
      guide: "Guide pas à pas en 4 langues",
      support: "Une vraie personne par e-mail, avant comme après la commande",
      refund: "Politique de remboursement de 30 jours",
    },
  },
  de: {
    category: "Whiskcam · die Halsbandkamera für Katzen",
    headline: "Das geheime Leben deiner Katze. Endlich zu sehen.",
    intro:
      "Eine {weight}-g-Kamera ans Halsband – und los geht’s. Wenn sie heimkommt, erlebst du ihre Abenteuer noch einmal in 1080P, mit Ton. Zum Filmen brauchst du weder WLAN noch App oder Abo.",
    heroAlt:
      "Rote Katze läuft über eine sonnige Wiese, mit einer Whiskcam-Kamera am Halsband",
    clipTeaser: "Echten Clip ansehen",
    packTagline: {
      single: "Für eine neugierige Katze",
      duo: "Zwei Abenteurer. Zwei Perspektiven.",
    },
    applied: "automatisch angewendet",
    microsd: "MicroSD-Karte separat erhältlich, eine pro Kamera.",
    details: "Was in der Box ist",
    facts: [
      { value: "{weight} g", label: "leicht am Halsband" },
      { value: "1080P", label: "Video, mit Ton" },
      { value: "{fov}°", label: "Weitwinkel" },
      { value: "0", label: "Apps oder Abos zum Filmen" },
    ],
    footage: {
      eyebrow: {
        evergreen: "Echte Whiskcam-Clips",
        halloween: "Die Halloween-Edition · echte Clips",
        autumn: "Die Herbst-Edition · echte Clips",
      },
      title: "Ihr Tag, als wärst du dabei.",
      intro:
        "Gartenrunden, ein Kräftemessen am Zaun, ein plötzlicher Sprint. Das bringt die Kamera wirklich mit nach Hause.",
      seasonNote:
        "Kleine Monster, auf frischer Tat ertappt. Whiskcam filmt am besten bei Tageslicht und in hellen Räumen.",
    },
    story: {
      eyebrow: "So funktioniert’s",
      title: "Anclipsen. Losziehen lassen. Gemeinsam erleben.",
      photoAlt:
        "Schwarz-weiße Katze auf einem Sofa, mit einer Whiskcam-Kamera am Halsband",
      beats: [
        {
          title: "Anclipsen",
          body: "{weight} g am Halsband, ein Druck auf den Knopf – fertig. Nichts zu koppeln, kein Konto.",
        },
        {
          title: "Losziehen lassen",
          body: "Gartenrunden, Nickerchen auf dem Sofa, ein Nachbar am Fenster: Ihr Tag wird in 1080P aufgenommen, mit Ton.",
        },
        {
          title: "Gemeinsam erleben",
          body: "Zu Hause verbindest du die Karte über den beiliegenden Adapter mit deinem Handy. Sieh dir ihren Tag an und teile die besten Momente.",
        },
      ],
      guideLink: "Schritt-für-Schritt-Anleitung",
    },
    shop: {
      eyebrow: "Wähle dein Set",
      title: "Klein am Halsband. Groß in Geschichten.",
      intro:
        "Ein Druck zum Aufnehmen, nichts online einzurichten. Eine microSD-Karte dazu, und das erste Abenteuer kann beginnen.",
    },
    know: {
      eyebrow: "Gut zu wissen",
      title: "Einfach gemacht.",
      items: [
        {
          title: "Speichert offline",
          body: "Alles landet auf der Karte: kein WLAN, keine App, kein Abo. Sie ist kein GPS-Tracker und keine Live-Kamera.",
        },
        {
          title: "MicroSD separat erhältlich",
          body: "Plane vor dem ersten Ausflug eine kompatible Karte pro Kamera ein. Unsicher? Schreib uns.",
        },
        {
          title: "Auf dem Handy ansehen",
          body: "Die Dateien sind im AVI-Format. Auf dem iPhone öffnet sie ein kostenloser Player wie VLC; als MP4 lassen sie sich leicht teilen.",
        },
        {
          title: "Komfort zuerst",
          body: "Nutze ein Sicherheitshalsband und beginne mit kurzen, beaufsichtigten Runden zu Hause.",
        },
      ],
      playbackLink: "Wiedergabe-Anleitung",
      fitLink: "Sitz & Komfort",
      helpTitle: "Hilfe inklusive",
      guide: "Schritt-für-Schritt-Anleitung in 4 Sprachen",
      support: "Ein Mensch per E-Mail, vor und nach der Bestellung",
      refund: "30-Tage-Erstattungsrichtlinie",
    },
  },
  es: {
    category: "Whiskcam · la cámara de collar para gatos",
    headline: "La vida secreta de tu gato. Por fin en pantalla.",
    intro:
      "Una cámara de {weight} g en su collar, y a explorar. Cuando vuelva, revive sus aventuras en 1080P, con sonido. Sin WiFi, app ni suscripción para grabar.",
    heroAlt:
      "Gato naranja caminando por un prado soleado, con una cámara Whiskcam en el collar",
    clipTeaser: "Ver un vídeo real",
    packTagline: {
      single: "Para un gato curioso",
      duo: "Dos aventureros. Dos puntos de vista.",
    },
    applied: "aplicado automáticamente",
    microsd: "Tarjeta microSD no incluida, una por cámara.",
    details: "Qué incluye la caja",
    facts: [
      { value: "{weight} g", label: "ligera en el collar" },
      { value: "1080P", label: "vídeo, con sonido" },
      { value: "{fov}°", label: "gran angular" },
      { value: "0", label: "apps o suscripciones para grabar" },
    ],
    footage: {
      eyebrow: {
        evergreen: "Vídeos reales de Whiskcam",
        halloween: "La edición Halloween · vídeos reales",
        autumn: "La edición otoño · vídeos reales",
      },
      title: "Su día, como si estuvieras allí.",
      intro:
        "Rondas por el jardín, un duelo en la valla, un sprint repentino. Esto es lo que la cámara trae de verdad a casa.",
      seasonNote:
        "Pequeños monstruos, pillados in fraganti. Whiskcam graba mejor de día y en interiores luminosos.",
    },
    story: {
      eyebrow: "Cómo funciona",
      title: "Engánchala. Que explore. Revividlo juntos.",
      photoAlt:
        "Gato blanco y negro tumbado en un sofá, con una cámara Whiskcam en el collar",
      beats: [
        {
          title: "Engánchala",
          body: "{weight} g en su collar y una pulsación para grabar. Nada que emparejar, ninguna cuenta que crear.",
        },
        {
          title: "Que explore",
          body: "Rondas por el jardín, siestas en el sofá, un vecino en la ventana: su día se graba en 1080P, con sonido.",
        },
        {
          title: "Revividlo juntos",
          body: "En casa, conecta la tarjeta a tu móvil con el adaptador incluido. Mira su día y comparte los mejores momentos.",
        },
      ],
      guideLink: "Guía de inicio paso a paso",
    },
    shop: {
      eyebrow: "Elige tu kit",
      title: "Pequeña en el collar. Grande en historias.",
      intro:
        "Una pulsación para grabar, nada que configurar en línea. Añade una tarjeta microSD y la primera aventura puede empezar.",
    },
    know: {
      eyebrow: "Conviene saber",
      title: "Sencilla por diseño.",
      items: [
        {
          title: "Graba sin conexión",
          body: "Todo se guarda en la tarjeta: sin WiFi, app ni suscripción. No es un localizador GPS ni una cámara en directo.",
        },
        {
          title: "MicroSD no incluida",
          body: "Prepara una tarjeta compatible por cámara antes de la primera salida. ¿Dudas? Escríbenos.",
        },
        {
          title: "En tu móvil",
          body: "Los archivos son AVI. En iPhone, un reproductor gratuito como VLC los abre, y convertirlos a MP4 facilita compartirlos.",
        },
        {
          title: "La comodidad, primero",
          body: "Usa un collar con cierre de seguridad y empieza con sesiones cortas y supervisadas en casa.",
        },
      ],
      playbackLink: "Guía de reproducción",
      fitLink: "Ajuste y comodidad",
      helpTitle: "Ayuda incluida",
      guide: "Guía paso a paso en 4 idiomas",
      support: "Una persona real por correo, antes y después de tu pedido",
      refund: "Política de reembolso de 30 días",
    },
  },
};

export function getBrandCopy(locale: string): BrandCopy {
  return copy[locale] ?? en;
}
