export const recommendedServices = [
  {
    id: "r1",
    name: "Sofa Cleaning",
    price: 499,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "r2",
    name: "Bathroom Deep Cleaning",
    price: 699,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "r3",
    name: "Pest Control",
    price: 599,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "r4",
    name: "Wall Painting",
    price: 1599,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/3865795/pexels-photo-3865795.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "r5",
    name: "AC Service",
    price: 899,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "r6",
    name: "Carpentry Installation",
    price: 749,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/5691513/pexels-photo-5691513.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "r7",
    name: "TV Wall Mounting",
    price: 699,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/6970069/pexels-photo-6970069.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const recommendedRouteMap: Record<string, string> = {
  r1: "/recommended/sofa-cleaning",
  r2: "/recommended/bathroom-cleaning",
  r3: "/recommended/pest-control",
  r4: "/recommended/wall-painting",
  r5: "/recommended/ac-service",
  r6: "/recommended/carpentry-installation",
  r7: "/recommended/tv-wall-mounting",
};

export const getRecommendedRoute = (serviceId: string): string =>
  recommendedRouteMap[serviceId] ?? "/recommended";
