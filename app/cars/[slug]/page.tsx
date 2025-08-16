'use client';

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCarBySlug, getRelatedCars } from "@/data/cars";
import CarCard from "@/components/cards/CarCard";
import BookingModal from "@/components/BookingModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CarDetailsPage() {
  const { slug } = useParams();
  const carSlug = Array.isArray(slug) ? slug[0] : slug;
  const car = carSlug ? getCarBySlug(carSlug) : undefined;
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-3xl mb-4">Car Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't locate the requested vehicle.</p>
        <Button asChild variant="hero"><Link href="/catalog">Back to Catalog</Link></Button>
      </div>
    );
  }

  const related = getRelatedCars(car);

  return (
    <div>
      <section className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="surface overflow-hidden rounded-xl">
            {car.images.length > 1 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {car.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${car.brand} ${car.model} ${car.year} - Image ${index + 1}`} 
                          className="w-full h-full object-cover" 
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            ) : (
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={car.images[0]} 
                  alt={`${car.brand} ${car.model} ${car.year} interior and exterior`} 
                  className="w-full h-full object-cover" 
                  loading="eager"
                />
              </div>
            )}
          </div>

          <div>
            <h1 className="font-display text-3xl md:text-4xl mb-2">{car.brand} {car.model}</h1>
            <p className="text-muted-foreground mb-6">{car.year} • {car.stockStatus}</p>

            <div className="surface p-4 md:p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">From</div>
                  <div className="text-2xl font-semibold">${car.pricePerDay}/day</div>
                </div>
                <Button 
                  variant="premium" 
                  size="lg"
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Now
                </Button>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-xl mb-3">Key Specifications</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <li>Brand: <span className="text-foreground">{car.brand}</span></li>
                <li>Model: <span className="text-foreground">{car.model}</span></li>
                <li>Year: <span className="text-foreground">{car.year}</span></li>
                <li>Status: <span className="text-foreground">{car.stockStatus}</span></li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-display text-xl mb-3">Luxury Features</h2>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {car.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container mx-auto px-4 pb-16">
          <h2 className="font-display text-2xl mb-6">Related Cars</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => <CarCard key={c.id} car={c} />)}
          </div>
        </section>
      )}

      {/* Booking Modal */}
      <BookingModal 
        car={car}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
};