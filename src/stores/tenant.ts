import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { School, SchoolStatus } from "@/types/tenant";

/** Seed schools for offline/demo use and for resolving slugs before the Laravel backend is live. */
const SEED_SCHOOLS: School[] = [
  {
    id: "school-bontu",
    schoolName: "ቅዱስ ሚካኤል ቦንቱ ሰንበት ትምህርት ቤት",
    slug: "bontu",
    location: "ቦንቱ",
    phone: "+251900000001",
    email: "bontu@ssms.et",
    status: "active",
    createdAt: "2024-09-01T00:00:00.000Z",
  },
  {
    id: "school-woliso",
    schoolName: "ቅዱስ ሚካኤል ወልዕሶ ሰንበት ትምህርት ቤት",
    slug: "woliso",
    location: "ወልዕሶ",
    phone: "+251900000002",
    email: "woliso@ssms.et",
    status: "active",
    createdAt: "2024-09-01T00:00:00.000Z",
  },
  {
    id: "school-hosanna",
    schoolName: "ሆሳዕና ሰንበት ትምህርት ቤት",
    slug: "hosanna",
    location: "ሆሳዕና",
    phone: "+251900000003",
    email: "hosanna@ssms.et",
    status: "active",
    createdAt: "2024-09-01T00:00:00.000Z",
  },
];

interface TenantState {
  schools: School[];
  /** Active tenant slug (set on login / route resolution). */
  activeSlug: string | null;
  setActiveSlug: (slug: string | null) => void;
  getSchool: (slug: string) => School | undefined;
  registerSchool: (data: Omit<School, "id" | "createdAt">) => School;
  updateSchool: (id: string, patch: Partial<Omit<School, "id">>) => void;
  setStatus: (id: string, status: SchoolStatus) => void;
  /** Clears active tenant — called on sign-out or school switch. */
  clearActive: () => void;
}

function genId(): string {
  return `school-${Math.random().toString(36).slice(2, 10)}`;
}

export const useTenant = create<TenantState>()(
  persist(
    (set, get) => ({
      schools: SEED_SCHOOLS,
      activeSlug: null,
      setActiveSlug: (slug) => set({ activeSlug: slug }),
      getSchool: (slug) => get().schools.find((s) => s.slug === slug),
      registerSchool: (data) => {
        const school: School = { id: genId(), createdAt: new Date().toISOString(), ...data };
        set((st) => ({ schools: [...st.schools, school] }));
        return school;
      },
      updateSchool: (id, patch) =>
        set((st) => ({
          schools: st.schools.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        })),
      setStatus: (id, status) =>
        set((st) => ({
          schools: st.schools.map((s) => (s.id === id ? { ...s, status } : s)),
        })),
      clearActive: () => set({ activeSlug: null }),
    }),
    { name: "ssms-tenants", storage: createJSONStorage(() => localStorage) },
  ),
);
