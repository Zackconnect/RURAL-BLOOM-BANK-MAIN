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

const STORAGE_KEY = "akrb-contact-submissions";
const ADMIN_SESSION_KEY = "akrb-admin-session";

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

// Gallery Management
export type GalleryItem = {
  id: string;
  name: string;
  role: string;
  image: string;
  addedAt: string;
};

const GALLERY_STORAGE_KEY = "akrb-gallery";

function readGallery(): GalleryItem[] {
  if (!isBrowser) return [];
  try {
    return JSON.parse(window.localStorage.getItem(GALLERY_STORAGE_KEY) ?? "[]") as GalleryItem[];
  } catch {
    return [];
  }
}

function writeGallery(items: GalleryItem[]) {
  if (!isBrowser) return;
  window.localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
}

export function getGalleryItems(): GalleryItem[] {
  return readGallery();
}

export function addGalleryItem(item: Omit<GalleryItem, "id" | "addedAt">): GalleryItem {
  const gallery = readGallery();
  const newItem: GalleryItem = {
    ...item,
    id: window.crypto?.randomUUID?.() ?? `${Date.now()}`,
    addedAt: new Date().toISOString(),
  };
  gallery.push(newItem);
  writeGallery(gallery);
  return newItem;
}

export function removeGalleryItem(id: string) {
  const gallery = readGallery();
  const filtered = gallery.filter((item) => item.id !== id);
  writeGallery(filtered);
}

export function updateGalleryItem(id: string, updates: Partial<Omit<GalleryItem, "id" | "addedAt">>) {
  const gallery = readGallery();
  const updated = gallery.map((item) => (item.id === id ? { ...item, ...updates } : item));
  writeGallery(updated);
}
