import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { branches } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, MapPin, Clock, Search, Navigation } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/branches")({
  head: () => ({
      meta: [
      { title: "Branch Locator — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Find St. Margaret Co-operative Savings and Development Society. branches across Ghana. 50+ locations with full-service banking and ATMs." },
      { property: "og:title", content: "Branch Locator — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "50+ branches across Ghana." },
    ],
  }),
  component: Branches,
});

function Branches() {
  const [q, setQ] = useState("");
  const filtered = branches.filter(
    (b) =>
      b.name.toLowerCase().includes(q.toLowerCase()) ||
      b.region.toLowerCase().includes(q.toLowerCase()) ||
      b.address.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHeader eyebrow="Branches" title="Find a branch near you" desc="50+ locations across Ghana — walk in and we'll take care of the rest." />
      <Section>
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border bg-card p-6 shadow-card md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-full border bg-background px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by city, region, or branch name…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 shadow-none"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {branches.length}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          <div className="grid gap-4">
            {filtered.map((b) => (
              <div key={b.name} className="rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{b.name}</h3>
                    <div className="mt-0.5 text-xs font-semibold uppercase tracking-widest text-primary">{b.region}</div>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 rounded-full">
                    <Navigation className="mr-1 h-3.5 w-3.5" /> Directions
                  </Button>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> {b.address}</li>
                  <li className="flex items-start gap-2"><Phone className="mt-0.5 h-4 w-4 text-primary" /> {b.phone}</li>
                  <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 text-primary" /> {b.hours}</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="sticky top-24 h-[600px] overflow-hidden rounded-3xl border shadow-elegant">
            <iframe
              title="St. Margaret Co-operative Savings and Development Society. Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d508086.6033259466!2d-0.4368!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sgh!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
