import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { bank } from "@/lib/site-data";
import { Button } from "@/components/ui/button";

export function FloatingWidgets() {
  const [showTop, setShowTop] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("akrb-cookies");
    if (!consent) {
      const t = setTimeout(() => setCookieOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("akrb-cookies", "accepted");
    setCookieOpen(false);
  };

  return (
    <>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${bank.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-110 transition-transform animate-float"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
      </a>

      {/* Scroll to top */}
      <button
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full gradient-primary text-primary-foreground shadow-elegant transition-all ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* Cookie consent */}
      {cookieOpen && (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border bg-card p-5 shadow-elegant animate-fade-in md:left-6 md:right-auto md:bottom-6 md:mx-0">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🍪</div>
            <div className="flex-1">
              <p className="font-semibold">We value your privacy</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience and analyze traffic. By
                clicking "Accept", you consent to our use of cookies.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" onClick={acceptCookies} className="rounded-full gradient-primary">
                  Accept all
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={acceptCookies}
                  className="rounded-full"
                >
                  Necessary only
                </Button>
              </div>
            </div>
            <button
              onClick={() => setCookieOpen(false)}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
