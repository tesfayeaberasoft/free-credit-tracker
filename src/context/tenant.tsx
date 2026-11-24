import { createContext, useContext, type ReactNode } from "react";
import type { School } from "@/types/tenant";

interface TenantContextValue {
  slug: string;
  school: School | undefined;
  suspended: boolean;
}

const TenantContext = createContext<TenantContextValue | null>(null);

export function TenantProvider({ slug, school, children }: Omit<TenantContextValue, "suspended"> & { children: ReactNode }) {
  return <TenantContext.Provider value={{ slug, school, suspended: school?.status === "suspended" }}>{children}</TenantContext.Provider>;
}

export function useTenantContext(): TenantContextValue | null {
  return useContext(TenantContext);
}
