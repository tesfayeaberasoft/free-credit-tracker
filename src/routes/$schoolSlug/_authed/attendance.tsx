import { createFileRoute } from "@tanstack/react-router";
import { AttendancePage } from "@/components/attendance/AttendancePage";

export const Route = createFileRoute("/$schoolSlug/_authed/attendance")({ component: AttendancePage });
