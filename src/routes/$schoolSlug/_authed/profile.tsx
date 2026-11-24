import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/routes/_authenticated/profile";

export const Route = createFileRoute("/$schoolSlug/_authed/profile")({ component: ProfilePage });
