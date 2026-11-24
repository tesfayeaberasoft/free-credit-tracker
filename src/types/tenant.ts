export type SchoolStatus = "active" | "suspended";

export interface School {
  id: string;
  schoolName: string;
  slug: string;
  location: string;
  phone: string;
  email: string;
  status: SchoolStatus;
  managerUserId?: string;
  createdAt: string;
}

export interface TenantSession {
  school: School;
  token: string;
  userId: string;
}

export const SUSPENDED_MESSAGE = "ይህ ሰንበት ትምህርት ቤት ለጊዜው ቆሟል። እባክዎ የመድረክ አስተዳዳሪን ያነጋግሩ።";
export const SESSION_EXPIRED = "ክፍለጊዜዎ አበቃ። እባክዎ በድጋሚ ይግቡ።";
export const FORBIDDEN = "ይህን ክፍል ለመድረስ ፍቃድ የለዎትም።";
