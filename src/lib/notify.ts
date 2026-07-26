import type { ContactSubmission } from "./admin";

const NOTIFY_WEBHOOK = (typeof import !== "undefined" && (import.meta as any)?.env?.VITE_NOTIFICATION_WEBHOOK)
  ? String((import.meta as any).env.VITE_NOTIFICATION_WEBHOOK)
  : "";
const SMS_WEBHOOK = (typeof import !== "undefined" && (import.meta as any)?.env?.VITE_SMS_WEBHOOK)
  ? String((import.meta as any).env.VITE_SMS_WEBHOOK)
  : "";
const NOTIFY_SECRET = (typeof import !== "undefined" && (import.meta as any)?.env?.VITE_NOTIFICATION_SECRET)
  ? String((import.meta as any).env.VITE_NOTIFICATION_SECRET)
  : "";

export async function notifyNewSubmission(submission: ContactSubmission) {
  // If no webhook configured, no-op.
  if (!NOTIFY_WEBHOOK && !SMS_WEBHOOK) return;

  const payload = {
    type: "new_contact_submission",
    data: submission,
  };

  try {
    if (NOTIFY_WEBHOOK) {
      const body = JSON.stringify(payload);
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      const timestamp = Date.now().toString();
      if (NOTIFY_SECRET) {
        try {
          const sig = await signPayload(NOTIFY_SECRET, timestamp, body);
          headers["x-akrb-timestamp"] = timestamp;
          headers["x-akrb-signature"] = sig;
        } catch (err) {
          console.error("signPayload failed", err);
        }
      }
      await fetch(NOTIFY_WEBHOOK, { method: "POST", headers, body });
    }
  } catch (err) {
    // swallow — notifications should not break submission flow
    console.error("notifyNewSubmission webhook failed", err);
  }

  try {
    if (SMS_WEBHOOK) {
      // SMS webhook may accept different payload; send minimal info
      await fetch(SMS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: submission.phone, message: `New request from ${submission.name}: ${submission.subject}` }),
      });
    }
  } catch (err) {
    console.error("notifyNewSubmission sms webhook failed", err);
  }
}

async function signPayload(secret: string, timestamp: string, body: string) {
  // signature = v1=<hex(hmac_sha256(timestamp + '.' + body))>
  if (typeof crypto === "undefined" || !crypto.subtle) throw new Error("Web Crypto not available");
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msg = encoder.encode(timestamp + "." + body);
  const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, msg);
  const hex = Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `v1=${hex}`;
}
