'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car } from "@/data/cars";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Card className="surface overflow-hidden hover-scale transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-[16/10] w-full overflow-hidden relative">
          {car.images.length > 1 ? (
            <div className="max-h-[400px] overflow-auto">
              <Carousel opts={{ dragFree: true, skipSnaps: true }} className="w-full group">
                <CarouselContent>
                  {car.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt={`${car.brand} ${car.model} ${car.year} — luxury rental car in catalog - Image ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-150 ease-out"
                        loading={index === 0 ? "eager" : "lazy"}
                        style={{
                          willChange: 'transform',
                          WebkitUserSelect: 'none',
                          userSelect: 'none'
                        }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {/* Показываем стрелки только если больше одной фотографии */}
                {car.images.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>
          ) : (
            <img
              src={car.images[0]}
              alt={`${car.brand} ${car.model} ${car.year} — luxury rental car in catalog`}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                !isMobile ? 'group-hover:scale-[1.03]' : ''
              }`}
              loading="lazy"
              style={{ 
                touchAction: 'pan-y pinch-zoom',
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
            />
          )}
        </div>
        <div className="p-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium leading-snug min-h-[2.75rem] clamp-2">{car.brand} {car.model}</h3>
            <p className="text-sm text-muted-foreground">{car.year} • {car.stockStatus}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">from</div>
            <div className="font-semibold">${car.pricePerDay}/day</div>
          </div>
        </div>
        <div className="px-5 pb-5">
          <Button asChild variant="hero" size="sm">
            <Link href={`/cars/${car.slug}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarCard;