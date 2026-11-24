import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/routes/_authenticated/reports";

export const Route = createFileRoute("/$schoolSlug/_authed/reports")({ component: ReportsPage });
