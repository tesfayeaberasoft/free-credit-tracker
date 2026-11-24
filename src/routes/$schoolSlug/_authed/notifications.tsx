import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/routes/_authenticated/notifications";

export const Route = createFileRoute("/$schoolSlug/_authed/notifications")({ component: NotificationsPage });
