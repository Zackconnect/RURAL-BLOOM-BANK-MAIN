import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";

export const Route = createFileRoute("/abofra-pa")({
  head: () => ({
    meta: [
      { title: "Abofra Pa Account — St. Margaret Co-operative" },
      { name: "description", content: "A savings account built for children and youth to encourage early saving habits." },
    ],
  }),
  component: AbofraPa,
});

function AbofraPa() {
  return (
    <>
      <PageHeader eyebrow="Children & Youth" title="Abofra Pa Account" desc="A safe, friendly savings account to help children learn the value of saving." />
      <Section>
        <div className="mb-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl bg-card p-8">
            <h2 className="text-2xl font-extrabold">Start saving young</h2>
            <p className="mt-3 text-muted-foreground">The Abofra Pa account is designed for children and teenagers with low minimums and educational features to make saving fun.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">Flexible deposits and parental controls</li>
              <li className="flex items-start gap-2">Competitive interest for long-term growth</li>
              <li className="flex items-start gap-2">No hidden fees</li>
            </ul>
            <Button asChild className="mt-6 rounded-full gradient-primary">
              <Link to="/contact">Open an account</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?children%20savings" alt="Children saving" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
        </div>
      </Section>
    </>
  );
}
