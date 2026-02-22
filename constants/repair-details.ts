import { Image } from "react-native";

const resolveAssetUri = (assetModule: number) => Image.resolveAssetSource(assetModule)?.uri ?? "";

const repairImages = {
  carpentry: resolveAssetUri(require("../assets/images/carpentry-work.jpg")),
  plumbing: resolveAssetUri(require("../assets/images/plumbing-fix.jpg")),
  painting: resolveAssetUri(require("../assets/images/wall-painting.jpg")),
  wallMounting: resolveAssetUri(require("../assets/images/wall-drilling.jpg")),
  electrical: resolveAssetUri(require("../assets/images/ac-service-cleaning.jpg")),
  curtain: resolveAssetUri(require("../assets/images/home-service.jpg")),
  doorLock: resolveAssetUri(require("../assets/images/door-lock-repair.jpg")),
} as const;

export type RepairGalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

type RepairGallerySeed = Omit<RepairGalleryItem, "image">;

const withImage = (image: string, items: RepairGallerySeed[]): RepairGalleryItem[] =>
  items.map((item) => ({ ...item, image }));

export type RepairPackage = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  badge?: string;
};

export type RepairFaq = {
  id: string;
  question: string;
  answer: string;
};

export type RepairServiceDetail = {
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
  workIncludes: string[];
  requiredItems: string[];
  gallery: RepairGalleryItem[];
  processSteps: string[];
  packages: RepairPackage[];
  faqs: RepairFaq[];
  serviceNote: string;
};

export type RepairServiceSlug =
  | "carpentry"
  | "plumbing"
  | "painting"
  | "wall-mounting"
  | "electrical-installation"
  | "curtain-setup"
  | "door-lock";

