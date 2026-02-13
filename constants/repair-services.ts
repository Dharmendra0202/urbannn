export const repairServices = [
  {
    id: "rp1",
    name: "Carpentry Work",
    price: 799,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "rp2",
    name: "Plumbing Fix",
    price: 599,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "rp3",
    name: "Painting Service",
    price: 1999,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "rp4",
    name: "Wall Mounting & Drilling",
    price: 499,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "rp5",
    name: "Electrical Installation",
    price: 699,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "rp6",
    name: "Curtain & Rod Setup",
    price: 899,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/6207825/pexels-photo-6207825.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "rp7",
    name: "Door Lock Repair",
    price: 499,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/4792485/pexels-photo-4792485.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const repairRouteMap: Record<string, string> = {
  rp1: "/repair/carpentry",
  rp2: "/repair/plumbing",
  rp3: "/repair/painting",
  rp4: "/repair/wall-mounting",
  rp5: "/repair/electrical-installation",
  rp6: "/repair/curtain-setup",
  rp7: "/repair/door-lock",
};

export const getRepairRoute = (serviceId: string): string =>
  repairRouteMap[serviceId] ?? "/repair";
