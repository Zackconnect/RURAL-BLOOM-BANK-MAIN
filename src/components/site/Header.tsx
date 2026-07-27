import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Search, Moon, Sun } from "lucide-react";
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
  { to: "/gallery", label: "Gallery" },
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
        scrolled
          ? "glass shadow-soft"
          : "bg-gradient-to-r from-primary-dark via-primary to-gold/30 text-primary-foreground"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-2 md:h-20 md:gap-4">
        <div className="flex items-center gap-3 min-w-0 max-w-[260px]">
          <Link
            to="/"
            className="flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/10 p-2"
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
              className="h-10 w-10 rounded-xl object-contain"
            />
          </Link>
          <div className="min-w-0 flex flex-col justify-center text-left">
            <div className="truncate text-sm font-extrabold leading-tight tracking-tight text-white md:text-sm lg:text-base">
              {bank.shortName || bank.name}
            </div>
            <div className="truncate text-[10px] uppercase tracking-widest text-gold-foreground opacity-90 md:text-[11px] lg:text-[12px]">
              {bank.subtitle || bank.tagline}
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
            <button
            aria-label="Search"
            className="hidden sm:grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggleDark}
            className="hidden sm:grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 hover:bg-white/20"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button
            asChild
            size="lg"
            className="hidden sm:inline-flex rounded-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-95 hover:shadow-lg transition-all sm:px-4 sm:py-2 md:px-5 md:py-2"
          >
            <Link to="/contact">Open Account</Link>
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="border-t bg-primary/95 animate-fade-in">
          <div className="container-x flex flex-col py-4 text-primary-foreground">
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
              <Link to="/accounts" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent">Accounts</Link>
              <Link to="/products" onClick={() => setOpen(false)} className="mt-2 block rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent">Products & Services</Link>
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

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground md:px-4 md:py-2 md:text-sm"
      activeProps={{ className: "text-primary" }}
      activeOptions={{ exact: to === "/" }}
    >
      {children}
    </Link>
  );
}
