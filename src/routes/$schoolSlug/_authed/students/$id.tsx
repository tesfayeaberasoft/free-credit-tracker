import { createFileRoute } from "@tanstack/react-router";
import { StudentProfile } from "@/components/students/StudentProfile";

export const Route = createFileRoute("/$schoolSlug/_authed/students/$id")({ component: StudentProfile });
