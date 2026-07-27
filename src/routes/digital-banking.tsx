import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { digital } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Smartphone, ArrowRight, Apple, Play } from "lucide-react";

export const Route = createFileRoute("/digital-banking")({
  head: () => ({
    meta: [
      { title: "Digital Banking — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Mobile app, internet banking, USSD *889*905#, ATMs, Visa & MasterCard, QR payments — all in one place." },
      { property: "og:title", content: "Digital Banking — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Bank from anywhere, on any device." },
    ],
  }),
  component: Digital,
});

function Digital() {
  return (
    <>
      <PageHeader eyebrow="Digital Banking" title="Bank from anywhere, on any device" desc="From the flagship mobile app to a USSD code that works on any phone — we meet you where you are." />
      <Section>
        <div className="mb-14 grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              <Smartphone className="h-3.5 w-3.5" /> Now with AI insights
            </div>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">The AKRB app — reimagined</h2>
            <p className="mt-3 text-muted-foreground">Send money in seconds, buy airtime, pay bills, apply for a loan and get personalized budgeting insights — all in one beautifully simple app.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                <Apple className="mr-2 h-4 w-4" /> App Store
              </Button>
              <Button size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                <Play className="mr-2 h-4 w-4" /> Google Play
              </Button>
            </div>
            <div className="mt-6 rounded-2xl border bg-card p-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">No smartphone? No problem.</div>
              <div className="mt-1 font-mono text-lg font-extrabold text-primary">Dial *889*905#</div>
              <div className="text-xs text-muted-foreground">Check balance, transfer, buy airtime — no internet required.</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?black%20person%20mobile%20banking" alt="Black person using mobile banking" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {digital.map((d) => (
            <div key={d.name} className="group rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground group-hover:gradient-primary group-hover:text-primary-foreground transition-colors">
                <d.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold">{d.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
