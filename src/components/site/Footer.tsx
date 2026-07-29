import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send, Landmark } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addNewsletterSubscriber } from "@/lib/admin";
import { bank } from "@/lib/site-data";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    addNewsletterSubscriber(trimmed);
    toast.success("Thanks! You have been subscribed to our newsletter.");
    setEmail("");
  };

  return (
    <footer className="mt-24 gradient-primary text-primary-foreground">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Company */}
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-foreground/10 backdrop-blur">
              <Landmark className="h-5 w-5" />
            </div>
            <div className="text-lg font-extrabold">
              {bank.name}
            </div>
          </div>
          <p className="mt-4 text-sm opacity-90">
            Empowering communities across Ghana with trusted, modern and inclusive
            banking since 2024.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {[
              ["/about", "About Us"],
              ["/branches", "Branches"],
              ["/news", "News"],
              ["/careers", "Careers"],
              ["/faqs", "FAQs"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider">Products</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-90">
            {[
              ["/savings", "Savings Accounts"],
              ["/current-accounts", "Current Accounts"],
              ["/loans", "Loans"],
              ["/investments", "Investments"],
              ["/digital-banking", "Digital Banking"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider">Newsletter</h4>
          <p className="mt-4 text-sm opacity-90">
            Financial tips and product news, straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="mt-4 flex overflow-hidden rounded-full bg-primary-foreground/10 backdrop-blur">
            <Input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email"
              className="flex-1 border-0 bg-transparent text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-0"
            />
            <Button type="submit" className="rounded-none gradient-gold text-gold-foreground hover:opacity-95">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <ul className="mt-6 space-y-2 text-sm opacity-90">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {bank.phone}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {bank.email}</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> {bank.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs opacity-90 md:flex-row">
          <p>© 2024 {bank.name} All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms of Service</a>
            <a href="#" className="hover:text-gold">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
