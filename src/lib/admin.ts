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

const STORAGE_KEY = "akrb-contact-submissions";
const ADMIN_SESSION_KEY = "akrb-admin-session";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

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

export function loginAdmin(username: string, password: string) {
  if (!isBrowser) return false;
  const valid = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
  if (!valid) return false;
  window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
  return true;
}

export function logoutAdmin() {
  if (!isBrowser) return;
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminLoggedIn() {
  if (!isBrowser) return false;
  return window.localStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function createContactSubmissionId() {
  if (!isBrowser) return `${Date.now()}`;
  return window.crypto?.randomUUID?.() ?? `${Date.now()}`;
}
