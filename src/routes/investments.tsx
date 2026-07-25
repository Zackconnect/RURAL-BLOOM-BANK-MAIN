import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { investments } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/investments")({
  head: () => ({
    meta: [
      { title: "Investments — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Treasury bills, fixed deposits, corporate investments and retirement savings with expert advisory." },
      { property: "og:title", content: "Investment Products — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Grow your wealth with confidence." },
    ],
  }),
  component: Investments,
});

function Investments() {
  return (
    <>
      <PageHeader eyebrow="Investments" title="Grow your wealth with confidence" desc="Government-backed instruments and structured products, with guidance from our wealth team." />
      <Section>
        <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?black%20business%20investment" alt="Black professionals discussing investments" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> Wealth management
            </div>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">From your first cedi to your retirement</h2>
            <p className="mt-3 text-muted-foreground">Whether you're building an emergency fund, planning for retirement or structuring corporate treasury — our investment desk works with you to design a portfolio that fits your goals and risk profile.</p>
            <Button asChild size="lg" className="mt-6 rounded-full gradient-primary">
              <Link to="/contact">Talk to an advisor</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {investments.map((p) => (
            <div key={p.name} className="group rounded-3xl border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-gold text-gold-foreground shadow-elegant">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-secondary p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Rate</div>
                  <div className="text-sm font-bold text-primary">{p.rate}</div>
                </div>
                <div className="rounded-2xl bg-secondary p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Tenor</div>
                  <div className="text-sm font-bold text-primary">{p.tenor}</div>
                </div>
              </div>
              <Button asChild variant="ghost" className="mt-4 -ml-3 rounded-full text-primary hover:bg-accent">
                <Link to="/contact">Invest now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
