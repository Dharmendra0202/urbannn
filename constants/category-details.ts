import { Image } from "react-native";

const resolveAssetUri = (assetModule: number) => Image.resolveAssetSource(assetModule)?.uri ?? "";

export type CategoryGallerySlide = {
  id: string;
  image: string;
  title: string;
  subtitle: string;
};

type CategoryGallerySeed = Omit<CategoryGallerySlide, "image">;

const withImage = (image: string, items: CategoryGallerySeed[]): CategoryGallerySlide[] =>
  items.map((item) => ({ ...item, image }));

export type CategoryPackage = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  badge?: string;
};

export type CategoryAddon = {
  id: string;
  label: string;
  price: number;
};

export type CategoryFaq = {
  id: string;
  question: string;
  answer: string;
};

export type CategoryDetail = {
  title: string;
  subtitle: string;
  heroImage: string;
  heroGradient: [string, string];
  offerLabel: string;
  rating: string;
  completedJobs: string;
  responseTime: string;
  startPrice: number;
  overview: string;
  checklist: string[];
  productHighlights: string[];
  gallery: CategoryGallerySlide[];
  processSteps: string[];
  packages: CategoryPackage[];
  addOns?: CategoryAddon[];
  faqs: CategoryFaq[];
  serviceNote: string;
};

export type CategorySlug =
  | "home-cleaning"
  | "kitchen-cleaning"
  | "bathroom-cleaning";

const categoryImages = {
  homeCleaning: resolveAssetUri(require("../assets/images/home-deeep-cleaning.jpg")),
  kitchenCleaning: resolveAssetUri(require("../assets/images/kitchen-cleaning.jpg")),
  bathroomCleaning: resolveAssetUri(require("../assets/images/bathroom-cleaning.jpg")),
} as const;

