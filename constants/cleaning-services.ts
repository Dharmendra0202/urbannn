import { CleaningServiceSlug } from "@/constants/cleaning-details";

export const cleaningServices = [
  {
    id: "cl1",
    name: "Intense Bathroom Cleaning",
    price: 2499,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "intense-bathroom",
  },
  {
    id: "cl2",
    name: "Pest Control Service",
    price: 999,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "pest-control",
  },
  {
    id: "cl3",
    name: "Apartment Pest Control",
    price: 1549,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "apartment-pest",
  },
  {
    id: "cl4",
    name: "Bathroom Deep Cleaning",
    price: 399,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "bathroom-deep",
  },
  {
    id: "cl5",
    name: "Mattress Cleaning",
    price: 399,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "mattress-cleaning",
  },
  {
    id: "cl6",
    name: "Fridge Cleaning",
    price: 399,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/5824884/pexels-photo-5824884.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "fridge-cleaning",
  },
  {
    id: "cl7",
    name: "Carpet Cleaning",
    price: 399,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "carpet-cleaning",
  },
  {
    id: "cl8",
    name: "Laundry & Ironing",
    price: 249,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "laundry",
  },
] as const;

export const cleaningRouteMap: Record<CleaningServiceSlug, string> = {
  "intense-bathroom": "/cleaning/intense-bathroom",
  "pest-control": "/cleaning/pest-control",
  "apartment-pest": "/cleaning/apartment-pest",
  "bathroom-deep": "/cleaning/bathroom-deep",
  "mattress-cleaning": "/cleaning/mattress-cleaning",
  "fridge-cleaning": "/cleaning/fridge-cleaning",
  "carpet-cleaning": "/cleaning/carpet-cleaning",
  laundry: "/cleaning/laundry",
};

export const getCleaningRoute = (slug: CleaningServiceSlug): string =>
  cleaningRouteMap[slug] ?? "/cleaning";
