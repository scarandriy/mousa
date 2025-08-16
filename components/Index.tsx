import Hero from "@/components/sections/Hero";
import CarCard from "@/components/cards/CarCard";
import { cars } from "@/data/cars";

const Index = () => {
  const recommended = cars.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Local header here for homepage only if needed; global Navbar is in App */}
      <main>
        <Hero />

        <section className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl md:text-3xl mb-6">Recommended Cars</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommended.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
