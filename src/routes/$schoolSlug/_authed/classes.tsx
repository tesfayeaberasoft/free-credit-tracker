import { createFileRoute } from "@tanstack/react-router";
import { ClassesPage } from "@/routes/_authenticated/classes";

export const Route = createFileRoute("/$schoolSlug/_authed/classes")({ component: ClassesPage });
