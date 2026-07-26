import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { loans } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/loans")({
  head: () => ({
    meta: [
      { title: "Loans — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Susu, Savings, Group, Agric, Emergency and Funeral loan packages — quick approvals and member-focused terms." },
      { property: "og:title", content: "Loans — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Susu, Savings, Group, Agric, Emergency and Funeral loan packages — quick approvals and member-focused terms." },
    ],
  }),
  component: Loans,
});

function Loans() {
  return (
    <>
      <PageHeader eyebrow="Loans" title="Loan packages for every need" desc="Six loan packages: Susu, Savings, Group, Agric, Emergency and Funeral — designed for our members with fast approvals." />
      <Section>
        <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl">Fast, fair, transparent financing</h2>
            <p className="mt-3 text-muted-foreground">No hidden fees. No surprises. Personal loans decisioned in 48 hours, agriculture packages built around your harvest, and mortgages that let you plan up to 20 years ahead.</p>
            <Button asChild size="lg" className="mt-6 rounded-full gradient-primary">
              <Link to="/contact">Apply for a loan</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?black%20farmer,loan" alt="Black farmer receiving a loan" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loans.map((p) => (
            <div key={p.name} className="group overflow-hidden rounded-3xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground group-hover:gradient-primary group-hover:text-primary-foreground transition-colors">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">From</div>
                    <div className="text-sm font-bold text-primary">{p.rate}</div>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 rounded-2xl bg-primary-soft px-3 py-2 text-xs font-semibold text-primary-dark">
                  Up to <span className="font-extrabold">{p.max}</span>
                </div>
                <div className="mt-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Requirements</div>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {p.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 text-primary" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
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
