import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";

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
      <PageHeader eyebrow="Savings" title="Savings that work as hard as you do" desc="Six ways to save — for every stage of life, every budget and every goal. All savings accounts attract an entrance fee of GHS 20." />
      <Section>
        <div className="mb-14 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1200x800/?black%20family%20savings" alt="Black family saving together" loading="lazy" className="h-full w-full object-cover" width={1200} height={800} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold md:text-4xl">Every cedi counts</h2>
            <p className="mt-3 text-muted-foreground">Whether you're saving for school fees, a business investment, or your child's future — our savings products offer competitive returns, low minimum balances and clear terms.</p>
            <p className="mt-4 text-sm text-muted-foreground">All savings accounts now have a GHS 20 entrance fee. Susu accounts remain free.</p>
            <Button asChild size="lg" className="mt-6 rounded-full gradient-primary">
              <Link to="/contact">Open a savings account</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
