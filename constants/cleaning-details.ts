export type CleaningGalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type CleaningPackage = {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  badge?: string;
};

export type CleaningFaq = {
  id: string;
  question: string;
  answer: string;
};

export type CleaningContentPanel = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
};

export type CleaningServiceDetail = {
  title: string;
  subtitle: string;
  heroImage: string;
  heroGradient: [string, string];
  offerLabel: string;
  rating: string;
  completedJobs: string;
  avgDuration: string;
  startPrice: number;
  overview: string;
  workIncludes: string[];
  productHighlights: string[];
  contentPanels: CleaningContentPanel[];
  gallery: CleaningGalleryItem[];
  processSteps: string[];
  packages: CleaningPackage[];
  faqs: CleaningFaq[];
  serviceNote: string;
};

export type CleaningServiceSlug =
  | "intense-bathroom"
  | "pest-control"
  | "apartment-pest"
  | "bathroom-deep"
  | "mattress-cleaning"
  | "fridge-cleaning"
  | "carpet-cleaning"
  | "laundry";

export const cleaningServiceDetails: Record<
  CleaningServiceSlug,
  CleaningServiceDetail
> = {
  "intense-bathroom": {
    title: "Intense Bathroom Cleaning",
    subtitle: "Scale removal, tile recovery, and deep sanitization in one visit",
    heroImage:
      "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg",
    heroGradient: ["#0E7490", "#155E75"],
    offerLabel: "Deep Hygiene Slot",
    rating: "4.8",
    completedJobs: "18K+ Homes",
    avgDuration: "120-150 mins",
    startPrice: 2499,
    overview:
      "This package targets stubborn bathroom buildup using descaling agents, scrub machines, and post-clean disinfection for visibly fresher surfaces.",
    workIncludes: [
      "Tile scale and hard-water mark removal",
      "Toilet bowl, seat, and flush tank deep clean",
      "Sink, taps, and mirror stain treatment",
      "Shower area, grout line, and corner scrubbing",
      "Dry wipe and odor-neutralizing finish",
    ],
    productHighlights: [
      "Non-acidic descaling blend",
      "Bathroom steam brush machine",
      "Anti-bacterial surface spray",
      "Microfiber wipe kit",
      "Protective gloves + shoe cover protocol",
    ],
    contentPanels: [
      {
        id: "ib-c1",
        label: "Chemicals",
        title: "What products are used",
        description:
          "Balanced, bathroom-safe solutions are selected based on tile type and scaling intensity.",
        bullets: [
          "pH-balanced descalers for ceramic and vitrified surfaces",
          "Separate cleaner for chrome taps to reduce dullness",
          "Fresh deodorizer applied after rinse-down",
        ],
      },
      {
        id: "ib-c2",
        label: "Machines",
        title: "Equipment workflow",
        description:
          "Technicians combine manual detailing with machine-assisted scrubbing for faster recovery.",
        bullets: [
          "Corner brushes for tight edges and grout",
          "Handheld scrubber for floor-wall joints",
          "Controlled rinse and dry cycle",
        ],
      },
      {
        id: "ib-c3",
        label: "Protection",
        title: "Surface safety standards",
        description:
          "Sensitive fixtures and polished fittings are handled with low-abrasion methods.",
        bullets: [
          "Metal fixtures cleaned with soft sponge only",
          "No harsh blades on glazed tiles",
          "Before/after inspection with customer",
        ],
      },
      {
        id: "ib-c4",
        label: "Aftercare",
        title: "Post-service care tips",
        description:
          "Simple weekly habits help maintain shine and reduce future scaling.",
        bullets: [
          "Use wiper after shower use",
          "Rinse floor corners weekly",
          "Avoid concentrated acid products",
        ],
      },
    ],
    gallery: [
      {
        id: "ib-g1",
        title: "Scale Recovery",
        subtitle: "Hard-water spots reduced from wall tiles",
        image:
          "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg",
      },
      {
        id: "ib-g2",
        title: "Fixture Polish",
        subtitle: "Tap and basin shine restoration",
        image:
          "https://images.pexels.com/photos/4108712/pexels-photo-4108712.jpeg",
      },
      {
        id: "ib-g3",
        title: "Grout Detailing",
        subtitle: "Joint lines cleaned for a fresh look",
        image:
          "https://images.pexels.com/photos/4108714/pexels-photo-4108714.jpeg",
      },
    ],
    processSteps: [
      "Pre-clean assessment and stain-level check",
      "Chemical dwell + machine-assisted scrubbing",
      "Spot treatment and fixture detailing",
      "Final disinfection and dry handover",
    ],
    packages: [
      {
        id: "ib-p1",
        name: "Single Bathroom Deep Clean",
        price: 2499,
        duration: "120 mins",
        description: "Complete deep clean for one standard bathroom.",
      },
      {
        id: "ib-p2",
        name: "Twin Bathroom Combo",
        price: 4399,
        duration: "210 mins",
        description: "Best for 2 bathrooms in one coordinated visit.",
        badge: "Most Booked",
      },
    ],
    faqs: [
      {
        id: "ib-f1",
        question: "Will this remove old yellow stains completely?",
        answer:
          "Most stains improve significantly. Permanent discoloration from material damage may reduce but not fully disappear.",
      },
      {
        id: "ib-f2",
        question: "Is water supply needed during service?",
        answer:
          "Yes, regular water access is required for rinsing and finishing cycles.",
      },
    ],
    serviceNote:
      "Service quality check is done before exit; rework support is available as per policy.",
  },
  "pest-control": {
    title: "Pest Control Service",
    subtitle: "Targeted treatment for cockroaches, ants, and common household pests",
    heroImage:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg",
    heroGradient: ["#0F766E", "#14532D"],
    offerLabel: "Safe Family Plan",
    rating: "4.7",
    completedJobs: "24K+ Homes",
    avgDuration: "90-120 mins",
    startPrice: 999,
    overview:
      "Low-odor pest treatment across kitchen, drains, and hidden entry points with focused application and prevention guidance.",
    workIncludes: [
      "Site inspection and infestation mapping",
      "Gel/spray treatment in targeted zones",
      "Drain and sink area pest barrier",
      "Kitchen cabinet corner treatment",
      "Preventive guidance for next 2-4 weeks",
    ],
    productHighlights: [
      "Low-odor professional pest gel",
      "Targeted residual spray",
      "Crack-line nozzle applicator",
      "Pet-aware treatment checklist",
      "Digital treatment report",
    ],
    contentPanels: [
      {
        id: "pc-c1",
        label: "Coverage",
        title: "Where treatment is applied",
        description:
          "Technicians focus on breeding and movement paths to reduce repeat activity.",
        bullets: [
          "Kitchen storage edges and kickboards",
          "Wash basin, drain, and utility corners",
          "Door gaps and appliance back zones",
        ],
      },
      {
        id: "pc-c2",
        label: "Products",
        title: "Treatment material profile",
        description:
          "Application type is selected based on pest type and home usage conditions.",
        bullets: [
          "Gel points for hidden infestation lines",
          "Residual spray for recurring activity zones",
          "No broad fogging in standard package",
        ],
      },
      {
        id: "pc-c3",
        label: "Safety",
        title: "Home safety protocol",
        description:
          "Safety instructions are shared before and after treatment completion.",
        bullets: [
          "Child-touch points are protected",
          "Food-contact surfaces isolated",
          "Room re-entry timeline explained",
        ],
      },
      {
        id: "pc-c4",
        label: "Follow-up",
        title: "Expected results and care",
        description:
          "Some pest movement after treatment is normal before full effect settles.",
        bullets: [
          "Do not mop treated corners for 24 hrs",
          "Seal wet waste bins regularly",
          "Schedule follow-up if activity persists",
        ],
      },
    ],
    gallery: [
      {
        id: "pc-g1",
        title: "Kitchen Line Treatment",
        subtitle: "Focused gel placement at pest paths",
        image:
          "https://images.pexels.com/photos/4108802/pexels-photo-4108802.jpeg",
      },
      {
        id: "pc-g2",
        title: "Drain Barrier Setup",
        subtitle: "Entry point blocking around wet areas",
        image:
          "https://images.pexels.com/photos/4108718/pexels-photo-4108718.jpeg",
      },
      {
        id: "pc-g3",
        title: "Inspection Mapping",
        subtitle: "Problem zones marked before treatment",
        image:
          "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg",
      },
    ],
    processSteps: [
      "Infestation spotting and severity assessment",
      "Targeted treatment application",
      "Safety walkthrough and closure",
      "Result expectation and follow-up guidance",
    ],
    packages: [
      {
        id: "pc-p1",
        name: "1 BHK Pest Shield",
        price: 999,
        duration: "90 mins",
        description: "Suitable for light-to-moderate pest activity.",
      },
      {
        id: "pc-p2",
        name: "2-3 BHK Pest Shield",
        price: 1599,
        duration: "120 mins",
        description: "Extended treatment coverage for larger homes.",
        badge: "Recommended",
      },
    ],
    faqs: [
      {
        id: "pc-f1",
        question: "Is this service safe for pets?",
        answer:
          "Yes, with basic precautions. Pet movement should be restricted during application and drying period.",
      },
      {
        id: "pc-f2",
        question: "How soon do results show?",
        answer:
          "Visible reduction usually starts within 24-72 hours depending on infestation level.",
      },
    ],
    serviceNote:
      "Re-treatment support is available for eligible plans within the committed timeline.",
  },
  "apartment-pest": {
    title: "Apartment Pest Control",
    subtitle: "Complete home-wide pest treatment for larger apartments",
    heroImage:
      "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg",
    heroGradient: ["#166534", "#0F766E"],
    offerLabel: "Apartment Coverage",
    rating: "4.7",
    completedJobs: "11K+ Homes",
    avgDuration: "150-210 mins",
    startPrice: 1549,
    overview:
      "A zone-wise treatment plan built for multi-room apartments, focusing on kitchens, utility areas, and storage-heavy corners.",
    workIncludes: [
      "Full apartment pest activity mapping",
      "Room-wise treatment scheduling",
      "Kitchen and utility deep treatment",
      "Entry point and gap control recommendations",
      "Post-service monitoring guidance",
    ],
    productHighlights: [
      "Multi-surface gel treatment",
      "Targeted crack-line spray",
      "Entry-point treatment tips",
      "Eco-conscious dilution plan",
      "Room tagging and completion sheet",
    ],
    contentPanels: [
      {
        id: "ap-c1",
        label: "Zoning",
        title: "Room-by-room approach",
        description:
          "Each room is treated based on usage, moisture level, and pest movement signs.",
        bullets: [
          "Wet area focus for recurring insects",
          "Storage zones for hidden nesting",
          "Balcony and shaft-side protection",
        ],
      },
      {
        id: "ap-c2",
        label: "Intensive",
        title: "Higher coverage design",
        description:
          "Compared with standard plans, apartment control expands treatment depth and checkpoints.",
        bullets: [
          "Broader perimeter treatment",
          "Dedicated kitchen + utility slot",
          "Extended exit-point monitoring",
        ],
      },
      {
        id: "ap-c3",
        label: "Hygiene",
        title: "Resident-friendly protocol",
        description:
          "Service timing and application order reduce disruption to daily movement.",
        bullets: [
          "Sequential room closure plan",
          "Surface wipe instructions after curing",
          "Waste disposal recommendations",
        ],
      },
      {
        id: "ap-c4",
        label: "Retention",
        title: "How to keep results longer",
        description:
          "Simple maintenance steps improve treatment retention across seasons.",
        bullets: [
          "Dry sink zones overnight",
          "Seal food packets in airtight boxes",
          "Repair frequent seepage points",
        ],
      },
    ],
    gallery: [
      {
        id: "ap-g1",
        title: "Kitchen Priority Pass",
        subtitle: "Heavy-use kitchen zones treated first",
        image:
          "https://images.pexels.com/photos/4108811/pexels-photo-4108811.jpeg",
      },
      {
        id: "ap-g2",
        title: "Utility Corner Sweep",
        subtitle: "Targeted treatment in hidden moisture zones",
        image:
          "https://images.pexels.com/photos/4108809/pexels-photo-4108809.jpeg",
      },
      {
        id: "ap-g3",
        title: "Storage Safety Check",
        subtitle: "Cabinet edge and back-wall treatment",
        image:
          "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg",
      },
    ],
    processSteps: [
      "Apartment walkthrough and zone classification",
      "Room-wise treatment rollout",
      "Critical point reinforcement",
      "Aftercare briefing with timeline",
    ],
    packages: [
      {
        id: "ap-p1",
        name: "2 BHK Apartment Plan",
        price: 1549,
        duration: "150 mins",
        description: "Balanced coverage for medium-size homes.",
      },
      {
        id: "ap-p2",
        name: "3+ BHK Apartment Plan",
        price: 2399,
        duration: "210 mins",
        description: "Maximum coverage for larger layouts.",
        badge: "Best Value",
      },
    ],
    faqs: [
      {
        id: "ap-f1",
        question: "Should we vacate during treatment?",
        answer:
          "Only active rooms may need temporary clearance. Full home evacuation is usually not required.",
      },
      {
        id: "ap-f2",
        question: "Do you treat balconies and utility spaces?",
        answer:
          "Yes, those areas are included and prioritized where activity is visible.",
      },
    ],
    serviceNote:
      "Apartment plans are optimized for multi-room movement and minimal service interruption.",
  },
  "bathroom-deep": {
    title: "Bathroom Deep Cleaning",
    subtitle: "Fast, focused refresh for daily-use bathrooms",
    heroImage:
      "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg",
    heroGradient: ["#2563EB", "#0891B2"],
    offerLabel: "Quick Refresh",
    rating: "4.6",
    completedJobs: "30K+ Jobs",
    avgDuration: "60-90 mins",
    startPrice: 399,
    overview:
      "Ideal for monthly upkeep, this service handles core bathroom surfaces, fittings, and odor control in a compact time slot.",
    workIncludes: [
      "Toilet and sink cleaning",
      "Mirror and fixture wipe-down",
      "Floor scrub and drain area detail",
      "Basic stain treatment on tiles",
      "Final deodorizing spray",
    ],
    productHighlights: [
      "Daily-safe disinfectant",
      "Mild descaling cleaner",
      "Soft scrub pad set",
      "Glass wipe formula",
      "Freshness mist",
    ],
    contentPanels: [
      {
        id: "bd-c1",
        label: "Routine",
        title: "Best use case",
        description:
          "Designed for regular bathroom upkeep when deep restoration is not required.",
        bullets: [
          "Monthly hygiene refresh",
          "Guest-ready quick cleanup",
          "Low downtime cleaning slot",
        ],
      },
      {
        id: "bd-c2",
        label: "Scope",
        title: "What this package covers",
        description:
          "Coverage is focused and efficient with standard stain handling.",
        bullets: [
          "Surface-scale treatment",
          "Fitting shine enhancement",
          "Drain ring and corner attention",
        ],
      },
      {
        id: "bd-c3",
        label: "Supplies",
        title: "Products used",
        description:
          "Mild chemicals make this package suitable for routine upkeep cycles.",
        bullets: [
          "No harsh industrial acid",
          "Sanitizing final pass",
          "Fabric-safe wiping cloth",
        ],
      },
      {
        id: "bd-c4",
        label: "Maintain",
        title: "How to maintain results",
        description:
          "Simple daily actions help preserve cleanliness after service.",
        bullets: [
          "Ventilate after each use",
          "Rinse floor before night",
          "Avoid storing wet mats inside",
        ],
      },
    ],
    gallery: [
      {
        id: "bd-g1",
        title: "Quick Floor Recovery",
        subtitle: "Daily grime removed from floor tiles",
        image:
          "https://images.pexels.com/photos/4108716/pexels-photo-4108716.jpeg",
      },
      {
        id: "bd-g2",
        title: "Fixture Polish",
        subtitle: "Mirror, basin, and tap detailing",
        image:
          "https://images.pexels.com/photos/5649827/pexels-photo-5649827.jpeg",
      },
      {
        id: "bd-g3",
        title: "Drainline Hygiene",
        subtitle: "Odor-control oriented cleaning finish",
        image:
          "https://images.pexels.com/photos/4108709/pexels-photo-4108709.jpeg",
      },
    ],
    processSteps: [
      "Area prep and quick pre-rinse",
      "Surface and fixture cleaning",
      "Floor and drainline detailing",
      "Deodorize and final check",
    ],
    packages: [
      {
        id: "bd-p1",
        name: "Standard Bathroom Refresh",
        price: 399,
        duration: "60 mins",
        description: "Best for one regular bathroom cleanup.",
      },
      {
        id: "bd-p2",
        name: "Dual Bathroom Refresh",
        price: 749,
        duration: "95 mins",
        description: "Convenient option for 2 bathrooms.",
        badge: "Popular",
      },
    ],
    faqs: [
      {
        id: "bd-f1",
        question: "Does this include hard stain restoration?",
        answer:
          "It includes basic stain handling. Severe long-term scaling is better suited for intense deep cleaning.",
      },
      {
        id: "bd-f2",
        question: "Can this be done weekly?",
        answer:
          "Yes, many users book it as a weekly or bi-weekly hygiene routine.",
      },
    ],
    serviceNote:
      "Routine plan with compact turnaround; ideal for homes needing frequent maintenance.",
  },
  "mattress-cleaning": {
    title: "Mattress Cleaning",
    subtitle: "Dust extraction, stain care, and fabric-safe sanitization",
    heroImage:
      "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg",
    heroGradient: ["#7C3AED", "#4338CA"],
    offerLabel: "Sleep Hygiene Care",
    rating: "4.7",
    completedJobs: "10K+ Jobs",
    avgDuration: "50-80 mins",
    startPrice: 399,
    overview:
      "Deep vacuum and fabric treatment remove embedded dust and odor from mattresses while preserving upholstery texture.",
    workIncludes: [
      "High-suction dry vacuum pass",
      "Surface stain spot treatment",
      "Fabric-safe anti-bacterial spray",
      "Edge and seam dust extraction",
      "Fast-dry finishing protocol",
    ],
    productHighlights: [
      "HEPA vacuum extraction",
      "Foam-based upholstery cleaner",
      "Odor-neutral spray",
      "Quick-dry microfiber pass",
      "Mattress care advisory sheet",
    ],
    contentPanels: [
      {
        id: "mt-c1",
        label: "Dust",
        title: "Dust and allergen workflow",
        description:
          "Seam-line and edge extraction improves hygiene where dust typically settles.",
        bullets: [
          "Two-direction vacuuming",
          "Focused seam detailing",
          "Dry-pass completion for low moisture",
        ],
      },
      {
        id: "mt-c2",
        label: "Stains",
        title: "How stains are handled",
        description:
          "Stain treatment is fabric-sensitive and avoids oversoaking the mattress core.",
        bullets: [
          "Spot-check before chemical use",
          "Controlled foam application",
          "Blot-and-lift finishing",
        ],
      },
      {
        id: "mt-c3",
        label: "Care",
        title: "Post-clean usage guidance",
        description:
          "Drying and airflow guidance helps preserve freshness and avoid trapped moisture.",
        bullets: [
          "Allow 2-3 hours drying time",
          "Use mattress protector",
          "Rotate mattress every 2-3 months",
        ],
      },
      {
        id: "mt-c4",
        label: "Kit",
        title: "Product and machine set",
        description:
          "A compact setup ensures cleaning quality without damaging fabric structure.",
        bullets: [
          "HEPA vacuum for particulate capture",
          "Fabric-safe disinfectant mist",
          "Dry wipe finish for touch comfort",
        ],
      },
    ],
    gallery: [
      {
        id: "mt-g1",
        title: "Seam Deep Vacuum",
        subtitle: "Fine dust removal from edge channels",
        image:
          "https://images.pexels.com/photos/5997997/pexels-photo-5997997.jpeg",
      },
      {
        id: "mt-g2",
        title: "Spot Stain Lift",
        subtitle: "Localized treatment without over-wetting",
        image:
          "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg",
      },
      {
        id: "mt-g3",
        title: "Freshness Finish",
        subtitle: "Odor neutralization and dry touch finish",
        image:
          "https://images.pexels.com/photos/6585755/pexels-photo-6585755.jpeg",
      },
    ],
    processSteps: [
      "Fabric test and pre-vacuum prep",
      "Dust extraction and seam detailing",
      "Spot treatment and sanitization",
      "Drying guidance and quality check",
    ],
    packages: [
      {
        id: "mt-p1",
        name: "Single Mattress Care",
        price: 399,
        duration: "50 mins",
        description: "One mattress deep cleaning cycle.",
      },
      {
        id: "mt-p2",
        name: "Double Mattress Combo",
        price: 699,
        duration: "80 mins",
        description: "Two mattresses in one booking slot.",
        badge: "Value Pack",
      },
    ],
    faqs: [
      {
        id: "mt-f1",
        question: "Can old stains be removed completely?",
        answer:
          "Many stains are reduced significantly; very old or deep stains may leave light marks.",
      },
      {
        id: "mt-f2",
        question: "Is moisture left behind?",
        answer:
          "Low-moisture methods are used with controlled drying guidance.",
      },
    ],
    serviceNote:
      "Recommended every 3-4 months for better sleep hygiene and reduced dust load.",
  },
  "fridge-cleaning": {
    title: "Fridge Cleaning",
    subtitle: "Hygienic interior cleaning and odor reset for refrigerators",
    heroImage:
      "https://images.pexels.com/photos/5824884/pexels-photo-5824884.jpeg",
    heroGradient: ["#0EA5E9", "#2563EB"],
    offerLabel: "Kitchen Hygiene",
    rating: "4.6",
    completedJobs: "9K+ Jobs",
    avgDuration: "45-60 mins",
    startPrice: 399,
    overview:
      "A food-safe refrigerator cleaning workflow for shelves, trays, seals, and spill zones to improve freshness and hygiene.",
    workIncludes: [
      "Shelf and tray removal + cleaning",
      "Interior wall wipe and spill treatment",
      "Door gasket detailing",
      "Veg tray and corner sanitation",
      "Odor-control finishing pass",
    ],
    productHighlights: [
      "Food-safe cleaning solution",
      "Gasket detailing brush",
      "Non-scratch sponge kit",
      "Odor neutral spray",
      "Quick reset checklist",
    ],
    contentPanels: [
      {
        id: "fr-c1",
        label: "Interior",
        title: "Inside cleaning scope",
        description:
          "All accessible shelves and compartments are cleaned with non-toxic products.",
        bullets: [
          "Removable trays cleaned separately",
          "Sticky spill softening before wipe",
          "Edge and corner residue removal",
        ],
      },
      {
        id: "fr-c2",
        label: "Seals",
        title: "Door gasket care",
        description:
          "Gasket channels are cleaned to reduce trapped dirt and smell buildup.",
        bullets: [
          "Soft-brush gasket detailing",
          "Mold-spot handling on visible edges",
          "Dry wipe to preserve rubber life",
        ],
      },
      {
        id: "fr-c3",
        label: "Odor",
        title: "Freshness restoration",
        description:
          "Odor-neutral workflow helps reset fridge smell after deep cleaning.",
        bullets: [
          "Compartment-wise neutralizing spray",
          "Air circulation reset suggestion",
          "Storage hygiene best practices",
        ],
      },
      {
        id: "fr-c4",
        label: "Routine",
        title: "Maintenance cadence",
        description:
          "Routine cleaning prevents stubborn residue and preserves food quality.",
        bullets: [
          "Book every 4-6 weeks",
          "Wipe spills within 24 hours",
          "Avoid overpacking compartments",
        ],
      },
    ],
    gallery: [
      {
        id: "fr-g1",
        title: "Shelf Detailing",
        subtitle: "Removable glass shelf deep clean",
        image:
          "https://images.pexels.com/photos/14441129/pexels-photo-14441129.jpeg",
      },
      {
        id: "fr-g2",
        title: "Door Seal Hygiene",
        subtitle: "Gasket line residue cleanup",
        image:
          "https://images.pexels.com/photos/5591815/pexels-photo-5591815.jpeg",
      },
      {
        id: "fr-g3",
        title: "Odor Reset Finish",
        subtitle: "Fresh interior with hygienic storage prep",
        image:
          "https://images.pexels.com/photos/5824882/pexels-photo-5824882.jpeg",
      },
    ],
    processSteps: [
      "Switch-off and shelf prep",
      "Interior and tray cleaning cycle",
      "Gasket and corner detailing",
      "Dry finish and restart guidance",
    ],
    packages: [
      {
        id: "fr-p1",
        name: "Single Door Fridge Clean",
        price: 399,
        duration: "45 mins",
        description: "Compact cleaning package for single-door units.",
      },
      {
        id: "fr-p2",
        name: "Double Door Fridge Clean",
        price: 649,
        duration: "60 mins",
        description: "Extended compartment coverage for larger units.",
        badge: "Top Pick",
      },
    ],
    faqs: [
      {
        id: "fr-f1",
        question: "Are food-safe products used?",
        answer:
          "Yes, interior cleaning uses food-contact-safe solutions and dry wipe completion.",
      },
      {
        id: "fr-f2",
        question: "Do I need to empty the fridge first?",
        answer:
          "Yes, please remove food items before technician arrival for faster service.",
      },
    ],
    serviceNote:
      "Service excludes gas, compressor, and cooling-component repairs.",
  },
  "carpet-cleaning": {
    title: "Carpet Cleaning",
    subtitle: "Shampoo treatment, stain care, and odor-neutral deep cleaning",
    heroImage:
      "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg",
    heroGradient: ["#C2410C", "#EA580C"],
    offerLabel: "Fabric Revival",
    rating: "4.7",
    completedJobs: "13K+ Jobs",
    avgDuration: "60-100 mins",
    startPrice: 399,
    overview:
      "A multi-step carpet cleaning cycle using dust extraction, foam shampooing, and controlled drying for fresher fabric and better appearance.",
    workIncludes: [
      "High-suction dust extraction",
      "Foam shampoo and brush treatment",
      "Spot stain handling",
      "Edge and corner detailing",
      "Deodorizing final pass",
    ],
    productHighlights: [
      "Upholstery-safe shampoo",
      "Brush and suction combo",
      "Low-moisture cleaning method",
      "Stain-focused gel",
      "Quick-dry advisory",
    ],
    contentPanels: [
      {
        id: "cp-c1",
        label: "Fiber",
        title: "Carpet fiber handling",
        description:
          "Treatment pressure is adjusted based on carpet thickness and weave type.",
        bullets: [
          "Soft pass for delicate fibers",
          "Deeper agitation for heavy pile",
          "Color-safe product usage",
        ],
      },
      {
        id: "cp-c2",
        label: "Stains",
        title: "Stain treatment logic",
        description:
          "Different stains are pre-treated before full shampoo cycle.",
        bullets: [
          "Food/oil stain pre-softening",
          "No bleach-based stripping",
          "Repeat spot pass when needed",
        ],
      },
      {
        id: "cp-c3",
        label: "Drying",
        title: "Dry-time and usage",
        description:
          "Low-moisture method enables quicker reuse compared with heavy soak methods.",
        bullets: [
          "Partial dry in 2-4 hours",
          "Full dry based on ventilation",
          "Avoid footwear till dry",
        ],
      },
      {
        id: "cp-c4",
        label: "Upkeep",
        title: "Maintenance tips",
        description:
          "Regular maintenance helps retain texture and reduce stain locking.",
        bullets: [
          "Weekly vacuum routine",
          "Immediate blot for spills",
          "Quarterly deep clean recommended",
        ],
      },
    ],
    gallery: [
      {
        id: "cp-g1",
        title: "Dust Lift Stage",
        subtitle: "Deep vacuum base pass",
        image:
          "https://images.pexels.com/photos/4239039/pexels-photo-4239039.jpeg",
      },
      {
        id: "cp-g2",
        title: "Shampoo Cycle",
        subtitle: "Fabric-safe foam distribution",
        image:
          "https://images.pexels.com/photos/4107283/pexels-photo-4107283.jpeg",
      },
      {
        id: "cp-g3",
        title: "Final Grooming",
        subtitle: "Texture reset and freshness finish",
        image:
          "https://images.pexels.com/photos/4107279/pexels-photo-4107279.jpeg",
      },
    ],
    processSteps: [
      "Dry dust extraction",
      "Stain pre-treatment",
      "Shampoo and brush cycle",
      "Deodorize and drying guidance",
    ],
    packages: [
      {
        id: "cp-p1",
        name: "Small Carpet Refresh",
        price: 399,
        duration: "60 mins",
        description: "Good for one small-to-medium carpet.",
      },
      {
        id: "cp-p2",
        name: "Large Carpet Deep Clean",
        price: 749,
        duration: "100 mins",
        description: "For heavy-use and larger carpet surfaces.",
        badge: "Best Choice",
      },
    ],
    faqs: [
      {
        id: "cp-f1",
        question: "Can pet odor be removed?",
        answer:
          "Odor is usually reduced well. Deep-set odor may need repeat treatment.",
      },
      {
        id: "cp-f2",
        question: "Does this damage wool carpets?",
        answer:
          "No, technicians use fabric-safe methods and adjust treatment intensity for delicate fibers.",
      },
    ],
    serviceNote:
      "Avoid heavy usage immediately after service until recommended drying window is complete.",
  },
  laundry: {
    title: "Laundry & Ironing",
    subtitle: "Doorstep garment wash support and crease-free ironing",
    heroImage:
      "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg",
    heroGradient: ["#9333EA", "#DB2777"],
    offerLabel: "Everyday Care",
    rating: "4.5",
    completedJobs: "20K+ Orders",
    avgDuration: "24-48 hrs",
    startPrice: 249,
    overview:
      "Convenient laundry handling with sorting, wash-method guidance, and ironing quality checks for daily and office wear.",
    workIncludes: [
      "Garment category-based segregation",
      "Machine wash support as per care label",
      "Stain pre-check and treatment advice",
      "Steam ironing and fold finish",
      "Delivery-ready packaging",
    ],
    productHighlights: [
      "Color-safe detergent range",
      "Mild fabric conditioner",
      "Steam press workflow",
      "Lint and fold finishing",
      "Tag-based order tracking",
    ],
    contentPanels: [
      {
        id: "ld-c1",
        label: "Sorting",
        title: "Garment segregation",
        description:
          "Sorting reduces color transfer risk and improves wash quality consistency.",
        bullets: [
          "Lights, darks, and delicate split",
          "Office wear handled separately",
          "Care-label checks before cycle",
        ],
      },
      {
        id: "ld-c2",
        label: "Washing",
        title: "Wash process",
        description:
          "Method is selected per fabric category and stain condition.",
        bullets: [
          "Standard machine wash cycles",
          "Mild detergent for sensitive fabrics",
          "Balanced drying sequence",
        ],
      },
      {
        id: "ld-c3",
        label: "Ironing",
        title: "Press and finish",
        description:
          "Steam ironing delivers crisp folds and wearable presentation.",
        bullets: [
          "Temperature-controlled pressing",
          "Crease-line precision checks",
          "Fold or hanger-ready output",
        ],
      },
      {
        id: "ld-c4",
        label: "Turnaround",
        title: "Delivery timeline",
        description:
          "Service time depends on load size, fabric mix, and weather conditions.",
        bullets: [
          "Next-day slot for light loads",
          "48-hour window for mixed fabrics",
          "Live status updates via app flow",
        ],
      },
    ],
    gallery: [
      {
        id: "ld-g1",
        title: "Smart Sorting",
        subtitle: "Care-label based garment grouping",
        image:
          "https://images.pexels.com/photos/5816297/pexels-photo-5816297.jpeg",
      },
      {
        id: "ld-g2",
        title: "Steam Press Finish",
        subtitle: "Wrinkle control for daily wear",
        image:
          "https://images.pexels.com/photos/4761361/pexels-photo-4761361.jpeg",
      },
      {
        id: "ld-g3",
        title: "Fold and Pack",
        subtitle: "Neat delivery-ready packaging",
        image:
          "https://images.pexels.com/photos/6169034/pexels-photo-6169034.jpeg",
      },
    ],
    processSteps: [
      "Pickup and garment segregation",
      "Wash cycle and quality check",
      "Steam ironing and fold finish",
      "Dispatch-ready packaging",
    ],
    packages: [
      {
        id: "ld-p1",
        name: "Essentials Laundry Pack",
        price: 249,
        duration: "24 hrs",
        description: "Basic wash + iron support for everyday wear.",
      },
      {
        id: "ld-p2",
        name: "Laundry Plus Pack",
        price: 449,
        duration: "24-48 hrs",
        description: "Larger load with improved tracking and handling.",
        badge: "Most Ordered",
      },
    ],
    faqs: [
      {
        id: "ld-f1",
        question: "Do you clean delicate fabrics?",
        answer:
          "Delicate garments are supported as per care labels; highly sensitive pieces may need dry-clean specialists.",
      },
      {
        id: "ld-f2",
        question: "Is pickup and drop included?",
        answer:
          "Yes, pickup and doorstep return are included in eligible service areas.",
      },
    ],
    serviceNote:
      "Turnaround can vary by load and fabric type; exact timeline is confirmed at pickup.",
  },
};
