import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Wallet, PiggyBank, TrendingUp, Baby } from "lucide-react";

export const Route = createFileRoute("/accounts")({
  head: () => ({
    meta: [
      { title: "Accounts — St. Margaret Co-operative" },
      { name: "description", content: "Current, Susu, Savings, Afihyia Pa and Abofra Pa accounts — choose the right account for you." },
    ],
  }),
  component: Accounts,
});

const accounts = [
  { icon: Wallet, to: "/current-accounts", title: "Current account", desc: "Fast transactional banking for individuals and businesses." },
  { icon: PiggyBank, to: "/susu-account", title: "Susu account", desc: "Community savings and rotating contributions." },
  { icon: PiggyBank, to: "/savings", title: "Savings account", desc: "Regular, youth and children savings to grow your money." },
  { icon: TrendingUp, to: "/afihyia-pa", title: "Afihyia pa account", desc: "Family savings plan with seasonal bonuses." },
  { icon: Baby, to: "/abofra-pa", title: "Abofra pa account", desc: "Children and youth savings to build early saving habits." },
];

function Accounts() {
  return (
    <>
      <PageHeader eyebrow="Accounts" title="Choose an account" desc="Current, Susu, Savings, Afihyia Pa and Abofra Pa — find the account that fits your needs." />
      <Section>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {accounts.map((a) => (
            <div key={a.to} className="group rounded-3xl border bg-card p-6 text-center shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              <Button asChild className="mt-4 w-full rounded-full gradient-primary">
                <Link to={a.to}>Learn more</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
