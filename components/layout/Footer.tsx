import Link from "next/link";
import Map from "@/components/Map";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative mt-16">
      {/* Gradient background with subtle top fade mask */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 85% 120%, hsl(var(--primary) / 0.18), transparent 60%), linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 55%, hsl(var(--primary) / 0.06) 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Brand and Contacts */}
          <div className="space-y-5">
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                }}
              >
                Mousa Cars
              </span>
            </h2>
            <p className="text-muted-foreground max-w-prose">
              Luxury car rentals across Arabia and Türkiye. Premium service, curated fleet, effortless bookings.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+1234567890" className="hover:underline">
                    +1 (234) 567‑890
                  </a>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:hello@mousacars.com" className="hover:underline">
                    hello@mousacars.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="h-4 w-4" />
                  Daily 09:00–21:00
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="h-4 w-4" />
                  Riyadh • Dubai • Istanbul
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Questions about rental conditions?</p>
                <Link href="/contacts" className="story-link font-medium">
                  Read our rental terms
                </Link>
              </div>
            </div>
          </div>

          {/* Map */}
          <div>
            <Map height="h-64 md:h-72" />
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Mousa Cars. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/catalog" className="hover:underline">
              Browse catalog
            </a>
            <a href="/contacts" className="hover:underline">
              Contact us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
