import { useAuth } from "@/stores/auth";
import { t } from "@/i18n";
import { SESSION_EXPIRED, FORBIDDEN } from "@/types/tenant";

export type ApiClientResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; error: string; status: number; conflict?: boolean };

const AUTH_EVENTS = new EventTarget();
export const AUTH_EXPIRED_EVENT = "ssms-auth-expired";

function baseUrl(): string | undefined {
  const v = import.meta.env["VITE_API_BASE_URL"] as string | undefined;
  return v && v.trim() ? v.replace(/\/$/, "") : undefined;
}

export function usingMockApi(): boolean {
  return !baseUrl();
}

export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  idempotencyKey?: string;
  tenantSlug?: string;
  /** Optional: do not trigger 401-redirect handling (used by login itself). */
  raw?: boolean;
}

/**
 * Centralized HTTP client for the Laravel Sanctum REST API.
 * Adds `Authorization: Bearer <token>`, `Accept/Content-Type: application/json`,
 * and `X-Tenant-Slug` when a tenant slug is available. Falls back to letting the
 * caller handle the mock adapter path (see `request()` in api.ts) when no
 * `VITE_API_BASE_URL` is configured.
 */
export async function apiRequest<T>(path: string, opts: RequestOptions = {}): Promise<ApiClientResult<T>> {
  const base = baseUrl();
  if (!base) {
    // No live backend configured — callers should use the mock adapter.
    return { ok: false, status: 0, error: t.toast.error };
  }
  const token = useAuth.getState().token;
  const slug = opts.tenantSlug ?? useAuth.getState().tenantSlug;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (slug) headers["X-Tenant-Slug"] = slug;
  if (opts.idempotencyKey) headers["X-Client-UUID"] = opts.idempotencyKey;

  try {
    const res = await fetch(`${base}${path}`, {
      method: opts.method ?? "GET",
      headers,
      ...(opts.body !== undefined ? { body: JSON.stringify(opts.body) } : {}),
    });
    const json = (await res.json().catch(() => ({}))) as { data?: T; message?: string };
    if (!res.ok) {
      if (res.status === 401 && !opts.raw) {
        AUTH_EVENTS.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
        return { ok: false, status: 401, error: SESSION_EXPIRED };
      }
      if (res.status === 403) {
        return { ok: false, status: 403, error: json.message ?? FORBIDDEN };
      }
      return { ok: false, status: res.status, error: json.message ?? t.toast.error, conflict: res.status === 409 };
    }
    return { ok: true, status: res.status, data: (json.data ?? (json as unknown)) as T };
  } catch {
    return { ok: false, status: 0, error: t.toast.error };
  }
}

export function onAuthExpired(cb: () => void): () => void {
  AUTH_EVENTS.addEventListener(AUTH_EXPIRED_EVENT, cb);
  return () => AUTH_EVENTS.removeEventListener(AUTH_EXPIRED_EVENT, cb);
}

/** Scoped endpoint helper: prepends `/tenants/<slug>` to the path. */
export function tenantPath(slug: string | undefined, path: string): string {
  if (!slug) return path;
  return `/tenants/${encodeURIComponent(slug)}${path}`;
}
