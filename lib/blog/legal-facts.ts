// Sources and FAQ for "Is it legal to put a camera on your cat?".
// General information, not legal advice. Re-check the sources before changing
// LEGAL_REVIEWED; the visible FAQ and the FAQPage JSON-LD share this data.

export const LEGAL_REVIEWED = "2026-10-02T00:00:00Z";

export const LEGAL_SOURCES = {
  ukGdprArt2: "https://www.legislation.gov.uk/eur/2016/679/article/2",
  icoHomeCctv: "https://ico.org.uk/for-the-public/home-cctv-systems/",
  icoAudio:
    "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/cctv-and-video-surveillance/guidance-on-video-surveillance-including-cctv/how-can-we-comply-with-the-data-protection-principles-when-using-surveillance-systems/",
  rynes:
    "https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A62013CJ0212",
  edpbVideo:
    "https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-32019-processing-personal-data-through-video_en",
  buivids:
    "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A62017CJ0345",
  wiretap: "https://www.law.cornell.edu/uscode/text/18/2511",
  wiretapDefinitions: "https://www.law.cornell.edu/uscode/text/18/2510",
  rcfp: "https://www.rcfp.org/introduction-to-reporters-recording-guide/",
  calPenal632:
    "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=632",
  calPenal647:
    "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=PEN&sectionNum=647",
  animalWelfareAct: "https://www.legislation.gov.uk/ukpga/2006/45/section/9",
  defraCatCode:
    "https://www.gov.uk/government/publications/code-of-practice-for-the-welfare-of-cats",
} as const;

export const LEGAL_FAQS = [
  {
    question: "Is it legal to put a camera on my cat?",
    answer:
      "In general, owning and attaching a small camera to your own cat is not illegal in itself. What the camera records matters more: footage of your own home is usually a private matter, but recording neighbours, their gardens or people in public can bring in privacy and data protection rules, and recording conversations can engage audio-recording laws. This is general information, not legal advice.",
  },
  {
    question: "Can my cat camera record my neighbours?",
    answer:
      "In the UK and EU, the household exemption from data protection law is read narrowly. The ICO says that if home CCTV captures someone else's property or a public area, data protection law applies, and the EU Court of Justice held in Ryneš (C-212/13) that a home camera covering public space is not purely household activity. Avoid keeping or sharing footage that identifies neighbours.",
  },
  {
    question: "Is recording sound with a pet camera treated differently?",
    answer:
      "Yes. Regulators and courts treat audio as more intrusive than video. In the US, the federal Wiretap Act and state laws restrict recording private conversations without consent, and some states require every party's consent. An owner who is not present is not a party to a neighbour's conversation. Whiskcam records sound with its video, so mute or cut audio that captures other people before keeping or sharing a clip.",
  },
  {
    question: "Can I post my cat camera footage online?",
    answer:
      "Footage that only shows your cat and your own home is generally fine to share. In the EU, publishing footage of identifiable people to an unrestricted audience falls outside the household exemption, according to the EU Court of Justice. Blur or cut faces and number plates of other people before posting.",
  },
  {
    question: "Is there a law about putting devices on cats?",
    answer:
      "We found no law specifically about cat collar cameras. In England and Wales, the Animal Welfare Act 2006 requires owners to take reasonable steps to protect a pet from injury and allow normal behaviour, and the government's cat welfare code says collars should fit properly with a quick-release mechanism.",
  },
] as const;
