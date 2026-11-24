import { createFileRoute } from "@tanstack/react-router";
import { AssetsPage } from "@/components/assets/AssetsPage";

export const Route = createFileRoute("/$schoolSlug/_authed/assets")({ component: AssetsPage });
