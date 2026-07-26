import type { ContactSubmission } from "./admin";

const NOTIFY_WEBHOOK = (typeof import !== "undefined" && (import.meta as any)?.env?.VITE_NOTIFICATION_WEBHOOK)
  ? String((import.meta as any).env.VITE_NOTIFICATION_WEBHOOK)
  : "";
const SMS_WEBHOOK = (typeof import !== "undefined" && (import.meta as any)?.env?.VITE_SMS_WEBHOOK)
  ? String((import.meta as any).env.VITE_SMS_WEBHOOK)
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
      await fetch(NOTIFY_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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
