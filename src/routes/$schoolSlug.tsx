import { useEffect, useState } from "react";
import { Outlet, createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import { TenantProvider } from "@/context/tenant";
import { useTenant } from "@/stores/tenant";
import { useAuth } from "@/stores/auth";
import { LogoMark } from "@/components/brand/Logo";
import { t } from "@/i18n";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/$schoolSlug")({
  component: TenantLayout,
});

function TenantLayout() {
  const { schoolSlug } = useParams({ from: "/$schoolSlug" });
  const getSchool = useTenant((s) => s.getSchool);
  const setActiveSlug = useTenant((s) => s.setActiveSlug);
  const setTenantSlug = useAuth((s) => s.setTenantSlug);
  const school = getSchool(schoolSlug);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    setActiveSlug(schoolSlug);
    setTenantSlug(schoolSlug);
  }, [schoolSlug, setActiveSlug, setTenantSlug]);

  if (!hydrated) {
    return (
      <div className="grid min-h-screen place-items-center bg-hero">
        <div className="flex flex-col items-center gap-3 text-navy-foreground">
          <LogoMark className="h-16 w-16 animate-float" />
          <p className="text-sm opacity-80">{t.shell.loadingApp}</p>
        </div>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="grid min-h-screen place-items-center bg-hero p-4">
        <div className="max-w-md rounded-xl border border-black/10 bg-white p-6 text-center shadow-lift">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
          <h2 className="mt-3 text-lg font-bold text-navy">{t.tenant.schoolNotFound}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{schoolSlug}</p>
        </div>
      </div>
    );
  }

  return (
    <TenantProvider slug={schoolSlug} school={school}>
      <Outlet />
    </TenantProvider>
  );
}
