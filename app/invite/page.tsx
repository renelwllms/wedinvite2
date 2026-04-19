import { InvitationExperience } from "@/components/invitation/InvitationExperience";
import { invitationData } from "@/data/invitation";

type InviteSearchParams = {
  to?: string | string[];
};

type InvitePageProps = {
  searchParams?: InviteSearchParams | Promise<InviteSearchParams>;
};

export default async function InvitePage({ searchParams }: InvitePageProps) {
  const resolvedSearchParams = searchParams ? await Promise.resolve(searchParams) : undefined;
  const rawGuest = Array.isArray(resolvedSearchParams?.to)
    ? resolvedSearchParams.to[0]
    : resolvedSearchParams?.to;
  const guestName = rawGuest?.trim() || invitationData.guestLabelFallback;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: invitationData.seo.title,
    startDate: invitationData.weddingDateISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description: invitationData.seo.description,
    image: invitationData.seo.image,
    location: {
      "@type": "Place",
      name: invitationData.saveDate.venue,
      address: invitationData.saveDate.location
    },
    organizer: {
      "@type": "Person",
      name: `${invitationData.hero.brideName} & ${invitationData.hero.groomName}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <InvitationExperience data={invitationData} guestName={guestName} />
    </>
  );
}
