import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { bank } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Reach St. Margaret Co-operative Savings and Development Society. customer service, apply to open an account, or find our head office." },
      { property: "og:title", content: "Contact — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "We're here to help." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="We're here to help" desc="Talk to a real person, in your language, whenever you need us." />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: bank.phone },
              { icon: Mail, label: "Email", value: bank.email },
              { icon: MapPin, label: "Head Office", value: bank.address },
              { icon: Clock, label: "Working Hours", value: "Mon–Fri 8:30am–4pm • Sat 9am–1pm" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-3xl border bg-card p-5 shadow-card">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="mt-0.5 font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
            <div className="rounded-3xl border bg-card p-5 shadow-card">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Follow us</div>
              <div className="mt-3 flex gap-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="grid h-10 w-10 place-items-center rounded-full bg-accent text-primary hover:gradient-primary hover:text-primary-foreground transition-colors"
                    aria-label="social"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-6 shadow-elegant md:p-8">
            <h2 className="text-2xl font-extrabold">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We reply within 24 hours on business days.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Full name"><Input required maxLength={100} placeholder="Kwame Boateng" /></Field>
              <Field label="Email"><Input type="email" required maxLength={255} placeholder="you@email.com" /></Field>
              <Field label="Phone"><Input type="tel" maxLength={20} placeholder="+233 …" /></Field>
              <Field label="Subject"><Input required maxLength={120} placeholder="Account opening" /></Field>
            </div>
            <Field label="Message" className="mt-4">
              <Textarea required maxLength={1000} rows={5} placeholder="How can we help?" />
            </Field>
            <Button type="submit" size="lg" disabled={loading} className="mt-6 w-full rounded-full gradient-primary md:w-auto">
              {loading ? "Sending…" : <>Send message <Send className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border shadow-elegant">
          <iframe
            title="St. Margaret Co-operative Savings and Development Society. Head Office"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d508086.6033259466!2d-0.4368!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1700000000000"
            width="100%"
            height="400"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
