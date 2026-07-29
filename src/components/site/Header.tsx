import { Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Search, Moon, Sun, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
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
  { to: "/products", label: "Products & Services" },
  { to: "/about", label: "About Us" },
  { to: "/branches", label: "MRB Branches" },
  { to: "/news", label: "Resources" },
  { to: "/contact", label: "Account Opening" },
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-soft backdrop-blur"
          : "bg-white/95"
      }`}
    >
      <div className="border-b border-slate-200/90 bg-[#ecf6e9] text-slate-700">
        <div className="container-x flex h-11 items-center justify-between gap-4 text-xs uppercase tracking-[0.2em] text-slate-700">
          <div className="flex items-center gap-6">
            <a href="/news" className="transition hover:text-primary">Annual Reports</a>
            <a href="/news" className="transition hover:text-primary">Public Notices</a>
            <a href="/contact" className="transition hover:text-primary">Contact Us</a>
          </div>
          <div className="flex items-center gap-4 text-slate-700">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="transition hover:text-primary"><Facebook className="h-4 w-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="transition hover:text-primary"><Twitter className="h-4 w-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-primary"><Linkedin className="h-4 w-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="transition hover:text-primary"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="container-x flex h-24 items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/"
            className="flex shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white p-2"
          >
            <img
              src={logo}
              alt="Mumuadu Rural Bank logo"
              className="h-14 w-14 rounded-xl object-contain"
            />
          </Link>
          <div className="min-w-0 flex flex-col justify-center text-left">
            <div className="truncate text-base font-black tracking-tight text-slate-900 md:text-lg">
              {bank.name}
            </div>
            <div className="truncate text-[11px] uppercase tracking-[0.25em] text-slate-500 opacity-90 md:text-xs">
              {bank.subtitle || bank.tagline}
            </div>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center md:flex">
          <div className="flex items-center gap-12 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
            <NavItem to="/products">Products & Services</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/branches">MRB Branches</NavItem>
            <NavItem to="/news">Resources</NavItem>
            <NavItem to="/contact">Account Opening</NavItem>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="lg"
            className="hidden rounded-full bg-gradient-to-r from-[#d7c03a] via-[#a2c342] to-[#1f8a3d] px-7 py-3 text-sm font-semibold uppercase text-white shadow-elegant transition hover:opacity-95 md:inline-flex"
          >
            <Link to="/contact">Get in Touch</Link>
          </Button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border md:hidden"
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
