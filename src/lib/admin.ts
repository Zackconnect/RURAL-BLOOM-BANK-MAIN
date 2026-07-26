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
const maybeImportMeta = (typeof import !== "undefined") ? (import.meta as any) : undefined;
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
