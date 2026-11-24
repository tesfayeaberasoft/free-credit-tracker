import { createFileRoute, redirect } from "@tanstack/react-router";
import { useTenant } from "@/stores/tenant";
import { LoginForm } from "@/components/auth/LoginForm";

export const Route = createFileRoute("/$schoolSlug/login")({
  head: () => ({
    meta: [
      { title: "መግቢያ — የሰንበት ትምህርት ቤት አስተዳደር" },
      { name: "description", content: "የሰንበት ትምህርት ቤት መግቢያ ገጽ" },
    ],
  }),
  component: TenantLoginPage,
});

function TenantLoginPage() {
  const { schoolSlug } = Route.useParams();
  const getSchool = useTenant((s) => s.getSchool);
  const school = getSchool(schoolSlug);

  if (!school) {
    return (
      <div className="grid min-h-screen place-items-center bg-hero p-4">
        <div className="max-w-md rounded-xl border border-black/10 bg-white p-6 text-center shadow-lift">
          <h2 className="text-lg font-bold text-navy">ይህ ሰንበት ትምህርት ቤት አልተገኘም።</h2>
          <p className="mt-1 text-sm text-muted-foreground">{schoolSlug}</p>
        </div>
      </div>
    );
  }

  return <LoginForm schoolName={school.schoolName} slug={school.slug} suspended={school.status === "suspended"} />;
}
