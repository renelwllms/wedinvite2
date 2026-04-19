import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { defaultInvitationLocale, invitationDataByLocale } from "@/data/invitation";

type InviteSearchParams = {
  to?: string | string[];
};

type InvitePageProps = {
  searchParams?: InviteSearchParams | Promise<InviteSearchParams>;
};

export default async function InvitePage({ searchParams }: InvitePageProps) {
  const defaultInvitationData = invitationDataByLocale[defaultInvitationLocale];
  const resolvedSearchParams = searchParams ? await Promise.resolve(searchParams) : undefined;
  const rawGuest = Array.isArray(resolvedSearchParams?.to)
    ? resolvedSearchParams.to[0]
    : resolvedSearchParams?.to;
  const guestName = rawGuest?.trim() || defaultInvitationData.guestLabelFallback;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: defaultInvitationData.seo.title,
    startDate: defaultInvitationData.weddingDateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: defaultInvitationData.seo.description,
    image: defaultInvitationData.seo.image,
    location: {
      "@type": "Place",
      name: defaultInvitationData.saveDate.venue,
      address: defaultInvitationData.saveDate.location
    },
    organizer: {
      "@type": "Person",
      name: `${defaultInvitationData.hero.brideName} & ${defaultInvitationData.hero.groomName}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <InvitationExperience dataByLocale={invitationDataByLocale} guestName={guestName} />
    </>
  );
}
