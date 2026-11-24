import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  userId: string | null;
  token: string | null;
  tenantSlug: string | null;
  setSession: (userId: string, token: string, tenantSlug?: string) => void;
  setTenantSlug: (slug: string | null) => void;
  clear: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      tenantSlug: null,
      setSession: (userId, token, tenantSlug) =>
        set((st) => ({ userId, token, tenantSlug: tenantSlug ?? st.tenantSlug })),
      setTenantSlug: (slug) => set({ tenantSlug: slug }),
      clear: () => set({ userId: null, token: null, tenantSlug: null }),
    }),
    { name: "ssms-auth", storage: createJSONStorage(() => localStorage) },
  ),
);
