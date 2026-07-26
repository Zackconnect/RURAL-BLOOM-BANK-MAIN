import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/afihyia-pa")({
  head: () => ({
    meta: [
      { title: "Afihyia Pa Account — St. Margaret Co-operative" },
      { name: "description", content: "Afihyia Pa is a savings product with benefits for families and regular bonus features." },
    ],
  }),
  component: AfihyiaPa,
});

function AfihyiaPa() {
  return (
    <>
      <PageHeader eyebrow="Afihyia Pa" title="Afihyia Pa Account" desc="A family-focused savings plan with seasonal bonuses and benefits." />
      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="rounded-3xl bg-card p-8">
            <h2 className="text-2xl font-extrabold">Save for the celebrations</h2>
            <p className="mt-3 text-muted-foreground">Afihyia Pa helps families save for festivals, school and special occasions with bonus rewards.</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Regular saving schedules</li>
              <li>Family-linked accounts</li>
              <li>Seasonal bonus contributions</li>
            </ul>
            <Button asChild className="mt-6 rounded-full gradient-primary">
              <Link to="/contact">Open Afihyia Pa</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?family%20savings" alt="Family saving" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
        </div>
      </Section>
    </>
  );
}
