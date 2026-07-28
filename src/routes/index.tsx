import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import { ArrowRight, CheckCircle2, Star, Calendar, ChevronRight, Wallet, PiggyBank, TrendingUp, Baby, Download, Smartphone, Apple } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/site/Section";
import { AnimatedCounter } from "@/components/site/Stat";
import { stats, whyUs, savings, loans, digital, investments, testimonials, news, bank } from "@/lib/site-data";
import { getTestimonials } from "@/lib/admin";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "St. Margaret Co-operative Savings and Development Society. — Banking Made Simple for Everyone" },
      { name: "description", content: "Savings, loans, investments and digital banking built for individuals, SMEs and farmers across Ghana." },
      { property: "og:title", content: "St. Margaret Co-operative Savings and Development Society. — Banking Made Simple for Everyone" },
      { property: "og:description", content: "Savings, loans, investments and digital banking built for individuals, SMEs and farmers across Ghana." },
    ],
  }),
  component: Home,
});

function Home() {
  const [testimonialItems, setTestimonialItems] = useState(() => {
    const adminItems = getTestimonials();
    return adminItems.length > 0 ? adminItems : testimonials;
  });

  useEffect(() => {
    const adminItems = getTestimonials();
    setTestimonialItems(adminItems.length > 0 ? adminItems : testimonials);
  }, []);

  const showAdminFromHome =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      import.meta.env.VITE_SHOW_ADMIN === "true");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1600} height={1100} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-primary/40" />
        </div>
        <div className="container-x relative py-20 md:py-32 text-primary-foreground">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Trusted since 2024
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Welcome to <span className="text-gradient-gold">{bank.name}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg opacity-90 md:text-xl">
              From the farm to the city — grow your money, fund your dreams and bank
              on your terms with {bank.name}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full gradient-gold text-gold-foreground shadow-elegant hover:opacity-95">
                <Link to="/contact">Open an Account <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/about">Learn More</Link>
              </Button>
              {showAdminFromHome ? (
                <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-gold/40 text-gold hover:bg-gold/10">
                  <Link to="/admin">Admin Portal</Link>
                </Button>
              ) : null}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur">
                  <div className="text-2xl font-extrabold md:text-3xl text-gold">
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs opacity-90">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS TABS */}
      <Section
        eyebrow="Products & Services"
        title="Everything you need in one bank"
        desc="Personal, business and digital banking products — designed around real Ghanaian lives."
      >
        <Tabs defaultValue="savings" className="mx-auto max-w-6xl">
          <TabsList className="mx-auto mb-8 flex h-auto w-full max-w-3xl flex-wrap justify-center gap-2 rounded-full bg-secondary p-1.5">
            {[
              ["accounts", "Accounts"],
              ["savings", "Savings"],
              ["loans", "Loans"],
              ["invest", "Investments"],
              ["digital", "Digital"],
            ].map(([v, l]) => (
              <TabsTrigger
                key={v}
                value={v}
                className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-elegant px-5 py-2 text-sm font-semibold"
              >
                {l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="savings">
            <ProductGrid items={savings.slice(0, 6).map((p) => ({ icon: p.icon, title: p.name, desc: p.desc, meta: `${p.rate} • Min ${p.min}`, to: "/savings" }))} />
          </TabsContent>
          <TabsContent value="accounts">
            <ProductGrid items={[
              { icon: Wallet, title: 'Current account', desc: 'Fast transactional banking for individuals and businesses.', meta: 'Open now', to: '/current-accounts' },
              { icon: PiggyBank, title: 'Susu account', desc: 'Community savings and rotating contributions.', meta: 'Group based', to: '/susu-account' },
              { icon: PiggyBank, title: 'Savings account', desc: 'Regular, youth and children savings to grow your money.', meta: 'From GHS 5', to: '/savings' },
              { icon: TrendingUp, title: 'Afihyia pa account', desc: 'Family savings plan with seasonal bonuses.', meta: 'Rewards', to: '/afihyia-pa' },
              { icon: Baby, title: 'Abofra pa account', desc: 'Children and youth savings to build early saving habits.', meta: 'Youth focused', to: '/abofra-pa' },
            ]} />
          </TabsContent>
          <TabsContent value="loans">
            <ProductGrid items={loans.slice(0, 6).map((p) => ({ icon: p.icon, title: p.name, desc: p.desc, meta: `Up to ${p.max} • ${p.rate}`, to: "/loans" }))} />
          </TabsContent>
          <TabsContent value="invest">
            <ProductGrid items={investments.map((p) => ({ icon: p.icon, title: p.name, desc: p.desc, meta: `${p.rate} • ${p.tenor}`, to: "/investments" }))} />
          </TabsContent>
          <TabsContent value="digital">
            <ProductGrid items={digital.map((p) => ({ icon: p.icon, title: p.name, desc: p.desc, meta: "Available 24/7", to: "/digital-banking" }))} />
          </TabsContent>
        </Tabs>
      </Section>

      {/* WHY US */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container-x">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mb-3 inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-foreground">
              Why choose us
            </div>
            <h2 className="text-3xl font-extrabold md:text-4xl lg:text-5xl">
              Built on <span className="text-primary">trust</span>, powered by <span className="text-gradient-gold">innovation</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div
                key={w.title}
                className="group relative overflow-hidden rounded-3xl border bg-card p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elegant">
                    <w.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS marquee */}
      <Section
        eyebrow="Testimonials"
        title="Loved by families and businesses across Ghana"
      >
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max gap-6 animate-marquee">
            {[...testimonialItems, ...testimonialItems].map((t, i) => (
              <Card key={i} className="w-[340px] shrink-0 rounded-3xl border p-6 shadow-card">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className={`h-4 w-4 ${k < t.rating ? "fill-current" : "opacity-30"}`} />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                    <img
                      src={t.avatar}
                      alt={`${t.name} avatar`}
                      loading="lazy"
                      className="h-full w-auto max-w-full rounded-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* NEWS */}
      <Section
        eyebrow="Latest news"
        title="Fresh from the newsroom"
        desc="Insights, announcements and community stories."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {news.map((n) => (
            <article key={n.title} className="group overflow-hidden rounded-3xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={n.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {n.date}
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
                <Link to="/news" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  Read more <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* MOBILE APP DOWNLOAD */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-4xl gradient-primary p-8 text-primary-foreground shadow-elegant md:p-12">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-gold-foreground">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-widest">Mobile Banking</div>
                </div>
                <h3 className="text-3xl font-extrabold md:text-4xl">Bank on the go with our mobile app</h3>
                <p className="mt-3 opacity-90">Transfer money, check balances, apply for loans—all from your pocket. Fast, secure, and available 24/7.</p>
                <div className="mt-6 flex flex-wrap gap-2 text-sm opacity-85">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>Real-time notifications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>Bank securely</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>Offline access</span>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-4xl border border-primary/10 bg-background/90 p-6 shadow-card">
                  <div className="grid gap-3">
                    <a
                      href="/app.apk"
                      download
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full gradient-gold text-gold-foreground font-semibold py-3 px-6 shadow-elegant hover:opacity-95 transition-all"
                    >
                      <Download className="h-5 w-5" />
                      <span>Download for Android</span>
                    </a>
                    <a
                      href="https://apps.apple.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-primary/20 bg-white text-primary font-semibold py-3 px-6 shadow-sm hover:bg-primary/5 transition-all"
                    >
                      <Apple className="h-5 w-5" />
                      <span>Download on the App Store</span>
                    </a>
                  </div>
                  <p className="mt-3 text-xs text-primary-foreground/70 text-center">APK file • v1.0 • Compatible with Android 8.0+</p>
                </div>
                <div className="rounded-4xl border border-primary/20 bg-primary/5 p-6 text-center shadow-card">
                  <img
                    src="https://qr1.be/XVMBDS"
                    alt="Download the app QR code"
                    className="mx-auto h-40 w-40 rounded-3xl object-cover"
                  />
                  <p className="mt-4 text-sm font-semibold text-primary">Scan to download the app</p>
                  <a
                    href="https://qr1.be/XVMBDS"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-sm font-semibold text-primary underline"
                  >
                    https://qr1.be/XVMBDS
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-4xl gradient-primary p-10 text-primary-foreground shadow-elegant md:p-16">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/30 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-3xl font-extrabold md:text-4xl">Ready to bank with a difference?</h3>
                <p className="mt-3 opacity-90">Open your account in minutes. No paperwork headaches, no hidden fees.</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button asChild size="lg" className="rounded-full gradient-gold text-gold-foreground">
                  <Link to="/contact">Open Account</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/branches">Find a Branch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ProductGrid({
  items,
}: {
  items: { icon: any; title: string; desc: string; meta: string; to: string }[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <div key={p.title} className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
          <div className="flex items-start justify-between">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground group-hover:gradient-primary group-hover:text-primary-foreground transition-colors">
              <p.icon className="h-5 w-5" />
            </div>
            <div className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-dark">
              {p.meta}
            </div>
          </div>
          <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
          <Link to={p.to} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            Learn more <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  );
}

// Suppress unused warning
void CheckCircle2;
