# Notification server

Simple webhook receiver that forwards new contact submissions to SendGrid (email) and Twilio (SMS).

Setup

1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies and start the server:

```bash
cd notification-server
npm install
npm start
```

3. Set `VITE_NOTIFICATION_WEBHOOK` in your front-end Vite app to point to the server's `/webhook` URL, e.g. `https://your-server.example.com/webhook`.

Notes

- This is an example receiver for development. In production use HTTPS, authentication, and validate incoming payloads.
- The server uses `ADMIN_EMAIL` as both the sender and recipient for simplicity; change as needed.