export const repairServiceDetails: Record<RepairServiceSlug, RepairServiceDetail> = {
  carpentry: {
    title: "Carpentry Work",
    subtitle: "Accurate fitting, repair, and installation for wooden fixtures",
    heroImage: repairImages.carpentry,
    heroGradient: ["#7C2D12", "#B45309"],
    offerLabel: "Expert Carpenter Slot",
    rating: "4.8",
    completedJobs: "14K+ Jobs",
    responseTime: "45 min avg response",
    startPrice: 799,
    overview:
      "From loose hinges to shelf installations, experienced carpenters handle precision cutting, leveling, and secure fittings.",
    workIncludes: [
      "Furniture repair and alignment",
      "Door and window fitting adjustments",
      "Drawer channel and hinge setup",
      "Wall shelf and bracket installation",
      "Minor polish and finish correction",
    ],
    requiredItems: [
      "Drill machine",
      "Screw set and wall plugs",
      "Wood filler or putty",
      "Measuring tape",
      "Spirit level",
    ],
    gallery: withImage(repairImages.carpentry, [
      {
        id: "cp-1",
        title: "Cabinet Hinge Repair",
        subtitle: "Smooth closing and alignment correction",
      },
      {
        id: "cp-2",
        title: "Wall Shelf Setup",
        subtitle: "Secure installation with proper anchors",
      },
      {
        id: "cp-3",
        title: "Drawer Channel Fitting",
        subtitle: "Noise-free slide movement",
      },
    ]),
    processSteps: [
      "Issue assessment and measurements",
      "Tool and material prep",
      "Repair or fitting execution",
      "Finishing and safety check",
    ],
    packages: [
      {
        id: "cp-p1",
        name: "Single Carpentry Task",
        price: 799,
        duration: "60 mins",
        description: "Best for one focused repair or installation.",
      },
      {
        id: "cp-p2",
        name: "Multi-Task Carpentry Visit",
        price: 1499,
        duration: "120 mins",
        description: "Great for 3-4 related jobs in one visit.",
        badge: "Best Value",
      },
    ],
    faqs: [
      {
        id: "cp-f1",
        question: "Can old furniture be repaired at home?",
        answer:
          "Yes, common issues like loose joints, hinges, and channels are repaired on-site in most cases.",
      },
      {
        id: "cp-f2",
        question: "Are hardware consumables included?",
        answer:
          "Basic fitting support is included; specialty hardware is charged separately if required.",
      },
    ],
    serviceNote: "Warranty support available on workmanship as per package terms.",
  },
  plumbing: {
    title: "Plumbing Fix",
    subtitle: "Leak control, fixture installation, and flow correction",
    heroImage: repairImages.plumbing,
    heroGradient: ["#1D4ED8", "#0EA5E9"],
    offerLabel: "Same Day Plumbing",
    rating: "4.7",
    completedJobs: "22K+ Jobs",
    responseTime: "35 min avg response",
    startPrice: 599,
    overview:
      "Quick and reliable plumbing services for taps, drains, leaks, and water-pressure issues with proper testing.",
    workIncludes: [
      "Tap and faucet repair/replacement",
      "Leak fixing for joints and pipelines",
      "Flush tank troubleshooting",
      "Drain and sink blockage inspection",
      "Water pressure balancing checks",
    ],
    requiredItems: [
      "Pipe wrench",
      "Thread seal tape",
      "Sealant and washers",
      "Replacement tap/spare parts",
    ],
    gallery: withImage(repairImages.plumbing, [
      {
        id: "pl-1",
        title: "Leak Rectification",
        subtitle: "Joint sealing and pressure test",
      },
      {
        id: "pl-2",
        title: "Tap Installation",
        subtitle: "New fixture fit with no seepage",
      },
      {
        id: "pl-3",
        title: "Drainline Cleanup",
        subtitle: "Flow restoration and trap cleanup",
      },
    ]),
    processSteps: [
      "Site inspection and fault detection",
      "Part/tool matching and setup",
      "Repair or replacement",
      "Leak and pressure verification",
    ],
    packages: [
      {
        id: "pl-p1",
        name: "Quick Plumbing Visit",
        price: 599,
        duration: "45 mins",
        description: "One issue diagnosis + repair attempt in a single visit.",
      },
      {
        id: "pl-p2",
        name: "Plumbing Pro Visit",
        price: 1099,
        duration: "90 mins",
        description: "Covers multiple fixture issues with complete checks.",
        badge: "Most Booked",
      },
    ],
    faqs: [
      {
        id: "pl-f1",
        question: "Do you provide replacement taps/pipes?",
        answer:
          "Yes, standard spares can be arranged on request and billed separately based on brand and size.",
      },
      {
        id: "pl-f2",
        question: "Will you check hidden leakage signs?",
        answer:
          "Yes, technicians inspect visible damp zones and advise if advanced leak detection is needed.",
      },
    ],
    serviceNote: "Emergency slots may be available based on partner availability.",
  },
  painting: {
    title: "Painting Service",
    subtitle: "Interior wall repainting, touch-ups, and texture finishes",
    heroImage: repairImages.painting,
    heroGradient: ["#DB2777", "#EF4444"],
    offerLabel: "Color Refresh Deal",
    rating: "4.8",
    completedJobs: "9K+ Jobs",
    responseTime: "Same-day consultation",
    startPrice: 1999,
    overview:
      "Professional painters deliver neat edges, uniform coats, and clean handover for both touch-up and full room painting.",
    workIncludes: [
      "Surface prep and masking",
      "Putty touch-up on minor cracks",
      "Primer + coat application",
      "Accent wall and texture options",
      "Post-work cleanup",
    ],
    requiredItems: [
      "Paint shade selection",
      "Primer and base coat",
      "Roller/brush setup",
      "Protective floor sheets",
    ],
    gallery: withImage(repairImages.painting, [
      {
        id: "pt-1",
        title: "Room Repaint",
        subtitle: "Two-coat smooth finish",
      },
      {
        id: "pt-2",
        title: "Accent Wall Theme",
        subtitle: "Designer highlight wall",
      },
      {
        id: "pt-3",
        title: "Patch + Blend Repair",
        subtitle: "Spot repaint for damaged areas",
      },
    ]),
    processSteps: [
      "Surface assessment and color confirmation",
      "Masking and prep",
      "Coat application and drying",
      "Final touch-up and cleanup",
    ],
    packages: [
      {
        id: "pt-p1",
        name: "Single Wall Paint Job",
        price: 1999,
        duration: "4-6 hrs",
        description: "Perfect for one wall touch-up or new accent paint.",
      },
      {
        id: "pt-p2",
        name: "Room Painting Package",
        price: 3899,
        duration: "1 day",
        description: "End-to-end painting for one room.",
        badge: "Popular",
      },
    ],
    faqs: [
      {
        id: "pt-f1",
        question: "Can you match existing wall shade?",
        answer:
          "Yes, shade matching support is available. Slight variation can occur based on old paint age and finish.",
      },
      {
        id: "pt-f2",
        question: "Is furniture protection included?",
        answer:
          "Basic masking and covers are provided for nearby furniture and floors.",
      },
    ],
    serviceNote: "Large projects can be quoted after a physical site visit.",
  },
  "wall-mounting": {
    title: "Wall Mounting & Drilling",
    subtitle: "Secure mounting for TV units, mirrors, and shelves",
    heroImage: repairImages.wallMounting,
    heroGradient: ["#0F172A", "#334155"],
    offerLabel: "Precision Mounting",
    rating: "4.6",
    completedJobs: "13K+ Jobs",
    responseTime: "40 min avg response",
    startPrice: 499,
    overview:
      "Accurate drilling and balanced fitting for wall-mounted items with focus on alignment and structural safety.",
    workIncludes: [
      "TV bracket and frame mounting",
      "Mirror and photo frame setup",
      "Shelf/bracket installation",
      "Anchor fitting on masonry walls",
      "Alignment and stability checks",
    ],
    requiredItems: [
      "Mounting bracket/fixture",
      "Wall anchors and screws",
      "Drill bit as per wall type",
      "Spirit level",
      "Cable clips (if needed)",
    ],
    gallery: withImage(repairImages.wallMounting, [
      {
        id: "wm-1",
        title: "TV Unit Mounting",
        subtitle: "Level setup with load checks",
      },
      {
        id: "wm-2",
        title: "Mirror Installation",
        subtitle: "Neat and secure positioning",
      },
      {
        id: "wm-3",
        title: "Shelf Bracket Fit",
        subtitle: "Strong hold with hidden screws",
      },
    ]),
    processSteps: [
      "Measure and mark mounting points",
      "Drill and anchor insertion",
      "Fixture attachment and leveling",
      "Stability and finish checks",
    ],
    packages: [
      {
        id: "wm-p1",
        name: "Single Mount Task",
        price: 499,
        duration: "45 mins",
        description: "One standard drilling and mounting activity.",
      },
      {
        id: "wm-p2",
        name: "Multi-Mount Visit",
        price: 999,
        duration: "90 mins",
        description: "Ideal for 3-4 wall mount tasks in one slot.",
        badge: "Value Pack",
      },
    ],
    faqs: [
      {
        id: "wm-f1",
        question: "Do you handle concrete and brick walls?",
        answer:
          "Yes, both are supported. Very fragile surfaces are checked before drilling for safety.",
      },
      {
        id: "wm-f2",
        question: "Can cable management be done for TV mounting?",
        answer:
          "Basic cable clipping is included. Concealed routing may require additional work.",
      },
    ],
    serviceNote: "Please keep brackets and accessories ready before the visit.",
  },
  "electrical-installation": {
    title: "Electrical Installation",
    subtitle: "Safe setup for lights, fans, switches, and fittings",
    heroImage: repairImages.electrical,
    heroGradient: ["#F59E0B", "#EA580C"],
    offerLabel: "Certified Electricians",
    rating: "4.8",
    completedJobs: "17K+ Jobs",
    responseTime: "30 min avg response",
    startPrice: 699,
    overview:
      "Certified electricians perform safe installations and testing with proper load handling and connection checks.",
    workIncludes: [
      "Switchboard and socket installation",
      "Fan and ceiling light setup",
      "Modular fitting replacements",
      "Connection and continuity testing",
      "Basic load and safety checks",
    ],
    requiredItems: [
      "Appropriate switches/sockets",
      "Electrical tape and connectors",
      "Mounting screws",
      "Voltage tester access",
      "Ladder access for ceiling points",
    ],
    gallery: withImage(repairImages.electrical, [
      {
        id: "el-1",
        title: "Switchboard Replacement",
        subtitle: "Neat modular board install",
      },
      {
        id: "el-2",
        title: "Ceiling Fan Installation",
        subtitle: "Balanced fit and wiring checks",
      },
      {
        id: "el-3",
        title: "Light Fixture Setup",
        subtitle: "Secure mount and circuit test",
      },
    ]),
    processSteps: [
      "Power isolation and safety checks",
      "Wiring and mounting setup",
      "Installation and load test",
      "Final inspection and handover",
    ],
    packages: [
      {
        id: "el-p1",
        name: "Single Electrical Install",
        price: 699,
        duration: "45 mins",
        description: "Best for one switch/fan/light installation.",
      },
      {
        id: "el-p2",
        name: "Electrical Setup Combo",
        price: 1299,
        duration: "90 mins",
        description: "Multiple installation points in one visit.",
        badge: "Recommended",
      },
    ],
    faqs: [
      {
        id: "el-f1",
        question: "Do you provide electrical hardware?",
        answer:
          "Basic consumables are available. Main fixtures like fans and designer lights should be customer provided.",
      },
      {
        id: "el-f2",
        question: "Is rewiring included?",
        answer:
          "Basic connection adjustment is included. Full rewiring is quoted separately after inspection.",
      },
    ],
    serviceNote: "All electrical work follows standard safety protocols.",
  },
  "curtain-setup": {
    title: "Curtain & Rod Setup",
    subtitle: "Rod alignment, drilling, and clean curtain installation",
    heroImage: repairImages.curtain,
    heroGradient: ["#7C3AED", "#A855F7"],
    offerLabel: "Home Decor Assist",
    rating: "4.6",
    completedJobs: "6K+ Jobs",
    responseTime: "50 min avg response",
    startPrice: 899,
    overview:
      "Accurate rod placement with balanced height and spacing to improve both functionality and room aesthetics.",
    workIncludes: [
      "Curtain rod bracket marking",
      "Drilling and anchor insertion",
      "Rod installation and leveling",
      "Curtain hanging and folds adjustment",
      "Basic finishing and cleanup",
    ],
    requiredItems: [
      "Curtain rod set",
      "Brackets and wall anchors",
      "Curtain rings/hooks",
      "Step ladder access",
    ],
    gallery: withImage(repairImages.curtain, [
      {
        id: "ct-1",
        title: "Window Rod Install",
        subtitle: "Balanced center alignment",
      },
      {
        id: "ct-2",
        title: "Double Layer Curtain Setup",
        subtitle: "Sheer + blackout combination",
      },
      {
        id: "ct-3",
        title: "Corner Curtain Fit",
        subtitle: "Smooth corner rod transitions",
      },
    ]),
    processSteps: [
      "Window/door measurement",
      "Bracket point marking",
      "Rod and curtain setup",
      "Alignment + final finish",
    ],
    packages: [
      {
        id: "ct-p1",
        name: "Single Curtain Setup",
        price: 899,
        duration: "45 mins",
        description: "One window or one door curtain setup.",
      },
      {
        id: "ct-p2",
        name: "Full Room Curtain Setup",
        price: 1599,
        duration: "100 mins",
        description: "Multiple rods and curtain installations.",
        badge: "Most Chosen",
      },
    ],
    faqs: [
      {
        id: "ct-f1",
        question: "Do you provide rods and curtains?",
        answer:
          "Rod and curtain sets are usually customer provided. Installation consumables are supported.",
      },
      {
        id: "ct-f2",
        question: "Can old rod brackets be reused?",
        answer:
          "Yes, if they are stable and aligned correctly. Technician checks this on-site.",
      },
    ],
    serviceNote: "Wide windows may require dual bracket support.",
  },
  "door-lock": {
    title: "Door Lock Repair",
    subtitle: "Latch repair, lock replacement, and alignment correction",
    heroImage: repairImages.doorLock,
    heroGradient: ["#334155", "#0F172A"],
    offerLabel: "Secure Home Support",
    rating: "4.7",
    completedJobs: "8K+ Jobs",
    responseTime: "35 min avg response",
    startPrice: 499,
    overview:
      "Get quick support for jammed locks, latch issues, and alignment problems with secure and smooth lock function restoration.",
    workIncludes: [
      "Door lock mechanism inspection",
      "Latch and strike plate alignment",
      "Lock cylinder replacement support",
      "Handle and bolt tightening",
      "Open-close smoothness testing",
    ],
    requiredItems: [
      "Replacement lock (if needed)",
      "Screw set",
      "Lubricant spray",
      "Key duplication reference",
    ],
    gallery: withImage(repairImages.doorLock, [
      {
        id: "dl-1",
        title: "Main Door Lock Repair",
        subtitle: "Latch + key turn issue resolution",
      },
      {
        id: "dl-2",
        title: "Handle and Bolt Service",
        subtitle: "Tightening and re-alignment",
      },
      {
        id: "dl-3",
        title: "Lock Replacement Fit",
        subtitle: "New hardware with smooth operation",
      },
    ]),
    processSteps: [
      "Lock and latch diagnosis",
      "Component repair/replacement",
      "Alignment and tension adjustment",
      "Security and movement test",
    ],
    packages: [
      {
        id: "dl-p1",
        name: "Basic Lock Repair",
        price: 499,
        duration: "35 mins",
        description: "Repair and adjustment for one standard lock unit.",
      },
      {
        id: "dl-p2",
        name: "Lock Repair + Replacement",
        price: 899,
        duration: "70 mins",
        description: "Repair plus lock change support for one door.",
        badge: "Recommended",
      },
    ],
    faqs: [
      {
        id: "dl-f1",
        question: "Can you open jammed locks without damage?",
        answer:
          "In most cases yes. If lock internals are damaged, replacement may be required.",
      },
      {
        id: "dl-f2",
        question: "Do you duplicate keys too?",
        answer:
          "Key duplication is generally not included in standard repair visits.",
      },
    ],
    serviceNote: "Identity verification may be requested for some lock services.",
  },
};
