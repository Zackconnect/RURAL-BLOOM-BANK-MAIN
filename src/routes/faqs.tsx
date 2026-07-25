import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { faqs } from "@/lib/site-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Answers to the most common questions about accounts, loans, digital banking and security at St. Margaret Co-operative Savings and Development Society." },
      { property: "og:title", content: "FAQs — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Get quick answers." },
    ],
  }),
  component: FAQs,
});

function FAQs() {
  return (
    <>
      <PageHeader eyebrow="Help center" title="Frequently asked questions" desc="Quick answers on accounts, loans, digital banking and more." />
      <Section>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border bg-card px-5 shadow-card">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 rounded-3xl gradient-primary p-8 text-primary-foreground shadow-elegant text-center">
            <h3 className="text-2xl font-extrabold">Still have questions?</h3>
            <p className="mt-2 opacity-90">Our team responds within 24 hours — or call us anytime.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full gradient-gold text-gold-foreground">
                <Link to="/contact">Contact us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/branches">Visit a branch</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
