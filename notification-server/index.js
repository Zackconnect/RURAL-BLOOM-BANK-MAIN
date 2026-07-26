import express from "express";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import Twilio from "twilio";

dotenv.config();

const PORT = process.env.PORT || 4001;
const app = express();
app.use(express.json());

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_FROM;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

if (SENDGRID_API_KEY) sgMail.setApiKey(SENDGRID_API_KEY);
const twilioClient = TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN ? Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN) : null;

app.post("/webhook", async (req, res) => {
  const payload = req.body;
  console.log("received webhook", payload?.type ?? "", payload?.data?.subject ?? "");

  try {
    const submission = payload?.data;
    if (!submission) return res.status(400).json({ ok: false, error: "missing submission data" });

    // Send email to admin
    if (SENDGRID_API_KEY && ADMIN_EMAIL) {
      const msg = {
        to: ADMIN_EMAIL,
        from: ADMIN_EMAIL,
        subject: `New contact: ${submission.subject}`,
        text: `Name: ${submission.name}\nEmail: ${submission.email}\nPhone: ${submission.phone}\n\n${submission.message}`,
      };
      await sgMail.send(msg);
    }

    // Optionally send SMS to the customer's phone (or admin phone via env)
    if (twilioClient && TWILIO_FROM && submission.phone) {
      try {
        await twilioClient.messages.create({ body: `Received your request: ${submission.subject}`, from: TWILIO_FROM, to: submission.phone });
      } catch (err) {
        console.error("Twilio send failed", err?.message ?? err);
      }
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
});

app.get("/", (req, res) => res.send("Notification webhook receiver"));

app.listen(PORT, () => console.log(`Notification server listening on http://localhost:${PORT}`));
