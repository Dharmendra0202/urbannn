export type WorkGalleryItem = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type ServicePackage = {
  id: string;
  name: string;
  price: number;
  duration: string;
  visits: string;
  description: string;
  badge?: string;
};

export type ServiceFaq = {
  id: string;
  question: string;
  answer: string;
};

export type RecommendedServiceDetail = {
  title: string;
  subtitle: string;
  heroImage: string;
  heroGradient: [string, string];
  offerLabel: string;
  rating: string;
  completedJobs: string;
  durationLabel: string;
  startingPrice: number;
  overview: string;
  highlights: string[];
  workGallery: WorkGalleryItem[];
  includes: string[];
  installationChecklist: string[];
  packages: ServicePackage[];
  faqs: ServiceFaq[];
};

export type RecommendedServiceSlug =
  | "sofa-cleaning"
  | "bathroom-cleaning"
  | "pest-control"
  | "wall-painting"
  | "ac-service"
  | "carpentry-installation"
  | "tv-wall-mounting";

export const recommendedServiceDetails: Record<
  RecommendedServiceSlug,
  RecommendedServiceDetail
> = {
  "sofa-cleaning": {
    title: "Sofa Cleaning",
    subtitle: "Deep fabric care with stain treatment and odor control",
    heroImage:
      "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg",
    heroGradient: ["#0EA5E9", "#06B6D4"],
    offerLabel: "Flat 20% Off",
    rating: "4.8",
    completedJobs: "8K+ Jobs",
    durationLabel: "60-90 mins",
    startingPrice: 499,
    overview:
      "Ideal for dusty or stained sofas. Professionals perform vacuuming, foam wash, and moisture-controlled drying.",
    highlights: ["Fabric-safe shampoo", "Quick dry method", "Pet odor removal"],
    workGallery: [
      {
        id: "sc-1",
        title: "3-Seater Shampoo Wash",
        subtitle: "Foam extraction for deep dirt",
        image:
          "https://images.pexels.com/photos/4239013/pexels-photo-4239013.jpeg",
      },
      {
        id: "sc-2",
        title: "Stain Spot Treatment",
        subtitle: "Coffee and food spill focus",
        image:
          "https://images.pexels.com/photos/4108728/pexels-photo-4108728.jpeg",
      },
      {
        id: "sc-3",
        title: "Cushion Sanitization",
        subtitle: "Drying and anti-bacterial finish",
        image:
          "https://images.pexels.com/photos/6197079/pexels-photo-6197079.jpeg",
      },
    ],
    includes: [
      "Pre-inspection of fabric type and stain level",
      "Dry vacuuming of sofa body and seat gaps",
      "Foam shampoo cleaning with soft brush action",
      "Spot treatment for visible stains",
      "Final sanitizing and moisture extraction",
    ],
    installationChecklist: [],
    packages: [
      {
        id: "sc-p1",
        name: "Classic Care",
        price: 499,
        duration: "60 mins",
        visits: "Single visit",
        description: "Basic deep cleaning for up to 3-seater sofa.",
      },
      {
        id: "sc-p2",
        name: "Premium Fabric Restore",
        price: 799,
        duration: "90 mins",
        visits: "Single visit",
        description:
          "Advanced stain treatment plus anti-odor sanitization process.",
        badge: "Most Booked",
      },
    ],
    faqs: [
      {
        id: "sc-f1",
        question: "Will the sofa be fully wet after cleaning?",
        answer:
          "No. We use low-moisture extraction methods. Normal drying time is usually 2-4 hours depending on ventilation.",
      },
      {
        id: "sc-f2",
        question: "Do you clean leather sofas too?",
        answer:
          "Yes. Leather uses separate cleaners and conditioners. The expert confirms material before starting.",
      },
    ],
  },
  "bathroom-cleaning": {
    title: "Bathroom Deep Cleaning",
    subtitle: "Tile, fittings, and glass cleaning with hygiene-grade products",
    heroImage:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg",
    heroGradient: ["#2563EB", "#0EA5E9"],
    offerLabel: "Save 15% Today",
    rating: "4.7",
    completedJobs: "12K+ Jobs",
    durationLabel: "75-120 mins",
    startingPrice: 699,
    overview:
      "This service handles bathroom scale, soap scum, and hard-water marks for a visibly refreshed and hygienic space.",
    highlights: ["Hard-water stain removal", "Tile joint scrubbing", "Odor control"],
    workGallery: [
      {
        id: "bc-1",
        title: "Tile & Grout Scrubbing",
        subtitle: "Floor and wall tile focus",
        image:
          "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg",
      },
      {
        id: "bc-2",
        title: "Fittings Descaling",
        subtitle: "Taps, shower heads, and mixers",
        image:
          "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg",
      },
      {
        id: "bc-3",
        title: "Glass Panel Cleanup",
        subtitle: "Shower partitions and mirrors",
        image:
          "https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg",
      },
    ],
    includes: [
      "Deep cleaning of tiles, joints, and corners",
      "Chemical descaling of taps and metal fixtures",
      "Toilet seat and basin stain treatment",
      "Mirror and shower glass polishing",
      "Floor disinfection and deodorizing",
    ],
    installationChecklist: [],
    packages: [
      {
        id: "bc-p1",
        name: "Single Bathroom Deep Clean",
        price: 699,
        duration: "75 mins",
        visits: "Single visit",
        description: "Comprehensive cleaning for one standard bathroom.",
      },
      {
        id: "bc-p2",
        name: "2 Bathroom Combo",
        price: 1299,
        duration: "120 mins",
        visits: "Single visit",
        description: "Better value package for two bathrooms in one slot.",
        badge: "Value Pack",
      },
    ],
    faqs: [
      {
        id: "bc-f1",
        question: "Are the chemicals safe for kids and pets?",
        answer:
          "Yes. We use bathroom-safe products and rinse all exposed surfaces properly after the process.",
      },
      {
        id: "bc-f2",
        question: "Can old yellow stains be removed fully?",
        answer:
          "Most stains improve significantly. Final result depends on stain age, surface condition, and water quality.",
      },
    ],
  },
  "pest-control": {
    title: "Pest Control",
    subtitle: "Targeted treatment for cockroaches, ants, and seasonal pests",
    heroImage:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg",
    heroGradient: ["#F97316", "#EA580C"],
    offerLabel: "Up to 25% Off",
    rating: "4.6",
    completedJobs: "18K+ Jobs",
    durationLabel: "45-90 mins",
    startingPrice: 599,
    overview:
      "Control recurring pest issues with professional spray and gel treatments focused on hidden hotspots and entry points.",
    highlights: [
      "Odor-controlled chemicals",
      "Kitchen safe protocols",
      "Follow-up guidance",
    ],
    workGallery: [
      {
        id: "pc-1",
        title: "Kitchen Cockroach Control",
        subtitle: "Gel treatment for cabinets and drains",
        image:
          "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg",
      },
      {
        id: "pc-2",
        title: "Ant Trail Elimination",
        subtitle: "Perimeter and crack treatment",
        image:
          "https://images.pexels.com/photos/7722867/pexels-photo-7722867.jpeg",
      },
      {
        id: "pc-3",
        title: "Preventive Spray",
        subtitle: "Windows and utility corners",
        image:
          "https://images.pexels.com/photos/6197131/pexels-photo-6197131.jpeg",
      },
    ],
    includes: [
      "Property inspection and pest mapping",
      "Targeted gel/spray treatment for active zones",
      "Drain and sink line treatment in kitchen/bath area",
      "Entry-point prevention recommendations",
      "Post-treatment safety instructions",
    ],
    installationChecklist: [],
    packages: [
      {
        id: "pc-p1",
        name: "1 BHK Pest Shield",
        price: 599,
        duration: "45 mins",
        visits: "Single visit",
        description: "Ideal for small homes with initial pest issues.",
      },
      {
        id: "pc-p2",
        name: "Full Home Protection",
        price: 1099,
        duration: "90 mins",
        visits: "Single visit",
        description: "Complete treatment across kitchen, bedrooms, and utility.",
        badge: "Recommended",
      },
    ],
    faqs: [
      {
        id: "pc-f1",
        question: "How soon can we use rooms after treatment?",
        answer:
          "You can typically re-enter after 1-2 hours with proper ventilation. The expert shares exact guidance on-site.",
      },
      {
        id: "pc-f2",
        question: "Do you cover termites in this package?",
        answer:
          "No. Standard package covers common household pests. Termite treatment is handled as a separate service.",
      },
    ],
  },
  "wall-painting": {
    title: "Wall Painting",
    subtitle: "Fresh interior painting with clean edges and smooth finish",
    heroImage:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=1200",
    heroGradient: ["#EC4899", "#EF4444"],
    offerLabel: "Festival Painting Offer",
    rating: "4.9",
    completedJobs: "6K+ Jobs",
    durationLabel: "1-3 days",
    startingPrice: 1599,
    overview:
      "Whether touch-up or full room repainting, this service delivers sharp corners, uniform coats, and clean post-work finish.",
    highlights: ["No-mess masking", "Brand paint options", "Supervisor checks"],
    workGallery: [
      {
        id: "wp-1",
        title: "Accent Wall Finish",
        subtitle: "Premium texture and color blending",
        image:
          "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      },
      {
        id: "wp-2",
        title: "Living Room Repaint",
        subtitle: "Two-coat smooth coverage",
        image:
          "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg",
      },
      {
        id: "wp-3",
        title: "Corner Touch-Up",
        subtitle: "Patch repair and repaint",
        image:
          "https://images.pexels.com/photos/5691621/pexels-photo-5691621.jpeg",
      },
    ],
    includes: [
      "Wall inspection and surface prep",
      "Putty touch-up for minor cracks",
      "Primer and double coat painting",
      "Masking and edge protection",
      "Site cleanup after completion",
    ],
    installationChecklist: [],
    packages: [
      {
        id: "wp-p1",
        name: "Single Wall Touch-Up",
        price: 1599,
        duration: "5 hrs",
        visits: "Single visit",
        description: "Great for one feature wall or patch-work repainting.",
      },
      {
        id: "wp-p2",
        name: "Room Refresh Package",
        price: 3499,
        duration: "1 day",
        visits: "Single visit",
        description: "Complete repaint for one room with standard finish.",
        badge: "Most Popular",
      },
    ],
    faqs: [
      {
        id: "wp-f1",
        question: "Do you bring paint or should we arrange it?",
        answer:
          "Both options are available. You can choose brand shades with the expert before booking confirmation.",
      },
      {
        id: "wp-f2",
        question: "Will furniture be protected?",
        answer:
          "Yes. We use masking sheets and basic covering for nearby furniture before painting starts.",
      },
    ],
  },
  "ac-service": {
    title: "AC Service",
    subtitle: "Cooling performance tune-up with filter and coil cleaning",
    heroImage:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg",
    heroGradient: ["#0284C7", "#2563EB"],
    offerLabel: "10% Summer Saver",
    rating: "4.7",
    completedJobs: "24K+ Jobs",
    durationLabel: "45-70 mins",
    startingPrice: 899,
    overview:
      "Restore cooling and reduce electricity load with deep AC servicing done by trained technicians and checklist closure.",
    highlights: ["Jet wash coils", "Cooling performance check", "Gas pressure test"],
    workGallery: [
      {
        id: "ac-1",
        title: "Indoor Unit Cleaning",
        subtitle: "Filter and blower maintenance",
        image:
          "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg",
      },
      {
        id: "ac-2",
        title: "Outdoor Unit Wash",
        subtitle: "High-pressure condenser wash",
        image:
          "https://images.pexels.com/photos/4254168/pexels-photo-4254168.jpeg",
      },
      {
        id: "ac-3",
        title: "Cooling Diagnostics",
        subtitle: "Temperature and airflow testing",
        image:
          "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg",
      },
    ],
    includes: [
      "Filter and evaporator coil cleanup",
      "Condenser jet wash and debris removal",
      "Drain line and leakage check",
      "Cooling, airflow, and noise diagnostics",
      "Service report with maintenance tips",
    ],
    installationChecklist: [],
    packages: [
      {
        id: "ac-p1",
        name: "AC Standard Service",
        price: 899,
        duration: "45 mins",
        visits: "Single visit",
        description: "Best for periodic cleaning and performance tune-up.",
      },
      {
        id: "ac-p2",
        name: "AC Pro Service + Inspection",
        price: 1299,
        duration: "70 mins",
        visits: "Single visit",
        description: "Includes deep clean and detailed diagnostics report.",
        badge: "Expert Pick",
      },
    ],
    faqs: [
      {
        id: "ac-f1",
        question: "Is gas refill included in this price?",
        answer:
          "No. Gas refill is charged separately after leak checks and pressure diagnosis.",
      },
      {
        id: "ac-f2",
        question: "How often should AC service be done?",
        answer:
          "For best performance, service every 4-6 months, especially before and during summer.",
      },
    ],
  },
  "carpentry-installation": {
    title: "Carpentry Installation",
    subtitle: "Professional fitting for shelves, hardware, and wooden fixtures",
    heroImage:
      "https://images.pexels.com/photos/5691513/pexels-photo-5691513.jpeg",
    heroGradient: ["#7C2D12", "#B45309"],
    offerLabel: "Carpentry Pro Slot",
    rating: "4.8",
    completedJobs: "9K+ Jobs",
    durationLabel: "60-150 mins",
    startingPrice: 749,
    overview:
      "From bracket setup to modular accessories, technicians ensure precise marking, level alignment, and secure fitting.",
    highlights: ["Precision alignment", "Neat drill work", "Post-install cleanup"],
    workGallery: [
      {
        id: "ci-1",
        title: "Wall Shelf Installation",
        subtitle: "Accurate measuring and level fit",
        image:
          "https://images.pexels.com/photos/5691512/pexels-photo-5691512.jpeg",
      },
      {
        id: "ci-2",
        title: "Curtain Rod Fitting",
        subtitle: "Bracket drilling and firm anchoring",
        image:
          "https://images.pexels.com/photos/6207815/pexels-photo-6207815.jpeg",
      },
      {
        id: "ci-3",
        title: "Cabinet Hardware Setup",
        subtitle: "Handles and hinge adjustments",
        image:
          "https://images.pexels.com/photos/4246282/pexels-photo-4246282.jpeg",
      },
    ],
    includes: [
      "Pre-install measurement and surface check",
      "Safe drilling with dust-control methods",
      "Level-based fixture placement",
      "Anchor and screw tightening check",
      "Final finishing and area cleanup",
    ],
    installationChecklist: [
      "Drill machine",
      "Wall plugs and anchors",
      "Appropriate screws",
      "Spirit level",
      "Measuring tape",
      "Hammer and screwdriver set",
      "Safety gloves",
    ],
    packages: [
      {
        id: "ci-p1",
        name: "Single Installation Job",
        price: 749,
        duration: "60 mins",
        visits: "Single visit",
        description: "Suitable for one shelf, rod, or hardware fitting task.",
      },
      {
        id: "ci-p2",
        name: "Multi-Point Carpentry Setup",
        price: 1499,
        duration: "150 mins",
        visits: "Single visit",
        description: "Best for 3-4 installations in one visit.",
        badge: "Best Value",
      },
    ],
    faqs: [
      {
        id: "ci-f1",
        question: "Do I need to provide screws and anchors?",
        answer:
          "If you already have branded hardware, keep it ready. Otherwise the professional can usually arrange standard consumables at extra cost.",
      },
      {
        id: "ci-f2",
        question: "Can this include furniture assembly too?",
        answer:
          "Yes, basic assembly support can be added. Mention it in notes before confirming the booking slot.",
      },
    ],
  },
  "tv-wall-mounting": {
    title: "TV Wall Mounting",
    subtitle: "Safe bracket installation, cable alignment, and viewing-angle setup",
    heroImage:
      "https://images.pexels.com/photos/6970069/pexels-photo-6970069.jpeg",
    heroGradient: ["#111827", "#1F2937"],
    offerLabel: "Installation Special",
    rating: "4.8",
    completedJobs: "11K+ Jobs",
    durationLabel: "45-90 mins",
    startingPrice: 699,
    overview:
      "Accurate drilling, bracket leveling, and secure TV placement for a stable and premium wall-mount finish.",
    highlights: [
      "Bracket alignment check",
      "Wire path planning",
      "Load safety verification",
    ],
    workGallery: [
      {
        id: "tv-1",
        title: "Fixed Wall Mount Setup",
        subtitle: "Standard straight mount",
        image:
          "https://images.pexels.com/photos/6782574/pexels-photo-6782574.jpeg",
      },
      {
        id: "tv-2",
        title: "Cable Routing Finish",
        subtitle: "Clean and minimal visible wiring",
        image:
          "https://images.pexels.com/photos/4792473/pexels-photo-4792473.jpeg",
      },
      {
        id: "tv-3",
        title: "Angle and Height Calibration",
        subtitle: "Comfort viewing optimization",
        image:
          "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg",
      },
    ],
    includes: [
      "Wall strength inspection before drilling",
      "Precise mount point marking and drilling",
      "Bracket fitting with torque check",
      "TV hanging and alignment correction",
      "Cable basic management and cleanup",
    ],
    installationChecklist: [
      "Compatible TV bracket",
      "Anchor bolts and heavy-duty screws",
      "Drill and masonry bit",
      "Spirit level",
      "Stud/wall type awareness",
      "Cable ties or cable clips",
    ],
    packages: [
      {
        id: "tv-p1",
        name: "Standard TV Mount",
        price: 699,
        duration: "45 mins",
        visits: "Single visit",
        description: "Mounting support for up to 43 inch TVs.",
      },
      {
        id: "tv-p2",
        name: "Large TV Premium Mount",
        price: 1199,
        duration: "90 mins",
        visits: "Single visit",
        description:
          "For larger screens with bracket alignment and wiring assistance.",
        badge: "Most Chosen",
      },
    ],
    faqs: [
      {
        id: "tv-f1",
        question: "Will the technician bring the wall bracket?",
        answer:
          "Bracket is usually customer-provided to match TV model. We can help verify compatibility before installation.",
      },
      {
        id: "tv-f2",
        question: "Can mounting be done on all wall types?",
        answer:
          "Most concrete and brick walls are supported. Fragile partitions are checked on-site for load safety first.",
      },
    ],
  },
};
