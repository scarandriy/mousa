
export type StockStatus = "In Stock" | "Coming Soon";

export interface Reservation {
  startDate: string; // ISO date string
  endDate: string;   
  customerName: string;
  customerEmail: string;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  stockStatus: StockStatus;
  images: string[]; // Changed from string to string[]
  features: string[];
  reservations: Reservation[];
}

export const cars: Car[] = [
  {
    id: "1",
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2024,
    pricePerDay: 520,
    stockStatus: "In Stock",
    images: [
      "/cars/car-sclass.jpg",
      "/cars/car-7series.jpg",
      "/cars/car-a8.jpg"     
    ],
    features: ["Premium leather", "Executive rear seats", "Burmester audio", "Panoramic roof"],
    slug: "1",
    reservations: [
      {
        startDate: "2025-08-12",
        endDate: "2025-08-18",
        customerName: "Ahmed Al Mansouri",
        customerEmail: "ahmed@example.com"
      },
      {
        startDate: "2025-08-20",
        endDate: "2025-08-28",
        customerName: "Fatima Zahra",
        customerEmail: "fatima@example.com"
      }
    ]
  },
  {
    id: "2",
    brand: "BMW",
    model: "7 Series",
    year: 2023,
    pricePerDay: 480,
    stockStatus: "In Stock",
    images: [
      "/cars/car-7series.jpg",
      "/cars/car-7series.jpg",
      "/cars/car-a8.jpg",
      "/cars/car-7series.jpg"
    ],
    features: ["Massage seats", "Ambient lighting", "Bowers & Wilkins audio", "Driver assistance pro"],
    slug: "2",
    reservations: [
      {
        startDate: "2024-01-20",
        endDate: "2024-01-22",
        customerName: "Mehmet Yılmaz",
        customerEmail: "mehmet@example.com"
      }
    ]
  },
  {
    id: "3",
    brand: "Audi",
    model: "A8",
    year: 2022,
    pricePerDay: 440,
    stockStatus: "In Stock",
    images: [
      "/cars/car-a8.jpg",
      "/cars/car-7series.jpg",
      "/cars/car-a8.jpg",
      "/cars/car-a8.jpg"
    ],
    features: ["Quattro AWD", "Valcona leather", "Matrix LED", "Four-zone climate"],
    slug: "3",
    reservations: []
  },
  {
    id: "4",
    brand: "Lexus",
    model: "LS",
    year: 2023,
    pricePerDay: 420,
    stockStatus: "Coming Soon",
    images: [
      "/cars/car-ls.jpg",
      "/cars/car-7series.jpg",
      "/cars/car-7series.jpg",
      "/cars/car-ls.jpg"
    ],
    features: ["Mark Levinson audio", "Quiet cabin", "Rear ottoman seats", "Advanced safety"],
    slug: "4",
    reservations: []
  },
  {
    id: "5",
    brand: "Range Rover",
    model: "Vogue",
    year: 2024,
    pricePerDay: 560,
    stockStatus: "In Stock",
    images: [
      "/cars/car-vogue.jpg",
      "/cars/car-vogue.jpg",
      "/cars/car-7series.jpg",
      "/cars/car-7series.jpg"
    ],
    features: ["Terrain Response", "Meridian audio", "Windsor leather", "All-terrain capability"],
    slug: "5",
    reservations: []
  },
  {
    id: "6",
    brand: "Porsche",
    model: "Panamera",
    year: 2023,
    pricePerDay: 580,
    stockStatus: "In Stock",
    images: [
      "/cars/car-cayenne.jpg",
      "/cars/car-vogue.jpg",
      "/cars/car-cayenne.jpg",
      "/cars/car-7series.jpg"
    ],
    features: ["Sport Chrono", "PASM suspension", "Burmester audio", "PDK transmission"],
    slug: "6",
    reservations: []
  }
];

export const getCarBySlug = (slug: string) => cars.find((c) => c.slug === slug);
export const getRelatedCars = (car: Car) => cars.filter((c) => c.id !== car.id && (c.brand === car.brand || Math.abs(c.pricePerDay - car.pricePerDay) <= 80)).slice(0, 3);

// Utility functions for reservation management
export const isDateRangeAvailable = (car: Car, startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return !car.reservations.some(reservation => {
    const reservationStart = new Date(reservation.startDate);
    const reservationEnd = new Date(reservation.endDate);
    
    // Check if there's any overlap
    return (start <= reservationEnd && end >= reservationStart);
  });
};

export const getAvailableDates = (car: Car, startDate: Date, endDate: Date): Date[] => {
  const availableDates: Date[] = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    const dateStr = current.toISOString().split('T')[0];
    if (isDateRangeAvailable(car, dateStr, dateStr)) {
      availableDates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  
  return availableDates;
};

export const addReservation = (carId: string, reservation: Reservation): Car | null => {
  const carIndex = cars.findIndex(c => c.id === carId);
  if (carIndex === -1) return null;
  
  // Check if the date range is available
  if (!isDateRangeAvailable(cars[carIndex], reservation.startDate, reservation.endDate)) {
    return null;
  }
  
  // Add the reservation
  cars[carIndex].reservations.push(reservation);
  return cars[carIndex];
};

export const uniqueBrands = Array.from(new Set(cars.map((c) => c.brand))).sort();
export const years = Array.from(new Set(cars.map((c) => c.year))).sort((a, b) => b - a);
export const minPrice = Math.min(...cars.map((c) => c.pricePerDay));
export const maxPrice = Math.max(...cars.map((c) => c.pricePerDay));
