const en = {
  title: "Your first Whiskcam film",
  description:
    "A practical getting-started guide: prepare your card, check the fit, make a short test and play your footage.",
  eyebrow: "THE WHISKCAM FIELD GUIDE",
  intro:
    "A little preparation makes the first outing easier. Start at home, check the footage, then let your pet set the pace.",
  before: "Before you begin",
  requirements: [
    "A compatible MicroSD card, purchased separately; one per camera.",
    "A charged camera and a suitable collar. For cats, use a breakaway collar.",
    "A card reader or phone adapter compatible with your device.",
  ],
  steps: [
    {
      title: "Prepare the camera",
      text: "Charge by USB-C with the camera off your pet. Follow your camera’s instructions for inserting and preparing the card. Before buying a card, ask support to confirm the capacity and format for your camera version.",
    },
    {
      title: "Make a short test at home",
      text: "Record a brief clip with the camera off your pet first. Stop the recording before removing the card. Check that a video file has been saved and that you can play it on the device you intend to use.",
    },
    {
      title: "Check comfort and fit",
      text: "The camera is 24 g; the collar, mount and tags add to the total. Keep the collar's breakaway release clear. Start with a short supervised session and remove the camera if your pet is uncomfortable. There is no universal safe weight for every animal.",
    },
    {
      title: "Watch and keep the footage",
      text: "Copy the AVI files using a compatible reader or adapter. Some phones need an AVI-compatible player such as VLC or a conversion to MP4. Keep a backup before deleting files from the card.",
    },
  ],
  troubleshooting: "If something does not work",
  problems: [
    [
      "No video file?",
      "Check the charge, card compatibility and whether recording was stopped before the card was removed. Make another short test off your pet.",
    ],
    [
      "Your phone will not play the file?",
      "Check that the adapter fits your phone and that the file was copied. Try a compatible AVI player or conversion; filming does not require a WiFi connection.",
    ],
    [
      "Your pet dislikes wearing it?",
      "Remove the camera. Do not force a longer session. Check the fit and ask your vet about suitability for your animal.",
    ],
  ],
  limitsTitle: "Choose it for the right job",
  limits:
    "Whiskcam records locally for playback later. It is not a GPS tracker, live-view or night-vision camera. Continuous battery runtime has not yet been verified. This guide does not replace the camera or collar instructions.",
  supportTitle: "A question before your first recording?",
  support:
    "Tell us your phone model, the kit you have and the step that is causing trouble. Please do not email payment details.",
  safetyLink: "Fit and comfort guide",
  playbackLink: "Playing AVI files on iPhone",
  shop: "See the kits",
  print: "Use your browser’s Print option to save this guide as a PDF.",
  updated: "Updated 26 October 2026 · Whiskcam Team",
};
type Guide = typeof en;
const guides: Record<string, Guide> = {
  en,
  fr: {
    title: "Votre premier film Whiskcam",
    description:
      "Le guide pratique pour préparer la carte, vérifier l’ajustement, faire un court essai et regarder vos vidéos.",
    eyebrow: "LE GUIDE PRATIQUE WHISKCAM",
    intro:
      "Un peu de préparation pour une première sortie plus simple. Commencez à la maison, vérifiez les images et laissez votre animal avancer à son rythme.",
    before: "Avant de commencer",
    requirements: [
      "Une carte MicroSD compatible, vendue séparément ; une par caméra.",
      "Une caméra chargée et un collier adapté. Pour un chat, utilisez un collier à ouverture de sécurité.",
      "Un lecteur de carte ou un adaptateur téléphone compatible avec votre appareil.",
    ],
    steps: [
      {
        title: "Préparez la caméra",
        text: "Rechargez-la par USB-C hors de l’animal. Suivez les instructions de votre caméra pour insérer et préparer la carte. Avant d’acheter une carte, demandez au support de confirmer la capacité et le format pour votre version de caméra.",
      },
      {
        title: "Faites un court essai à la maison",
        text: "Filmez d’abord un bref extrait sans attacher la caméra à votre animal. Arrêtez l’enregistrement avant de retirer la carte. Vérifiez qu’un fichier vidéo a été créé et que vous pouvez le lire sur l’appareil prévu.",
      },
      {
        title: "Vérifiez le confort et l’ajustement",
        text: "La caméra pèse 24 g ; ajoutez le collier, la fixation et les médailles au poids total. Laissez le mécanisme de sécurité du collier dégagé. Commencez par une courte séance surveillée et retirez la caméra si elle gêne votre animal. Aucun poids n’est universellement sûr pour tous les animaux.",
      },
      {
        title: "Regardez et conservez vos vidéos",
        text: "Copiez les fichiers AVI avec un lecteur ou adaptateur compatible. Certains téléphones nécessitent un lecteur AVI comme VLC ou une conversion en MP4. Conservez une sauvegarde avant d’effacer les fichiers de la carte.",
      },
    ],
    troubleshooting: "Si quelque chose ne fonctionne pas",
    problems: [
      [
        "Aucun fichier vidéo ?",
        "Vérifiez la charge, la compatibilité de la carte et l’arrêt de l’enregistrement avant son retrait. Refaites un court essai hors de l’animal.",
      ],
      [
        "Le téléphone ne lit pas le fichier ?",
        "Vérifiez la compatibilité de l’adaptateur et la copie du fichier. Essayez un lecteur AVI compatible ou une conversion ; filmer ne nécessite pas de connexion WiFi.",
      ],
      [
        "Votre animal n’aime pas la porter ?",
        "Retirez la caméra et ne prolongez pas l’essai de force. Vérifiez l’ajustement et demandez conseil à votre vétérinaire pour votre animal.",
      ],
    ],
    limitsTitle: "Le bon outil pour le bon usage",
    limits:
      "Whiskcam enregistre localement pour un visionnage ultérieur. Ce n’est ni un GPS, ni une caméra en direct ou à vision nocturne. L’autonomie continue n’est pas encore vérifiée. Ce guide ne remplace pas les indications de la caméra ou du collier.",
    supportTitle: "Une question avant le premier enregistrement ?",
    support:
      "Précisez le modèle de votre téléphone, votre kit et l’étape qui vous bloque. Ne transmettez pas de données de paiement par e-mail.",
    safetyLink: "Le guide de confort et d’ajustement",
    playbackLink: "Lire les fichiers AVI sur iPhone",
    shop: "Découvrir les kits",
    print:
      "Utilisez l’option Imprimer du navigateur pour enregistrer ce guide en PDF.",
    updated: "Mis à jour le 26 octobre 2026 · Whiskcam Team",
  },
  de: {
    title: "Dein erster Whiskcam-Film",
    description:
      "Der praktische Einstieg: Karte vorbereiten, Sitz prüfen, kurz testen und Aufnahmen ansehen.",
    eyebrow: "DER WHISKCAM-PRAXISGUIDE",
    intro:
      "Eine kleine Vorbereitung erleichtert den Start. Beginne zu Hause, prüfe die Aufnahmen und lass dein Tier das Tempo bestimmen.",
    before: "Bevor du beginnst",
    requirements: [
      "Eine separat erhältliche kompatible MicroSD-Karte pro Kamera.",
      "Eine geladene Kamera und ein passendes Halsband. Für Katzen ein Sicherheitshalsband mit Auslösemechanismus verwenden.",
      "Ein mit deinem Gerät kompatibles Kartenlesegerät oder ein Telefonadapter.",
    ],
    steps: [
      {
        title: "Kamera vorbereiten",
        text: "Lade die Kamera per USB-C, während sie nicht am Tier befestigt ist. Befolge die Anleitung deiner Kamera zum Einsetzen und Vorbereiten der Karte. Frage vor dem Kartenkauf beim Support nach der passenden Kapazität und dem Format für deine Kameraversion.",
      },
      {
        title: "Zu Hause kurz testen",
        text: "Nimm zuerst einen kurzen Clip ohne Tier auf. Beende die Aufnahme vor dem Entnehmen der Karte. Prüfe, ob eine Videodatei gespeichert wurde und ob dein vorgesehenes Gerät sie abspielen kann.",
      },
      {
        title: "Sitz und Komfort prüfen",
        text: "Die Kamera wiegt 24 g; Halsband, Halterung und Marken erhöhen das Gesamtgewicht. Halte den Sicherheitsverschluss frei. Beginne mit einem kurzen beaufsichtigten Versuch und entferne die Kamera bei Unwohlsein. Es gibt kein für jedes Tier sicheres Universalgewicht.",
      },
      {
        title: "Aufnahmen ansehen und sichern",
        text: "Kopiere die AVI-Dateien mit einem kompatiblen Lesegerät oder Adapter. Manche Telefone benötigen einen AVI-Player wie VLC oder eine MP4-Konvertierung. Erstelle eine Sicherung, bevor du Dateien von der Karte löschst.",
      },
    ],
    troubleshooting: "Wenn etwas nicht funktioniert",
    problems: [
      [
        "Keine Videodatei?",
        "Prüfe Ladung, Kartenkompatibilität und ob die Aufnahme vor dem Entnehmen beendet wurde. Teste erneut ohne Tier.",
      ],
      [
        "Das Telefon spielt die Datei nicht ab?",
        "Prüfe Adapter und Dateikopie. Versuche einen kompatiblen AVI-Player oder eine Konvertierung. Für die Aufnahme ist kein WLAN nötig.",
      ],
      [
        "Dein Tier möchte die Kamera nicht tragen?",
        "Nimm sie ab und erzwinge keinen längeren Versuch. Prüfe den Sitz und frage deinen Tierarzt nach der Eignung für dein Tier.",
      ],
    ],
    limitsTitle: "Für den passenden Einsatz",
    limits:
      "Whiskcam zeichnet lokal zur späteren Wiedergabe auf. Es ist kein GPS-Tracker und keine Live- oder Nachtsichtkamera. Die Dauerlaufzeit ist noch nicht verifiziert. Dieser Guide ersetzt nicht die Hinweise der Kamera oder des Halsbands.",
    supportTitle: "Eine Frage vor der ersten Aufnahme?",
    support:
      "Nenne uns dein Telefonmodell, dein Set und den Schritt, der Schwierigkeiten macht. Bitte keine Zahlungsdaten per E-Mail senden.",
    safetyLink: "Guide zu Sitz und Komfort",
    playbackLink: "AVI-Dateien auf dem iPhone ansehen",
    shop: "Sets ansehen",
    print:
      "Mit der Druckfunktion deines Browsers kannst du diesen Guide als PDF speichern.",
    updated: "Aktualisiert am 26. Oktober 2026 · Whiskcam Team",
  },
  es: {
    title: "Tu primera película Whiskcam",
    description:
      "Guía práctica para preparar la tarjeta, comprobar el ajuste, hacer una prueba y ver tus vídeos.",
    eyebrow: "LA GUÍA PRÁCTICA WHISKCAM",
    intro:
      "Un poco de preparación facilita el primer uso. Empieza en casa, comprueba las imágenes y deja que tu mascota marque el ritmo.",
    before: "Antes de empezar",
    requirements: [
      "Una tarjeta MicroSD compatible, vendida por separado; una por cámara.",
      "Una cámara cargada y un collar adecuado. Para gatos, utiliza un collar con cierre de seguridad de apertura rápida.",
      "Un lector de tarjetas o adaptador de teléfono compatible con tu dispositivo.",
    ],
    steps: [
      {
        title: "Prepara la cámara",
        text: "Cárgala por USB-C sin que la lleve tu mascota. Sigue las instrucciones de tu cámara para introducir y preparar la tarjeta. Antes de comprarla, pide al soporte que confirme la capacidad y el formato para tu versión de cámara.",
      },
      {
        title: "Haz una prueba corta en casa",
        text: "Graba primero un clip breve sin colocar la cámara en tu mascota. Detén la grabación antes de retirar la tarjeta. Comprueba que se ha guardado un vídeo y que tu dispositivo puede reproducirlo.",
      },
      {
        title: "Comprueba el ajuste y la comodidad",
        text: "La cámara pesa 24 g; el collar, la fijación y las placas aumentan el peso total. Mantén libre el cierre de seguridad. Empieza con una prueba breve y supervisada y retira la cámara si molesta. No existe un peso universalmente seguro para todos los animales.",
      },
      {
        title: "Mira y conserva tus vídeos",
        text: "Copia los archivos AVI con un lector o adaptador compatible. Algunos teléfonos necesitan un reproductor AVI como VLC o una conversión a MP4. Haz una copia de seguridad antes de borrar la tarjeta.",
      },
    ],
    troubleshooting: "Si algo no funciona",
    problems: [
      [
        "¿No hay vídeo?",
        "Comprueba la carga, la compatibilidad de la tarjeta y que se detuvo la grabación antes de retirarla. Repite la prueba sin tu mascota.",
      ],
      [
        "¿El teléfono no reproduce el archivo?",
        "Comprueba el adaptador y la copia del archivo. Prueba un reproductor AVI compatible o una conversión. No hace falta WiFi para grabar.",
      ],
      [
        "¿A tu mascota no le gusta llevarla?",
        "Retira la cámara y no fuerces una prueba más larga. Comprueba el ajuste y consulta a tu veterinario sobre su idoneidad.",
      ],
    ],
    limitsTitle: "Para el uso adecuado",
    limits:
      "Whiskcam graba localmente para ver los vídeos después. No es un GPS ni una cámara en directo o de visión nocturna. La autonomía continua aún no está verificada. Esta guía no sustituye las indicaciones de la cámara o del collar.",
    supportTitle: "¿Una pregunta antes de grabar?",
    support:
      "Indica el modelo de teléfono, tu kit y el paso que causa problemas. No envíes datos de pago por correo.",
    safetyLink: "Guía de ajuste y comodidad",
    playbackLink: "Ver archivos AVI en iPhone",
    shop: "Ver los kits",
    print:
      "Usa la opción Imprimir del navegador para guardar esta guía en PDF.",
    updated: "Actualizado el 26 de octubre de 2026 · Whiskcam Team",
  },
};

export function startGuide(locale: string): Guide {
  return guides[locale] ?? en;
}
