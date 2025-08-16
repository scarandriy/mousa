import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden backdrop-gradient">
      <img
        src={"/image.png"}
        alt="Elegant Arabian/Turkish family seated in a premium chauffeur-driven car"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl md:text-6xl leading-tight tracking-tight mb-6 animate-fade-in">
            World‑Class Luxury Car Rentals
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl animate-fade-in">
            Serving discerning clients across Arabia and Türkiye with prestige, refinement, and absolute comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
            <Button asChild variant="premium" size="xl">
              <Link href="/contacts" aria-label="Book your luxury car now">Book Now</Link>
            </Button>
            <Button asChild variant="hero" size="xl">
              <Link href="/catalog" aria-label="View our luxury car catalog">View Catalog</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
