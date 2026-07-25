import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { savings, loans, investments, digital } from "@/lib/site-data";
import { ArrowRight, CreditCard } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
      meta: [
      { title: "Products & Services — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Explore savings, current accounts, loans, investments, digital banking and cards from St. Margaret Co-operative Savings and Development Society." },
      { property: "og:title", content: "Products & Services" },
      { property: "og:description", content: "All St. Margaret Co-operative Savings and Development Society. products in one place." },
    ],
  }),
  component: Products,
});

const cards = [
  { name: "AKRB Classic Debit", desc: "Everyday Visa debit for savings and current accounts.", perks: ["Free issuance", "Global acceptance", "Contactless"] },
  { name: "AKRB Gold Credit", desc: "Premium credit card with rewards and travel benefits.", perks: ["Up to 45 days interest-free", "Airport lounge", "Cashback"] },
  { name: "AKRB Prepaid", desc: "Reloadable prepaid card for online and offline payments.", perks: ["No account needed", "Budget-friendly", "Instant issuance"] },
];

function Products() {
  return (
    <>
      <PageHeader eyebrow="Products" title="Products & Services" desc="From your first savings account to complex business finance — we have you covered." />

      <Section>
        <Tabs defaultValue="savings">
          <TabsList className="mx-auto mb-8 flex h-auto w-full max-w-4xl flex-wrap justify-center gap-2 rounded-full bg-secondary p-1.5">
            {[
              ["savings", "Savings"],
              ["current", "Current"],
              ["loans", "Loans"],
              ["invest", "Investments"],
              ["digital", "Digital"],
              ["cards", "Cards"],
            ].map(([v, l]) => (
              <TabsTrigger key={v} value={v} className="rounded-full px-5 py-2 text-sm font-semibold data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">
                {l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="savings">
            <Grid items={savings.map((p) => ({ icon: p.icon, title: p.name, meta: `${p.rate} • Min ${p.min}`, desc: p.desc, to: "/savings" }))} />
          </TabsContent>
          <TabsContent value="current">
            <Grid items={[
              { icon: CreditCard, title: "Individual Current", meta: "0% • No lock-in", desc: "Everyday transactional account with cheque book and unlimited withdrawals.", to: "/current-accounts" },
              { icon: CreditCard, title: "Business Current", meta: "Multi-user", desc: "Full-featured current account for SMEs and corporates.", to: "/current-accounts" },
              { icon: CreditCard, title: "Foreign Currency", meta: "USD / EUR / GBP", desc: "Hold and transact in foreign currency at competitive rates.", to: "/current-accounts" },
            ]} />
          </TabsContent>
          <TabsContent value="loans">
            <Grid items={loans.map((p) => ({ icon: p.icon, title: p.name, meta: `Up to ${p.max}`, desc: p.desc, to: "/loans" }))} />
          </TabsContent>
          <TabsContent value="invest">
            <Grid items={investments.map((p) => ({ icon: p.icon, title: p.name, meta: `${p.rate} • ${p.tenor}`, desc: p.desc, to: "/investments" }))} />
          </TabsContent>
          <TabsContent value="digital">
            <Grid items={digital.map((p) => ({ icon: p.icon, title: p.name, meta: "24/7", desc: p.desc, to: "/digital-banking" }))} />
          </TabsContent>
          <TabsContent value="cards">
            <Grid items={cards.map((c) => ({ icon: CreditCard, title: c.name, meta: c.perks[0], desc: c.desc, to: "/digital-banking" }))} />
          </TabsContent>
        </Tabs>
      </Section>
    </>
  );
}

function Grid({ items }: { items: { icon: any; title: string; meta: string; desc: string; to: string }[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <div key={p.title} className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
          <div className="flex items-start justify-between">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground group-hover:gradient-primary group-hover:text-primary-foreground transition-colors">
              <p.icon className="h-5 w-5" />
            </div>
            <div className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-dark">
              {p.meta}
            </div>
          </div>
          <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          <Button asChild variant="ghost" className="mt-3 -ml-3 rounded-full text-primary hover:bg-accent">
            <Link to={p.to}>Learn more <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
