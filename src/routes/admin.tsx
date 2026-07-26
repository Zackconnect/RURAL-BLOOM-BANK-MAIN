import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader, Section } from "@/components/site/Section";
import { createContactSubmissionId, getContactSubmissions, isAdminLoggedIn, loginAdmin, logoutAdmin, updateContactSubmission } from "@/lib/admin";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — AKRB" },
      { name: "description", content: "Admin dashboard for customer contact submissions." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [submissions, setSubmissions] = useState(() => getContactSubmissions());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseText, setResponseText] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setLoggedIn(isAdminLoggedIn());
  }, []);

  const activeSubmission = useMemo(
    () => submissions.find((item) => item.id === selectedId) ?? null,
    [selectedId, submissions],
  );

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginAdmin(username, password)) {
      setLoggedIn(true);
      setUsername("");
      setPassword("");
      toast.success("Admin signed in.");
      setSubmissions(getContactSubmissions());
      return;
    }
    toast.error("Invalid username or password.");
  };

  const handleLogout = () => {
    logoutAdmin();
    setLoggedIn(false);
    setSelectedId(null);
  };

  const handleRespond = () => {
    if (!activeSubmission) return;
    if (!responseText.trim()) {
      toast.error("Enter a response before sending.");
      return;
    }
    const next = updateContactSubmission(activeSubmission.id, {
      status: "responded",
      response: responseText.trim(),
    });
    setSubmissions(next);
    setResponseText("");
    toast.success("Response saved.");
  };

  if (!loggedIn) {
    return (
      <>
        <PageHeader eyebrow="Admin" title="Sign in to manage requests" desc="Enter your admin credentials to review customer messages and reply." />
        <Section>
          <form onSubmit={handleLogin} className="mx-auto max-w-md rounded-3xl border bg-card p-8 shadow-elegant">
            <div className="mb-6 rounded-3xl border bg-secondary/40 p-5">
              <p className="text-sm text-muted-foreground">Use admin/admin123 to sign in.</p>
            </div>
            <div className="grid gap-4">
              <div>
                <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" required />
              </div>
              <div>
                <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <Button type="submit" className="rounded-full gradient-primary text-primary-foreground">
                Sign in
              </Button>
            </div>
          </form>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Admin" title="Customer requests" desc="Review messages, track status, and respond to customers directly." />
      <Section>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <div className="w-full xl:w-1/2">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold">Requests</h2>
              <Button variant="outline" onClick={handleLogout} className="rounded-full">
                Sign out
              </Button>
            </div>
            {submissions.length === 0 ? (
              <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
                No customer messages have been submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <button
                    key={submission.id}
                    type="button"
                    onClick={() => setSelectedId(submission.id)}
                    className={`w-full rounded-3xl border p-5 text-left transition-all ${
                      submission.id === selectedId ? "border-primary bg-primary/5" : "border-input bg-card hover:border-primary/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{submission.subject}</div>
                        <div className="text-xs text-muted-foreground">{submission.name} • {submission.email}</div>
                      </div>
                      <div className="rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {submission.status}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{submission.message}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full xl:w-1/2">
            {activeSubmission ? (
              <div className="rounded-3xl border bg-card p-8 shadow-elegant">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Selected request</div>
                    <div className="text-lg font-semibold">{activeSubmission.subject}</div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {new Date(activeSubmission.submittedAt).toLocaleString()}
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <div>
                    <div className="font-semibold">Customer</div>
                    <div>{activeSubmission.name}</div>
                    <div>{activeSubmission.email}</div>
                    <div>{activeSubmission.phone}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Message</div>
                    <div>{activeSubmission.message}</div>
                  </div>
                </div>
                <div className="mt-6">
                  <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                    Response
                  </Label>
                  <Textarea
                    rows={6}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Write your reply here..."
                  />
                </div>
                <Button onClick={handleRespond} className="mt-6 rounded-full gradient-primary text-primary-foreground">
                  Save response
                </Button>
                {activeSubmission.response ? (
                  <div className="mt-6 rounded-3xl border bg-secondary/5 p-4 text-sm text-muted-foreground">
                    <div className="font-semibold">Last response</div>
                    <p className="mt-2 whitespace-pre-wrap">{activeSubmission.response}</p>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="rounded-3xl border bg-card p-8 text-center text-sm text-muted-foreground">
                Select a request from the left to view details and respond.
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
