'use client';

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import CarCard from "@/components/cards/CarCard";
import { cars, uniqueBrands, years, minPrice, maxPrice, type StockStatus } from "@/data/cars";

const Catalog = () => {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string>("All");
  const [year, setYear] = useState<string>("All");
  const [status, setStatus] = useState<StockStatus | "All">("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [sort, setSort] = useState<string>("price-asc");

  const filtered = useMemo(() => {
    let list = cars.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || `${c.brand} ${c.model}`.toLowerCase().includes(q);
      const matchesBrand = brand === "All" || c.brand === brand;
      const matchesYear = year === "All" || c.year === Number(year);
      const matchesStatus = status === "All" || c.stockStatus === status;
      const matchesPrice = c.pricePerDay >= priceRange[0] && c.pricePerDay <= priceRange[1];
      return matchesQuery && matchesBrand && matchesYear && matchesStatus && matchesPrice;
    });

    switch (sort) {
      case "price-desc":
        list = list.sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case "year-asc":
        list = list.sort((a, b) => a.year - b.year); break;
      case "year-desc":
        list = list.sort((a, b) => b.year - a.year); break;
      default:
        list = list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    }
    return list;
  }, [query, brand, year, status, priceRange, sort]);

  const resetFilters = () => {
    setQuery(""); setBrand("All"); setYear("All"); setStatus("All"); setPriceRange([minPrice, maxPrice]); setSort("price-asc");
  };

  return (
    <div className="min-h-screen">
      <header className="container mx-auto px-4 pt-10 pb-6">
        <h1 className="font-display text-3xl md:text-4xl mb-2">Luxury Car Catalog</h1>
        <p className="text-muted-foreground">Search and filter our fleet to find your perfect drive.</p>
      </header>
      <section className="container mx-auto px-4 pb-10">
      <div className="surface p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="text-sm text-muted-foreground">Search</label>
              <Input placeholder="Brand or model" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Brand</label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {uniqueBrands.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Year</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Status</label>
              <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 flex gap-3">
              <Button variant="hero" onClick={resetFilters} className="w-full sm:w-auto">Reset</Button>
              <Button variant="premium" className="w-full sm:w-auto">Search</Button>
            </div>

            
          </div>

          <div className="mt-4">
            <p className="text-sm text-muted-foreground">Showing {filtered.length} of {cars.length} vehicles</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No cars match your criteria.</p>
            <Button variant="hero" onClick={resetFilters} className="mt-4">Reset Filters</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Catalog;
