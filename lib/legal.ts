import copy from "./legal-copy.json";
import type { Metadata } from "next";
import { alternatesFor } from "./seo";

export const LEGAL_IDENTITY = {
  name: "Elodie DIKIM",
  tradeName: "DEKIM",
  siren: "102182359",
  siret: "10218235900012",
  address: "7 Rue Ferdinand Buisson, 45200 Montargis, France",
  email: "dekim.pro@gmail.com",
  supportEmail: "support@whiskcam.com",
  phone: "+33 6 02 50 10 28",
  // Publish the mediator only after an effective agreement covers Whiskcam.
  mediator: null as { name: string; url: string } | null,
};
export type PolicyName = "legal" | "terms" | "returns" | "privacy";
export function legalCopy(locale: string) {
  return copy[locale as keyof typeof copy] ?? copy.en;
}
export function policyMetadata(policy: PolicyName, locale: string): Metadata {
  const content = legalCopy(locale)[policy];
  const alternates = alternatesFor(`/policies/${policy}`, locale);
  return {
    title: content.title,
    description: content.description,
    alternates,
    openGraph: {
      title: `${content.title} — Whiskcam`,
      description: content.description,
      url: alternates.canonical,
      type: "website",
    },
  };
}
