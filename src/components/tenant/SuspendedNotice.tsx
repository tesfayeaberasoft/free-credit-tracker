import { Outlet, useParams } from "@tanstack/react-router";
import { useTenant } from "@/stores/tenant";
import { AppShell } from "@/components/layout/AppShell";
import { LogoMark } from "@/components/brand/Logo";
import { useCurrentUser } from "@/hooks/use-session";
import { t } from "@/i18n";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function SuspendedNotice({ slug }: { slug: string }) {
  const getSchool = useTenant((s) => s.getSchool);
  const school = getSchool(slug);
  const [hydrated, setHydrated] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => setHydrated(true), []);

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

  if (school?.status === "suspended") {
    return (
      <div className="grid min-h-screen place-items-center bg-hero p-4">
        <div className="max-w-md rounded-xl border border-black/10 bg-white p-6 text-center shadow-lift">
          <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
          <h2 className="mt-3 text-lg font-bold text-navy">{t.tenant.suspendedTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.tenant.suspendedBody}</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="grid min-h-screen place-items-center bg-hero p-4">
        <div className="max-w-md rounded-xl border border-black/10 bg-white p-6 text-center shadow-lift">
          <AlertTriangle className="mx-auto h-10 w-10 text-destructive" />
          <h2 className="mt-3 text-lg font-bold text-navy">{t.tenant.sessionExpired}</h2>
          <Button className="mt-4" onClick={() => (window.location.href = `/${slug}/login`)}>
            {t.login.title}
          </Button>
        </div>
      </div>
    );
  }

  return <AppShell><Outlet /></AppShell>;
}
