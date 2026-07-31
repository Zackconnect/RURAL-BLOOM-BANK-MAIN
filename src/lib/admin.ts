export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: "new" | "responded";
  response?: string;
};

import { notifyNewSubmission } from "@/lib/notify";
import { branches as defaultBranches } from "@/lib/site-data";

const STORAGE_KEY = "akrb-contact-submissions";
const ADMIN_SESSION_KEY = "akrb-admin-session";
const BRANCHES_STORAGE_KEY = "akrb-branches";

// Read admin credentials from Vite env vars if provided for better security in deployments.
// Fallback to the previous defaults for local development.
const maybeImportMeta = (typeof window !== "undefined") ? (import.meta as any) : undefined;
const maybeEnv = maybeImportMeta?.env as Record<string, string> | undefined;
const ADMIN_USERNAME = maybeEnv?.VITE_ADMIN_USER ? String(maybeEnv.VITE_ADMIN_USER) : "admin";
const ADMIN_PASSWORD = maybeEnv?.VITE_ADMIN_PASSWORD ? String(maybeEnv.VITE_ADMIN_PASSWORD) : "admin123";

const isBrowser = typeof window !== "undefined";

function readSubmissions(): ContactSubmission[] {
  if (!isBrowser) return [];
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as ContactSubmission[];
  } catch {
    return [];
  }
}

