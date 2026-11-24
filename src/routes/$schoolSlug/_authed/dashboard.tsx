import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/routes/_authenticated/dashboard";

export const Route = createFileRoute("/$schoolSlug/_authed/dashboard")({ component: DashboardPage });
