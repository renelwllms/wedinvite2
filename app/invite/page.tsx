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

  return <InvitationExperience data={invitationData} guestName={guestName} />;
}
