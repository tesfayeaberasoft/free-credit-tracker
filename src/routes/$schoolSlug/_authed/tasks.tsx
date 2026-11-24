import { createFileRoute } from "@tanstack/react-router";
import { TasksPage } from "@/components/tasks/TasksPage";

export const Route = createFileRoute("/$schoolSlug/_authed/tasks")({ component: TasksPage });
