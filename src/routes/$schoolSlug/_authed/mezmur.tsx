import { createFileRoute } from "@tanstack/react-router";
import { MezmurPage } from "@/components/mezmur/MezmurPage";

export const Route = createFileRoute("/$schoolSlug/_authed/mezmur")({ component: MezmurPage });
