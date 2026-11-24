import { createFileRoute } from "@tanstack/react-router";
import { StudentsPage } from "@/components/students/StudentsPage";

export const Route = createFileRoute("/$schoolSlug/_authed/students/")({ component: StudentsPage });
