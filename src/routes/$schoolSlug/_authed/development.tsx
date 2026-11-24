import { createFileRoute } from "@tanstack/react-router";
import { DevelopmentPage } from "@/components/development/DevelopmentPage";

export const Route = createFileRoute("/$schoolSlug/_authed/development")({ component: DevelopmentPage });
