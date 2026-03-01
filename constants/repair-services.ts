import { imageAssets } from "./image-assets";

export const repairServices = [
  {
    id: "rp1",
    name: "Carpentry Work",
    price: 799,
    rating: 4.8,
    image: imageAssets.carpentryWork,
  },
  {
    id: "rp2",
    name: "Plumbing Fix",
    price: 599,
    rating: 4.7,
    image: imageAssets.plumbingFix,
  },
  {
    id: "rp3",
    name: "Painting Service",
    price: 1999,
    rating: 4.8,
    image: imageAssets.wallPainting,
  },
  {
    id: "rp4",
    name: "Wall Mounting & Drilling",
    price: 499,
    rating: 4.6,
    image: imageAssets.wallDrilling,
  },
  {
    id: "rp5",
    name: "Electrical Installation",
    price: 699,
    rating: 4.8,
    image: imageAssets.acServiceCleaning,
  },
  {
    id: "rp6",
    name: "Curtain & Rod Setup",
    price: 899,
    rating: 4.6,
    image: imageAssets.homeService,
  },
  {
    id: "rp7",
    name: "Door Lock Repair",
    price: 499,
    rating: 4.7,
    image: imageAssets.doorLockRepair,
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