function writeSubmissions(submissions: ContactSubmission[]) {
  if (!isBrowser) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export function getContactSubmissions(): ContactSubmission[] {
  return readSubmissions();
}

export function saveContactSubmission(submission: ContactSubmission) {
  const submissions = readSubmissions();
  submissions.unshift(submission);
  writeSubmissions(submissions);
  // send notifications (fire-and-forget)
  try {
    void notifyNewSubmission(submission);
  } catch (err) {
    console.error("notifyNewSubmission failed", err);
  }
}

export function updateContactSubmission(
  id: string,
  updates: Partial<Omit<ContactSubmission, "id" | "submittedAt">>,
) {
  const submissions = readSubmissions();
  const next = submissions.map((item) => (item.id === id ? { ...item, ...updates } : item));
  writeSubmissions(next);
  return next;
}

type AdminSession = {
  token: string;
  expiresAt: number; // epoch ms
};

const DEFAULT_SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

function makeToken() {
  if (isBrowser && window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

}

function readAdminSession(): AdminSession | null {
  if (!isBrowser) return null;
  try {
    const raw = window.localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AdminSession;
    if (!parsed?.token || !parsed?.expiresAt) return null;
    if (parsed.expiresAt < Date.now()) {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeAdminSession(session: AdminSession) {
  if (!isBrowser) return;
  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function loginAdmin(username: string, password: string) {
  if (!isBrowser) return false;
  const valid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  if (!valid) return false;
  const token = makeToken();
  const ttl = typeof maybeEnv?.VITE_ADMIN_SESSION_TTL_MS === "string"
    ? Number(maybeEnv.VITE_ADMIN_SESSION_TTL_MS) || DEFAULT_SESSION_TTL_MS
    : DEFAULT_SESSION_TTL_MS;
  writeAdminSession({ token, expiresAt: Date.now() + ttl });
  return true;
}

export function logoutAdmin() {
  if (!isBrowser) return;
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminLoggedIn() {
  if (!isBrowser) return false;
  return readAdminSession() !== null;
}

export function createContactSubmissionId() {
  if (!isBrowser) return `${Date.now()}`;
  return window.crypto?.randomUUID?.() ?? `${Date.now()}`;
}

export type BranchItem = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  region: string;
  image: string;
  details?: string;
  gallery?: string[];
  mapQuery?: string;
  addedAt: string;
};

function readBranches(): BranchItem[] {
  if (!isBrowser) return [];
  try {
    return JSON.parse(window.localStorage.getItem(BRANCHES_STORAGE_KEY) ?? "[]") as BranchItem[];
  } catch {
    return [];
  }
}

function writeBranches(branches: BranchItem[]) {
  if (!isBrowser) return;
  window.localStorage.setItem(BRANCHES_STORAGE_KEY, JSON.stringify(branches));
}

// Replace the current branches list (used for reorder / bulk import)
export function setBranchItems(branches: BranchItem[]) {
  if (!isBrowser) return;
  writeBranches(branches.map((b) => ({ ...b })));
}

export function getBranchItems(): BranchItem[] {
  const branches = readBranches();
  if (branches.length > 0) return branches;
  return defaultBranches.map((branch) => ({
    ...branch,
    id: branch.id ?? `${branch.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`,
    image: branch.image ?? "",
    addedAt: new Date().toISOString(),
  }));
}

export function addBranchItem(item: Omit<BranchItem, "id" | "addedAt">): BranchItem {
  const branches = readBranches();
  const newBranch: BranchItem = {
    ...item,
    id: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
    addedAt: new Date().toISOString(),
  };
  branches.push(newBranch);
  writeBranches(branches);
  return newBranch;
}

export function updateBranchItem(id: string, updates: Partial<Omit<BranchItem, "id" | "addedAt">>) {
  const branches = getBranchItems();
  const next = branches.map((branch) => (branch.id === id ? { ...branch, ...updates } : branch));
  // Ensure we write plain BranchItem[] to storage (drop any getters)
  writeBranches(next.map((b) => ({ ...b })));
  return next;
}

export function removeBranchItem(id: string) {
  const branches = getBranchItems();
  const filtered = branches.filter((branch) => branch.id !== id);
  writeBranches(filtered.map((b) => ({ ...b })));
  return filtered;
}

export type GalleryItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  addedAt: string;
};

const GALLERY_STORAGE_KEY = "akrb-gallery";

function readGalleryItems(): GalleryItem[] {
  if (!isBrowser) return [];
  try {
    return JSON.parse(window.localStorage.getItem(GALLERY_STORAGE_KEY) ?? "[]") as GalleryItem[];
  } catch {
    return [];
  }
}

function writeGalleryItems(items: GalleryItem[]) {
  if (!isBrowser) return;
  window.localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
}

export function getGalleryItems(): GalleryItem[] {
  return readGalleryItems();
}

export function addGalleryItem(item: Omit<GalleryItem, "id" | "addedAt">): GalleryItem {
  const galleryItems = readGalleryItems();
  const newItem: GalleryItem = {
    ...item,
    id: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
    addedAt: new Date().toISOString(),
  };
  galleryItems.push(newItem);
  writeGalleryItems(galleryItems);
  return newItem;
}

export function removeGalleryItem(id: string) {
  const galleryItems = readGalleryItems();
  const filtered = galleryItems.filter((item) => item.id !== id);
  writeGalleryItems(filtered);
  return filtered;
}

// Testimonial avatar management
export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
  addedAt: string;
};

const TESTIMONIALS_STORAGE_KEY = "akrb-testimonials";

function readTestimonials(): TestimonialItem[] {
  if (!isBrowser) return [];
  try {
    return JSON.parse(window.localStorage.getItem(TESTIMONIALS_STORAGE_KEY) ?? "[]") as TestimonialItem[];
  } catch {
    return [];
  }
}

function writeTestimonials(items: TestimonialItem[]) {
  if (!isBrowser) return;
  window.localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(items));
}

export function getTestimonials(): TestimonialItem[] {
  return readTestimonials();
}

export function addTestimonialItem(item: Omit<TestimonialItem, "id" | "addedAt">): TestimonialItem {
  const testimonials = readTestimonials();
  const newItem: TestimonialItem = {
    ...item,
    id: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
    addedAt: new Date().toISOString(),
  };
  testimonials.push(newItem);
  writeTestimonials(testimonials);
  return newItem;
}

export function removeTestimonialItem(id: string) {
  const testimonials = readTestimonials();
  const filtered = testimonials.filter((item) => item.id !== id);
  writeTestimonials(filtered);
}

export function updateTestimonialItem(id: string, updates: Partial<Omit<TestimonialItem, "id" | "addedAt">>) {
  const testimonials = readTestimonials();
  const updated = testimonials.map((item) => (item.id === id ? { ...item, ...updates } : item));
  writeTestimonials(updated);
}
