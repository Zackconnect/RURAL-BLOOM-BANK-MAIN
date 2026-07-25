import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { careers } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Heart, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Join St. Margaret Co-operative Savings and Development Society.. Explore open roles in banking, credit, tech, and operations." },
      { property: "og:title", content: "Careers — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Grow your career at our organisation." },
    ],
  }),
  component: Careers,
});

function Careers() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Build a career that builds Ghana" desc="At AKRB you'll work alongside people who believe finance is a force for good." />
      <Section>
        <div className="mb-14 grid gap-6 md:grid-cols-4">
          {[
            { icon: Heart, title: "Purpose-driven work" },
            { icon: TrendingUp, title: "Fast growth path" },
            { icon: Users, title: "Inclusive culture" },
            { icon: Briefcase, title: "Great benefits" },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl border bg-card p-6 text-center shadow-card">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold">{v.title}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-extrabold md:text-3xl">Open roles</h2>
        <div className="mt-6 grid gap-4">
          {careers.map((r) => (
            <div key={r.title} className="grid gap-4 rounded-3xl border bg-card p-6 shadow-card md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="text-lg font-bold">{r.title}</h3>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.location}</span>
                  <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {r.type}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </div>
              <Button asChild className="rounded-full gradient-primary">
                <Link to="/contact">Apply</Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
