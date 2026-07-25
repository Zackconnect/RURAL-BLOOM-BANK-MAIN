import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Wallet, Building2, Globe } from "lucide-react";

export const Route = createFileRoute("/current-accounts")({
  head: () => ({
    meta: [
      { title: "Current Accounts — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Individual, business and foreign-currency current accounts with cheque books, cards and unlimited withdrawals." },
      { property: "og:title", content: "Current Accounts — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Full-featured everyday banking." },
    ],
  }),
  component: Current,
});

const accounts = [
  { icon: Wallet, name: "Individual Current", tagline: "Everyday transactional banking", price: "GHS 50 opening", features: ["Unlimited withdrawals", "Free cheque book", "Debit Visa card", "Overdraft eligible"] },
  { icon: Building2, name: "Business Current", tagline: "Purpose-built for SMEs", price: "GHS 200 opening", features: ["Multi-signatory", "Payroll & tax rails", "POS terminals", "Dedicated officer"] },
  { icon: Globe, name: "Foreign Currency", tagline: "USD, EUR, GBP", price: "USD 100 opening", features: ["Competitive FX rates", "SWIFT transfers", "Multi-currency card", "Trade finance support"] },
];

function Current() {
  return (
    <>
      <PageHeader eyebrow="Current Accounts" title="Move money with confidence" desc="Fast payments, powerful tools and a card that works everywhere." />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {accounts.map((a) => (
            <div key={a.name} className="group rounded-3xl border bg-card p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{a.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.tagline}</p>
              <div className="mt-4 rounded-2xl bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground">{a.price}</div>
              <ul className="mt-5 space-y-2 text-sm">
                {a.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full rounded-full gradient-primary">
                <Link to="/contact">Open account <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
