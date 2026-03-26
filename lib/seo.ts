import type { Metadata } from "next";

import type { InvitationData } from "@/data/invitation";

export function buildMetadata(data: InvitationData): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const title = data.seo.title;
  const description = data.seo.description;
  const canonical = new URL(data.seo.canonicalPath, siteUrl).toString();
  const image = new URL(data.seo.image, siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: title,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: "en_NZ",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    icons: {
      icon: "/images/favicon.svg"
    }
  };
}
