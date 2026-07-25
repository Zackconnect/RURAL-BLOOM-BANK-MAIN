import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/site/Section";
import { AnimatedCounter } from "@/components/site/Stat";
import { stats, whyUs } from "@/lib/site-data";
import { Award, Heart, Target, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "25+ years of empowering Ghanaian communities through inclusive banking, digital innovation and honest partnership." },
      { property: "og:title", content: "About St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Our story, mission and values." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader eyebrow="About us" title="Rooted in community. Ready for tomorrow." desc={`For over 25 years, ${bank.name} has stood beside Ghanaian families, farmers and entrepreneurs — combining local wisdom with modern banking to build lasting prosperity.`} />

      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img src="https://source.unsplash.com/1400x900/?black%20people%20branch,bank" alt="Black people at a bank branch" loading="lazy" className="h-full w-full object-cover" width={1400} height={900} />
          </div>
          <div>
            <div className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">Our story</div>
            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">A quarter century of trust</h2>
            <p className="mt-4 text-muted-foreground">Founded in 2024 in the heart of the Ashanti Region, {bank.name} began with a simple belief: dignified banking should be accessible to every Ghanaian — from the market trader to the smallholder farmer to the growing SME.</p>
            <p className="mt-3 text-muted-foreground">Today we serve 150,000+ customers across 50+ branches and thousands of digital access points, from mobile apps to USSD codes that work even on the simplest phones.</p>
          </div>
        </div>
      </Section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, title: "Our Mission", body: "Deliver inclusive, innovative and secure banking that improves lives and grows local economies." },
              { icon: Sparkles, title: "Our Vision", body: "To be Ghana's most trusted rural bank — the first choice for families, farmers and small businesses." },
              { icon: Heart, title: "Our Values", body: "Integrity, community, excellence and innovation — in that order, every single day." },
            ].map((v) => (
              <div key={v.title} className="rounded-3xl border bg-card p-8 shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title="Our impact in numbers" desc="Real people, real communities, real change.">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl border bg-card p-8 text-center shadow-card">
              <div className="text-4xl font-extrabold text-primary md:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="What sets us apart" title="Why customers stay with us">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w) => (
            <div key={w.title} className="rounded-3xl border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary">
                <w.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-bold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-4xl gradient-primary p-10 text-primary-foreground shadow-elegant md:p-14">
          <Award className="h-10 w-10 text-gold" />
          <h3 className="mt-4 text-2xl font-extrabold md:text-3xl">Recognized for excellence</h3>
          <p className="mt-3 max-w-2xl opacity-90">Winner of the 2026 Best Rural Bank of the Year award, and consistently ranked in the top tier for capital adequacy and customer satisfaction by the Bank of Ghana.</p>
        </div>
      </Section>
    </>
  );
}
