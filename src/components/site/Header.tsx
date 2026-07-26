import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Search, Moon, Sun, Home, Info, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bank } from "@/lib/site-data";
import logo from "@/routes/logo.svg.jpeg";

const productLinks = [
  { to: "/savings", label: "Savings Accounts" },
  { to: "/current-accounts", label: "Current Accounts" },
  { to: "/abofra-pa", label: "Abofra Pa Account" },
  { to: "/loans", label: "Loans" },
  { to: "/investments", label: "Investment Products" },
  { to: "/digital-banking", label: "Digital Banking" },
] as const;

const accountLinks = [
  { to: "/current-accounts", label: "Current account" },
  { to: "/susu-account", label: "Susu account" },
  { to: "/savings", label: "Savings account" },
  { to: "/afihyia-pa", label: "Afihyia pa account" },
  { to: "/abofra-pa", label: "Abofra pa account" },
] as const;

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/branches", label: "Branches" },
  { to: "/news", label: "News" },
  { to: "/careers", label: "Careers" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const logoClickRef = useRef({ count: 0, timer: 0 } as { count: number; timer: number });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("akrb-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("akrb-theme", next ? "dark" : "light");
  };

  const showAdmin =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || ((import.meta as any)?.env?.VITE_SHOW_ADMIN === "true"));

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 overflow-x-hidden ${
        scrolled ? "glass shadow-soft" : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      {/* Top utility bar (pale green) */}
      <div className="hidden md:block bg-[#eaf6ec] text-emerald-800 text-sm">
        <div className="container-x flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href="/annual-reports" className="hover:underline">Annual Reports</a>
            <a href="/public-notices" className="hover:underline">Public Notices</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="facebook" className="text-emerald-600 hover:text-emerald-800">f</a>
            <a href="#" aria-label="twitter" className="text-emerald-600 hover:text-emerald-800">t</a>
            <a href="#" aria-label="linkedin" className="text-emerald-600 hover:text-emerald-800">in</a>
          </div>
        </div>
      </div>

      {/* Thin dark-green strip under utility bar (icon-only) */}
      <div className="hidden md:block bg-emerald-800 text-white text-sm">
        <div className="container-x flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <a href="/" aria-label="Home" className="p-2 rounded hover:bg-emerald-700">
              <Home className="h-4 w-4" />
            </a>
            <a href="/about" aria-label="About" className="p-2 rounded hover:bg-emerald-700">
              <Info className="h-4 w-4" />
            </a>
            <a href="/accounts" aria-label="Accounts" className="p-2 rounded hover:bg-emerald-700">
              <Users className="h-4 w-4" />
            </a>
          </div>
          <div className="text-sm">Mon–Fri 8:30am–4pm</div>
        </div>
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          onClick={(e) => {
            // Triple-click secret: three quick clicks on the logo navigates to /admin
            const ref = logoClickRef.current;
            ref.count += 1;
            if (ref.timer) window.clearTimeout(ref.timer);
            ref.timer = window.setTimeout(() => {
              ref.count = 0;
              ref.timer = 0;
            }, 700);
            if (ref.count >= 3) {
              ref.count = 0;
              if (ref.timer) {
                window.clearTimeout(ref.timer);
                ref.timer = 0;
              }
              e.preventDefault();
              window.location.href = "/admin";
            }
          }}
        >
          <img
            src={logo}
            alt="St. Margaret Co-operative logo"
            className="h-12 w-12 rounded-xl border border-white/10 bg-white/10 object-contain"
          />
          <div className="leading-tight">
            <div className="text-base font-extrabold tracking-tight md:text-lg">
              {bank.name}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Est. 2024
            </div>
          </div>
        </Link>

        {/* Left: logo + nav (left-aligned) */}
        <div className="flex items-center gap-6">
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="St. Margaret Co-operative logo"
                className="h-12 w-12 rounded-xl border border-white/10 bg-white/10 object-contain"
              />
            </Link>
          </div>
          <nav className="hidden lg:flex items-center gap-6 flex-wrap">
            {/* Primary links */}
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/accounts">Accounts</NavItem>

            {/* Accounts dropdown (kept) */}
            <div className="group relative">
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Accounts <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border bg-popover p-2 shadow-elegant">
                  {accountLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block rounded-xl px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Products dropdown (kept) */}
            <div className="group relative">
              <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                Products <ChevronDown className="h-4 w-4" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <div className="rounded-2xl border bg-popover p-2 shadow-elegant">
                  {productLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="block rounded-xl px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional links hidden until xl; included in More menu on smaller widths */}
            <NavItem to="/branches" className="hidden xl:inline-flex">Branches</NavItem>
            <NavItem to="/news" className="hidden xl:inline-flex">News</NavItem>
            <NavItem to="/careers" className="hidden xl:inline-flex">Careers</NavItem>
            <NavItem to="/faqs" className="hidden xl:inline-flex">FAQs</NavItem>
            <NavItem to="/contact" className="hidden xl:inline-flex">Contact</NavItem>

            {/* More menu for lg..xl */}
            <div className="relative xl:hidden">
              <button className="flex items-center gap-2 rounded-full px-3 py-2 text-sm bg-transparent border" aria-haspopup="true">
                More <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute right-0 mt-2 w-44 rounded-lg border bg-popover shadow-elegant">
                <Link to="/branches" className="block px-3 py-2 text-sm hover:bg-accent">Branches</Link>
                <Link to="/news" className="block px-3 py-2 text-sm hover:bg-accent">News</Link>
                <Link to="/careers" className="block px-3 py-2 text-sm hover:bg-accent">Careers</Link>
                <Link to="/faqs" className="block px-3 py-2 text-sm hover:bg-accent">FAQs</Link>
                <Link to="/contact" className="block px-3 py-2 text-sm hover:bg-accent">Contact</Link>
              </div>
            </div>
            {showAdmin ? <NavItem to="/admin">Admin</NavItem> : null}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            className="hidden md:grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-accent"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggleDark}
            className="hidden md:grid h-10 w-10 place-items-center rounded-full text-foreground/70 hover:bg-accent"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button
            asChild
            size="lg"
            className="hidden md:inline-flex rounded-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-95 hover:shadow-lg transition-all"
          >
            <Link to="/contact">Open Account</Link>
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="lg:hidden border-t bg-background animate-fade-in">
          <div className="container-x flex flex-col py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 border-t pt-2">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Accounts
              </div>
              {accountLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 border-t pt-2">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Products
              </div>
              {productLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm hover:bg-accent"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Button
              asChild
              className="mt-3 w-full rounded-full gradient-primary text-primary-foreground"
            >
              <Link to="/contact" onClick={() => setOpen(false)}>
                Open Account
              </Link>
            </Button>
            <div className="mt-3 border-t pt-3 px-3">
              <a href={`tel:${bank.phone}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                📞 {bank.phone}
              </a>
              <a href={`mailto:${bank.email}`} className="block rounded-lg px-3 py-2 text-sm hover:bg-accent">
                ✉ {bank.email}
              </a>
              <div className="mt-2 text-sm text-muted-foreground">Mon–Fri 8:30am–4pm</div>
            </div>
            <button
              onClick={toggleDark}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {dark ? "Light mode" : "Dark mode"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) {
  const base = "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground";
  return (
    <Link
      to={to}
      className={`${base} ${className ?? ""}`}
      activeProps={{ className: "text-primary" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}
