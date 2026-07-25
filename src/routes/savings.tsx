import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { savings } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/savings")({
  head: () => ({
      meta: [
      { title: "Savings Accounts — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Regular, youth, children, salary, fixed deposit and business savings accounts with competitive interest rates." },
      { property: "og:title", content: "Savings Accounts — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Grow your money with confidence." },
    ],
  }),
  component: Savings,
});

function Savings() {
  return (
    <>
      <PageHeader eyebrow="Savings" title="Savings that work as hard as you do" desc="Six ways to save — for every stage of life, every budget and every goal." />
      <Section>
        <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?black%20family%20savings" alt="Black family saving together" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl">Every cedi counts</h2>
            <p className="mt-3 text-muted-foreground">Whether you're saving for school fees, a business investment, or your child's future — our savings products offer competitive returns, low minimum balances and zero hidden fees.</p>
            <Button asChild size="lg" className="mt-6 rounded-full gradient-primary">
              <Link to="/contact">Open a savings account</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savings.map((p) => (
            <div key={p.name} className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="gradient-primary p-6 text-primary-foreground">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-foreground/15 backdrop-blur">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-extrabold">{p.name}</h3>
                <div className="mt-1 text-sm opacity-90">{p.desc}</div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Metric label="Interest" value={p.rate} />
                  <Metric label="Min balance" value={p.min} />
                </div>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-6 w-full rounded-full gradient-primary">
                  <Link to="/contact">Apply <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-bold text-primary">{value}</div>
    </div>
  );
}
