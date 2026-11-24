import { createFileRoute, useParams } from "@tanstack/react-router";
import { SuspendedNotice } from "@/components/tenant/SuspendedNotice";

export const Route = createFileRoute("/$schoolSlug/_authed")({
  component: AuthedTenantLayout,
});

function AuthedTenantLayout() {
  const { schoolSlug } = useParams({ from: "/$schoolSlug" });
  return <SuspendedNotice slug={schoolSlug} />;
}
