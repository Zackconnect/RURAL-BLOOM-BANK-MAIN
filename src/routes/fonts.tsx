import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bank } from "@/lib/site-data";

export const Route = createFileRoute("/fonts")({
  head: () => ({
    meta: [
      { title: "Fonts — St. Margaret Co-operative Savings and Development Society." },
      { name: "description", content: "Explore the brand font and typography settings used for St. Margaret Co-operative." },
      { property: "og:title", content: "Fonts — St. Margaret Co-operative Savings and Development Society." },
      { property: "og:description", content: "Explore the brand font and typography settings used for St. Margaret Co-operative." },
    ],
  }),
  component: FontsPage,
});

function FontsPage() {
  return (
    <main className="space-y-12">
      <section className="relative min-h-[70vh] overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 -z-10 bg-primary-dark">
          <img
            src={heroImg}
            alt="Community banking"
            className="h-full w-full object-cover opacity-20"
            width={1600}
            height={1100}
          />
          <div className="absolute inset-0 bg-primary-dark/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-primary/25" />
        </div>
        <div className="container-x relative py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur text-white/90">
              Font Showcase
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              Brand typography for <span className="text-gold">{bank.name}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80 md:text-xl">
              Poppins is the core typeface across the site, with bold, modern headings and crisp readable body text.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full gradient-gold text-gold-foreground shadow-elegant hover:opacity-95">
                <Link to="/">Back to Home <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16 md:py-24">
        <div className="mx-auto max-w-4xl space-y-10 rounded-4xl border border-border bg-card p-10 shadow-card">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">Poppins</p>
            <h2 className="mt-3 text-4xl font-extrabold">Primary brand font</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              All brand typography uses the Poppins font family loaded from Google Fonts. The font is applied for headings, body copy, and display text across the site.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: "Poppins 900", weight: 900, sample: "Banking Made Simple" },
              { label: "Poppins 700", weight: 700, sample: "Save. Grow. Thrive." },
              { label: "Poppins 400", weight: 400, sample: "Smart savings and trusted community banking." },
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-border bg-background p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
                <p className="mt-4 text-xl font-bold" style={{ fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif", fontWeight: item.weight }}>
                  {item.sample}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-secondary p-8 text-muted-foreground">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Usage</p>
            <ul className="mt-4 space-y-3 text-sm leading-7">
              <li className="before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-primary before:align-middle">
                Use <span className="font-semibold text-foreground">Poppins 900</span> for main hero headings and primary calls to action.
              </li>
              <li className="before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-primary before:align-middle">
                Use <span className="font-semibold text-foreground">Poppins 700</span> for section titles, cards, and navigation emphasis.
              </li>
              <li className="before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-primary before:align-middle">
                Use <span className="font-semibold text-foreground">Poppins 400</span> for paragraph text, form labels, and supportive body copy.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