export const categoryDetails: Record<CategorySlug, CategoryDetail> = {
  "home-cleaning": {
    title: "Full Home Cleaning",
    subtitle: "Deep hygiene service for living areas, bedrooms, and utility zones",
    heroImage: categoryImages.homeCleaning,
    heroGradient: ["#14532D", "#0E7490"],
    offerLabel: "Whole Home Coverage",
    rating: "4.8",
    completedJobs: "27K+ Homes",
    responseTime: "Same-day slots",
    startPrice: 1499,
    overview:
      "This service is designed for complete home refresh with focused attention on high-touch surfaces, dust layers, floor corners, and utility points.",
    checklist: [
      "Bedroom and living room dust removal",
      "Floor machine scrub and mop finish",
      "Window panel and switchboard wipe",
      "Kitchen exterior surface cleaning",
      "Bathroom quick disinfection pass",
    ],
    productHighlights: [
      "Eco-safe multipurpose cleaner",
      "High-absorb microfiber cloth",
      "Floor scrub machine",
      "Anti-bacterial touch-surface spray",
      "Corner detailing brush kit",
    ],
    gallery: withImage(categoryImages.homeCleaning, [
      {
        id: "hc-g1",
        title: "Living Area Reset",
        subtitle: "Floor and furniture edge detailing",
      },
      {
        id: "hc-g2",
        title: "Wet Zone Hygiene",
        subtitle: "Bathroom and wash area refresh",
      },
      {
        id: "hc-g3",
        title: "Bedroom Dust Control",
        subtitle: "Corner and under-bed cleaning",
      },
    ]),
    processSteps: [
      "Room-wise inspection and plan setup",
      "Dry dust and high-touch cleaning",
      "Wet cleaning and machine pass",
      "Quality check with customer",
    ],
    packages: [
      {
        id: "hc-p1",
        name: "1-2 BHK Deep Clean",
        price: 1499,
        duration: "2.5 hrs",
        description: "Balanced deep cleaning for compact and medium homes.",
      },
      {
        id: "hc-p2",
        name: "3+ BHK Deep Clean",
        price: 2499,
        duration: "4 hrs",
        description: "Extended team and coverage for larger homes.",
        badge: "Most Booked",
      },
    ],
    addOns: [
      { id: "hc-a1", label: "Balcony cleaning", price: 249 },
      { id: "hc-a2", label: "Sofa vacuum pass", price: 299 },
    ],
    faqs: [
      {
        id: "hc-f1",
        question: "Do you move heavy furniture?",
        answer:
          "Light movable items are shifted for cleaning. Heavy furniture is cleaned around unless safe movement is possible.",
      },
      {
        id: "hc-f2",
        question: "Are chemicals included in the package?",
        answer:
          "Yes, professional-grade consumables for standard surfaces are included.",
      },
    ],
    serviceNote:
      "For best results, keep fragile decor items secured before technician arrival.",
  },
  "kitchen-cleaning": {
    title: "Kitchen Deep Cleaning",
    subtitle: "Degreasing, scrub treatment, and hygiene restoration for cooking areas",
    heroImage: categoryImages.kitchenCleaning,
    heroGradient: ["#9A3412", "#EA580C"],
    offerLabel: "Oil and Grime Removal",
    rating: "4.7",
    completedJobs: "19K+ Kitchens",
    responseTime: "45 min avg response",
    startPrice: 799,
    overview:
      "A focused kitchen package for grease-heavy surfaces, stove area, sink edges, and cabinet exteriors using degreasing and detail brushes.",
    checklist: [
      "Stove and counter degreasing",
      "Chimney outer body and filter wipe",
      "Sink and backsplash scrub",
      "Cabinet exterior cleaning",
      "Floor corner grease treatment",
    ],
    productHighlights: [
      "Kitchen-safe degreasing liquid",
      "Food-contact microfiber wipes",
      "Nylon detail brush set",
      "Stainless steel polish wipe",
      "Odor reset spray",
    ],
    gallery: withImage(categoryImages.kitchenCleaning, [
      {
        id: "kc-g1",
        title: "Counter Degreasing",
        subtitle: "Oil film reduction from prep surfaces",
      },
      {
        id: "kc-g2",
        title: "Appliance Exterior Care",
        subtitle: "Fridge and microwave outer detailing",
      },
      {
        id: "kc-g3",
        title: "Sink and Tile Refresh",
        subtitle: "Backsplash and wet-zone cleaning",
      },
    ]),
    processSteps: [
      "Oil concentration check and prep",
      "Degreasing cycle and scrub pass",
      "Appliance and sink detailing",
      "Final wipe and hygiene check",
    ],
    packages: [
      {
        id: "kc-p1",
        name: "Standard Kitchen Care",
        price: 799,
        duration: "90 mins",
        description: "Ideal for regular monthly kitchen cleanup.",
      },
      {
        id: "kc-p2",
        name: "Intensive Kitchen Restore",
        price: 1299,
        duration: "140 mins",
        description: "Stronger treatment for heavy grease buildup.",
        badge: "Recommended",
      },
    ],
    addOns: [
      { id: "kc-a1", label: "Inside fridge cleaning", price: 150 },
      { id: "kc-a2", label: "Inside microwave cleaning", price: 100 },
      { id: "kc-a3", label: "Cabinet interior cleaning", price: 250 },
    ],
    faqs: [
      {
        id: "kc-f1",
        question: "Do you clean inside appliances in base package?",
        answer:
          "Inside cleaning for fridge and microwave is treated as add-on for better pricing control.",
      },
      {
        id: "kc-f2",
        question: "Will this remove old yellow grease marks?",
        answer:
          "Most marks reduce significantly. Long-standing discoloration can require repeated sessions.",
      },
    ],
    serviceNote:
      "Please switch off sensitive appliances 15 minutes before service for safer detailing.",
  },
  "bathroom-cleaning": {
    title: "Bathroom Cleaning",
    subtitle: "Tile, fixture, and commode cleaning with quick disinfect finish",
    heroImage: categoryImages.bathroomCleaning,
    heroGradient: ["#1D4ED8", "#06B6D4"],
    offerLabel: "Quick Hygiene Package",
    rating: "4.6",
    completedJobs: "31K+ Bookings",
    responseTime: "35 min avg response",
    startPrice: 699,
    overview:
      "A focused bathroom service for stain handling, fixture detailing, and hygiene reset suitable for routine monthly maintenance.",
    checklist: [
      "Commode and sink disinfection",
      "Tile and grout cleaning",
      "Mirror and chrome polish",
      "Drain edge stain removal",
      "Final odor-neutral pass",
    ],
    productHighlights: [
      "Mild descaling solution",
      "Low-abrasion tile scrub pad",
      "Chrome-safe polish cloth",
      "Disinfectant spray finish",
      "Drainline detailing brush",
    ],
    gallery: withImage(categoryImages.bathroomCleaning, [
      {
        id: "bc-g1",
        title: "Tile Recovery",
        subtitle: "Scale and stain reduction on wall/floor",
      },
      {
        id: "bc-g2",
        title: "Fixture Shine",
        subtitle: "Basin and tap detailing finish",
      },
      {
        id: "bc-g3",
        title: "Disinfect Pass",
        subtitle: "Final hygiene spray across touch points",
      },
    ]),
    processSteps: [
      "Stain check and descaling prep",
      "Surface scrub and fixture polish",
      "Disinfect and dry wipe",
      "Final walkthrough",
    ],
    packages: [
      {
        id: "bc-p1",
        name: "Single Bathroom Clean",
        price: 699,
        duration: "60 mins",
        description: "Routine deep cleaning for one bathroom.",
      },
      {
        id: "bc-p2",
        name: "Dual Bathroom Clean",
        price: 1199,
        duration: "100 mins",
        description: "Optimized pricing for 2 bathrooms in one slot.",
        badge: "Best Value",
      },
    ],
    addOns: [
      { id: "bc-a1", label: "Exhaust fan detailing", price: 120 },
      { id: "bc-a2", label: "Shower glass polish", price: 180 },
    ],
    faqs: [
      {
        id: "bc-f1",
        question: "Do you bring all cleaning materials?",
        answer:
          "Yes, standard professional consumables and tools are brought by the assigned team.",
      },
      {
        id: "bc-f2",
        question: "Can this remove hard-water scaling?",
        answer:
          "Yes, moderate scaling is treated in this service. Severe buildup may need intensive package.",
      },
    ],
    serviceNote:
      "Water availability is required throughout service for rinse and finishing steps.",
  },
};
