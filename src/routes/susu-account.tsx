import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { PiggyBank } from "lucide-react";

export const Route = createFileRoute("/susu-account")({
  head: () => ({
    meta: [
      { title: "Susu Account — St. Margaret Co-operative" },
      { name: "description", content: "Susu savings and lending for rotating savings groups and community-based saving schemes." },
    ],
  }),
  component: Susu,
});

function Susu() {
  return (
    <>
      <PageHeader eyebrow="Susu" title="Susu Account" desc="Community-driven saving and lending for groups and rotating contributions." />
      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl bg-card p-8">
            <h2 className="text-2xl font-extrabold">Group savings made simple</h2>
            <p className="mt-3 text-muted-foreground">Join or create a Susu group and access small loans, rotating payouts and group support.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Susu group membership and verification</li>
              <li>Small short-term loans for members</li>
              <li>Transparent group records and payouts</li>
            </ul>
            <Button asChild className="mt-6 rounded-full gradient-primary">
              <Link to="/contact">Get started</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?community%20savings" alt="Susu group" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
        </div>
      </Section>
    </>
  );
}
