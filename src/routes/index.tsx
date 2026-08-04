import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { AnimatedCounter } from "@/components/site/Stat";
import { stats, bank } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${bank.name} — St. Margaret Co-operative Savings and Development Society.` },
      { name: "description", content: "Trusted local banking and financial services for Ghanaian communities." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <header
        className="relative h-[75vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-green-800/70" />
        <div className="container-x relative z-10 flex h-full items-center">
          <div className="max-w-4xl text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              Trusted since 2024
            </div>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
              Welcome to <span className="text-gold">St. Margaret Co-operative</span>
              <br />Savings and Development Society.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90">
              From the farm to the city — grow your money, fund your dreams, and bank with people who care.
            </p>
          </div>
        </div>
      </header>

      <Section title="Our impact in numbers">
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
    </>
  );
}
