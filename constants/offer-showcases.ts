import { Image } from "react-native";

export type OfferTheme = {
  heroOverlay: [string, string];
  heroBadgeBg: string;
  heroBadgeText: string;
  accent: string;
  border: string;
  professionalBg: string;
  primaryButton: [string, string];
  primaryButtonText: string;
  pickButtonBg: string;
  pickButtonText: string;
};

type OfferStat = {
  id: string;
  value: string;
  label: string;
};

type OfferCombo = {
  id: string;
  title: string;
  note: string;
  price: number;
  badge: string;
  duration: string;
  image: string;
};

type OfferProfessional = {
  id: string;
  name: string;
  specialty: string;
  exp: string;
  rating: number;
  image: string;
};

type OfferFeedback = {
  id: string;
  name: string;
  rating: number;
  text: string;
};

export type OfferShowcaseConfig = {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  stats: OfferStat[];
  comboTitle?: string;
  combos: OfferCombo[];
  professionalTitle: string;
  professionals: OfferProfessional[];
  feedbackTitle?: string;
  feedbacks: OfferFeedback[];
  feedbackCta?: string;
  bottomLabel: string;
  bottomPrice: number;
  bookingService: string;
  primaryCtaText?: string;
  pickActionText?: string;
  theme: OfferTheme;
};

const resolveAssetUri = (assetModule: number) => Image.resolveAssetSource(assetModule)?.uri ?? "";

const images = {
  women: resolveAssetUri(require("../assets/images/salon-at-home-women.jpg")),
  men: resolveAssetUri(require("../assets/images/mens-salon.jpg")),
  spa: resolveAssetUri(require("../assets/images/full body massage.jpg")),
  tech: resolveAssetUri(require("../assets/images/AC service & cleaning.png")),
  appliance: resolveAssetUri(require("../assets/images/refrigerator-repair.png")),
  home: resolveAssetUri(require("../assets/images/home-service.jpg")),
} as const;

const salonRose: OfferTheme = {
  heroOverlay: ["rgba(251,113,133,0.18)", "rgba(15,23,42,0.78)"],
  heroBadgeBg: "rgba(255,241,242,0.94)",
  heroBadgeText: "#9D174D",
  accent: "#9D174D",
  border: "#FBCFE8",
  professionalBg: "#FFF1F2",
  primaryButton: ["#F9A8D4", "#FB7185"],
  primaryButtonText: "#111827",
  pickButtonBg: "#EC4899",
  pickButtonText: "#FFFFFF",
};

const menBold: OfferTheme = {
  heroOverlay: ["rgba(56,189,248,0.18)", "rgba(2,6,23,0.86)"],
  heroBadgeBg: "rgba(224,242,254,0.93)",
  heroBadgeText: "#082F49",
  accent: "#155E75",
  border: "#BAE6FD",
  professionalBg: "#ECFEFF",
  primaryButton: ["#22D3EE", "#34D399"],
  primaryButtonText: "#0F172A",
  pickButtonBg: "#0F172A",
  pickButtonText: "#FFFFFF",
};

const spaTheme: OfferTheme = {
  heroOverlay: ["rgba(20,184,166,0.18)", "rgba(15,23,42,0.82)"],
  heroBadgeBg: "rgba(204,251,241,0.93)",
  heroBadgeText: "#115E59",
  accent: "#0F766E",
  border: "#99F6E4",
  professionalBg: "#F0FDFA",
  primaryButton: ["#2DD4BF", "#5EEAD4"],
  primaryButtonText: "#0F172A",
  pickButtonBg: "#0F766E",
  pickButtonText: "#FFFFFF",
};

const techCyan: OfferTheme = {
  heroOverlay: ["rgba(14,165,233,0.16)", "rgba(2,6,23,0.88)"],
  heroBadgeBg: "rgba(224,242,254,0.95)",
  heroBadgeText: "#0C4A6E",
  accent: "#0369A1",
  border: "#BAE6FD",
  professionalBg: "#ECFEFF",
  primaryButton: ["#67E8F9", "#22D3EE"],
  primaryButtonText: "#0F172A",
  pickButtonBg: "#0369A1",
  pickButtonText: "#FFFFFF",
};

const techIndigo: OfferTheme = {
  heroOverlay: ["rgba(99,102,241,0.16)", "rgba(2,6,23,0.9)"],
  heroBadgeBg: "rgba(224,231,255,0.95)",
  heroBadgeText: "#312E81",
  accent: "#3730A3",
  border: "#C7D2FE",
  professionalBg: "#EEF2FF",
  primaryButton: ["#A5B4FC", "#818CF8"],
  primaryButtonText: "#0F172A",
  pickButtonBg: "#312E81",
  pickButtonText: "#FFFFFF",
};

const homeWarm: OfferTheme = {
  heroOverlay: ["rgba(245,158,11,0.16)", "rgba(15,23,42,0.82)"],
  heroBadgeBg: "rgba(254,243,199,0.95)",
  heroBadgeText: "#92400E",
  accent: "#92400E",
  border: "#FDE68A",
  professionalBg: "#FFFBEB",
  primaryButton: ["#FDE68A", "#FBBF24"],
  primaryButtonText: "#111827",
  pickButtonBg: "#A16207",
  pickButtonText: "#FFFFFF",
};

const standardCombos = (titlePrefix: string, image: string): OfferCombo[] => [
  {
    id: `${titlePrefix}-1`,
    title: `${titlePrefix} Core Combo`,
    note: "Most booked package",
    price: 499,
    badge: "20% OFF",
    duration: "45 min",
    image,
  },
  {
    id: `${titlePrefix}-2`,
    title: `${titlePrefix} Plus Combo`,
    note: "Advanced service coverage",
    price: 799,
    badge: "24% OFF",
    duration: "60 min",
    image: images.home,
  },
  {
    id: `${titlePrefix}-3`,
    title: `${titlePrefix} Premium Combo`,
    note: "Best value for complete care",
    price: 1199,
    badge: "28% OFF",
    duration: "80 min",
    image: images.spa,
  },
];

const standardPros = (role: string, image: string): OfferProfessional[] => [
  {
    id: `${role}-1`,
    name: "Rahul Sharma",
    specialty: `${role} specialist`,
    exp: "8 years",
    rating: 4.9,
    image,
  },
  {
    id: `${role}-2`,
    name: "Aman Khan",
    specialty: `${role} expert`,
    exp: "6 years",
    rating: 4.8,
    image: images.home,
  },
  {
    id: `${role}-3`,
    name: "Rohit Verma",
    specialty: `${role} lead`,
    exp: "7 years",
    rating: 4.8,
    image: images.spa,
  },
  {
    id: `${role}-4`,
    name: "Imran Ali",
    specialty: `${role} support`,
    exp: "5 years",
    rating: 4.7,
    image: images.home,
  },
];

const standardFeedback: OfferFeedback[] = [
  {
    id: "feedback-1",
    name: "Karan P.",
    rating: 4.9,
    text: "Professional arrival and excellent quality of work.",
  },
  {
    id: "feedback-2",
    name: "Aisha S.",
    rating: 4.8,
    text: "Smooth booking flow and service delivery as promised.",
  },
];

export const offerShowcases: Record<string, OfferShowcaseConfig> = {
  "womens-salon": {
    heroTitle: "Salon At One Click",
    heroSubtitle: "Book top-rated women beauty professionals with premium home comfort.",
    heroBadge: "Premium At Home",
    heroImage: images.women,
    stats: [
      { id: "s1", value: "4.9", label: "Rating" },
      { id: "s2", value: "12k+", label: "Bookings" },
      { id: "s3", value: "45m", label: "Quick Slot" },
    ],
    comboTitle: "Combo Offers",
    combos: standardCombos("Salon", images.women),
    professionalTitle: "Select Professional Artist",
    professionals: standardPros("Beauty", images.women),
    feedbackTitle: "Customer Feedback",
    feedbacks: standardFeedback,
    feedbackCta: "Share Your Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 499,
    bookingService: "Salon at Home for Women",
    primaryCtaText: "Book Now",
    pickActionText: "Choose",
    theme: salonRose,
  },
  "mens-haircut": {
    heroTitle: "Men’s Grooming Studio",
    heroSubtitle: "Haircut, beard styling and premium finishing by verified barbers.",
    heroBadge: "Bold Grooming",
    heroImage: images.men,
    stats: [
      { id: "s1", value: "4.8", label: "Rated" },
      { id: "s2", value: "45m", label: "Quick Slot" },
      { id: "s3", value: "9k+", label: "Monthly Cuts" },
    ],
    comboTitle: "Combo Offers",
    combos: standardCombos("Grooming", images.men),
    professionalTitle: "Pick Professional Barber",
    professionals: standardPros("Barber", images.men),
    feedbackTitle: "Customer Feedback",
    feedbacks: standardFeedback,
    feedbackCta: "Give Barber Feedback",
    bottomLabel: "Haircut + Beard Combo",
    bottomPrice: 499,
    bookingService: "Haircut + Beard Combo",
    primaryCtaText: "Book Now",
    pickActionText: "Select",
    theme: menBold,
  },
  "full-body-massage": {
    heroTitle: "Spa & Recovery Session",
    heroSubtitle: "Relaxing massage routines by certified wellness professionals.",
    heroBadge: "Wellness Premium",
    heroImage: images.spa,
    stats: [
      { id: "s1", value: "4.9", label: "Guest Rating" },
      { id: "s2", value: "60m", label: "Session" },
      { id: "s3", value: "7k+", label: "Monthly Slots" },
    ],
    combos: standardCombos("Massage", images.spa),
    professionalTitle: "Select Therapist",
    professionals: standardPros("Therapist", images.spa),
    feedbacks: standardFeedback,
    feedbackCta: "Share Session Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 1299,
    bookingService: "Full Body Massage at Home",
    primaryCtaText: "Book Session",
    pickActionText: "Choose",
    theme: spaTheme,
  },
  "ac-service": {
    heroTitle: "AC Service & Repair",
    heroSubtitle: "Fast diagnostics, transparent estimate and verified engineers.",
    heroBadge: "Technical Service",
    heroImage: images.tech,
    stats: [
      { id: "s1", value: "30m", label: "Response" },
      { id: "s2", value: "4.8", label: "Rating" },
      { id: "s3", value: "90d", label: "Support" },
    ],
    combos: standardCombos("AC", images.tech),
    professionalTitle: "Select Engineer",
    professionals: standardPros("Engineer", images.tech),
    feedbacks: standardFeedback,
    feedbackCta: "Give Engineer Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 599,
    bookingService: "AC Service",
    primaryCtaText: "Book Engineer",
    pickActionText: "Pick",
    theme: techCyan,
  },
  "ac-repair": {
    heroTitle: "AC Repair Control",
    heroSubtitle: "Repair-led visits for cooling, gas and compressor issues.",
    heroBadge: "Repair Mode",
    heroImage: images.tech,
    stats: [
      { id: "s1", value: "40m", label: "Response" },
      { id: "s2", value: "4.8", label: "Rating" },
      { id: "s3", value: "60d", label: "Support" },
    ],
    combos: standardCombos("AC Repair", images.tech),
    professionalTitle: "Select AC Technician",
    professionals: standardPros("AC Technician", images.tech),
    feedbacks: standardFeedback,
    feedbackCta: "Share Repair Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 699,
    bookingService: "AC Repair",
    primaryCtaText: "Book Repair",
    pickActionText: "Assign",
    theme: techIndigo,
  },
  "refrigerator-repair": {
    heroTitle: "Refrigerator Repair Lab",
    heroSubtitle: "Reliable fault detection, part-level checks and doorstep resolution.",
    heroBadge: "Appliance Diagnostics",
    heroImage: images.appliance,
    stats: [
      { id: "s1", value: "4.8", label: "Tech Rating" },
      { id: "s2", value: "2h", label: "Avg Arrival" },
      { id: "s3", value: "6k+", label: "Repairs/Month" },
    ],
    combos: standardCombos("Fridge Repair", images.appliance),
    professionalTitle: "Select Technician",
    professionals: standardPros("Technician", images.appliance),
    feedbacks: standardFeedback,
    feedbackCta: "Share Technician Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 699,
    bookingService: "Refrigerator Repair",
    primaryCtaText: "Book Repair",
    pickActionText: "Assign",
    theme: techIndigo,
  },
  "electrician-services": {
    heroTitle: "Electrician Pro Desk",
    heroSubtitle: "Wiring, fittings and electrical troubleshooting at home.",
    heroBadge: "Electrical Experts",
    heroImage: images.tech,
    stats: [
      { id: "s1", value: "35m", label: "Response" },
      { id: "s2", value: "4.8", label: "Rating" },
      { id: "s3", value: "5k+", label: "Monthly Jobs" },
    ],
    combos: standardCombos("Electrician", images.tech),
    professionalTitle: "Select Electrician",
    professionals: standardPros("Electrician", images.tech),
    feedbacks: standardFeedback,
    feedbackCta: "Share Service Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 499,
    bookingService: "Electrician Services",
    primaryCtaText: "Book Electrician",
    pickActionText: "Assign",
    theme: techCyan,
  },
  "plumbing-services": {
    heroTitle: "Plumbing Quick Response",
    heroSubtitle: "Leak fixes, drain cleaning and fitting replacements.",
    heroBadge: "Waterline Experts",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "30m", label: "Response" },
      { id: "s2", value: "4.7", label: "Rating" },
      { id: "s3", value: "4k+", label: "Monthly Jobs" },
    ],
    combos: standardCombos("Plumbing", images.home),
    professionalTitle: "Select Plumber",
    professionals: standardPros("Plumber", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Service Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 399,
    bookingService: "Plumbing Services",
    primaryCtaText: "Book Plumber",
    pickActionText: "Assign",
    theme: techCyan,
  },
  "wall-mounting": {
    heroTitle: "Wall Mounting Studio",
    heroSubtitle: "Secure TV, shelf and decor mounting by trained professionals.",
    heroBadge: "Precision Install",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.8", label: "Rating" },
      { id: "s2", value: "50m", label: "Average Job" },
      { id: "s3", value: "2k+", label: "Installations" },
    ],
    combos: standardCombos("Mounting", images.home),
    professionalTitle: "Select Installer",
    professionals: standardPros("Installer", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Installation Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 499,
    bookingService: "Wall Mounting",
    primaryCtaText: "Book Installer",
    pickActionText: "Assign",
    theme: techIndigo,
  },
  "home-deep-cleaning": {
    heroTitle: "Home Deep Cleaning",
    heroSubtitle: "Room-to-room deep cleaning with trained housekeeping experts.",
    heroBadge: "Premium Hygiene",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.8", label: "Rating" },
      { id: "s2", value: "2.5h", label: "Avg Duration" },
      { id: "s3", value: "8k+", label: "Monthly Bookings" },
    ],
    combos: standardCombos("Deep Clean", images.home),
    professionalTitle: "Select Cleaning Professional",
    professionals: standardPros("Cleaning", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Cleaning Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 1099,
    bookingService: "Home Deep Cleaning",
    primaryCtaText: "Book Cleaning",
    pickActionText: "Choose",
    theme: homeWarm,
  },
  "kitchen-cleaning": {
    heroTitle: "Kitchen Cleaning Care",
    heroSubtitle: "Degreasing, sink cleanup and appliance-surface sanitation.",
    heroBadge: "Kitchen Hygiene",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.7", label: "Rating" },
      { id: "s2", value: "70m", label: "Avg Duration" },
      { id: "s3", value: "5k+", label: "Monthly Jobs" },
    ],
    combos: standardCombos("Kitchen Clean", images.home),
    professionalTitle: "Select Cleaning Professional",
    professionals: standardPros("Kitchen Cleaner", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Cleaning Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 799,
    bookingService: "Kitchen Cleaning Package",
    primaryCtaText: "Book Cleaning",
    pickActionText: "Choose",
    theme: homeWarm,
  },
  "bathroom-cleaning": {
    heroTitle: "Bathroom Cleaning Pro",
    heroSubtitle: "Scale removal, fixture cleaning and floor deep sanitation.",
    heroBadge: "Bathroom Hygiene",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.7", label: "Rating" },
      { id: "s2", value: "60m", label: "Avg Duration" },
      { id: "s3", value: "4k+", label: "Monthly Jobs" },
    ],
    combos: standardCombos("Bathroom Clean", images.home),
    professionalTitle: "Select Cleaning Professional",
    professionals: standardPros("Bathroom Cleaner", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Cleaning Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 699,
    bookingService: "Bathroom Cleaning Service",
    primaryCtaText: "Book Cleaning",
    pickActionText: "Choose",
    theme: homeWarm,
  },
  "carpet-cleaning": {
    heroTitle: "Carpet Shampoo Care",
    heroSubtitle: "Stain lifting, shampoo extraction and odor neutralization.",
    heroBadge: "Fabric Care",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.6", label: "Rating" },
      { id: "s2", value: "80m", label: "Avg Duration" },
      { id: "s3", value: "3k+", label: "Monthly Jobs" },
    ],
    combos: standardCombos("Carpet Care", images.home),
    professionalTitle: "Select Carpet Specialist",
    professionals: standardPros("Carpet Specialist", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Cleaning Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 1199,
    bookingService: "Carpet Shampoo Cleaning",
    primaryCtaText: "Book Service",
    pickActionText: "Choose",
    theme: homeWarm,
  },
  "laundry-service": {
    heroTitle: "Laundry & Ironing",
    heroSubtitle: "Collect, clean and crease-free ironing with quality handling.",
    heroBadge: "Fabric Premium",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.5", label: "Rating" },
      { id: "s2", value: "24h", label: "Turnaround" },
      { id: "s3", value: "6k+", label: "Monthly Orders" },
    ],
    combos: standardCombos("Laundry", images.home),
    professionalTitle: "Select Laundry Expert",
    professionals: standardPros("Laundry Expert", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Laundry Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 399,
    bookingService: "Laundry & Ironing Combo",
    primaryCtaText: "Book Laundry",
    pickActionText: "Choose",
    theme: homeWarm,
  },
  "painting-service": {
    heroTitle: "Home Painting Studio",
    heroSubtitle: "Professional wall finishing with clean and safe execution.",
    heroBadge: "Color Upgrade",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.8", label: "Rating" },
      { id: "s2", value: "1 day", label: "Small Job ETA" },
      { id: "s3", value: "2k+", label: "Monthly Projects" },
    ],
    combos: standardCombos("Painting", images.home),
    professionalTitle: "Select Painting Pro",
    professionals: standardPros("Painter", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Painting Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 1899,
    bookingService: "Home Painting Offer",
    primaryCtaText: "Book Painter",
    pickActionText: "Choose",
    theme: homeWarm,
  },
  "pest-control": {
    heroTitle: "Pest Control Shield",
    heroSubtitle: "Targeted treatment with safe, family-friendly control solutions.",
    heroBadge: "Protection Plan",
    heroImage: images.home,
    stats: [
      { id: "s1", value: "4.5", label: "Rating" },
      { id: "s2", value: "50m", label: "Visit Time" },
      { id: "s3", value: "3k+", label: "Monthly Visits" },
    ],
    combos: standardCombos("Pest Control", images.home),
    professionalTitle: "Select Pest Specialist",
    professionals: standardPros("Pest Specialist", images.home),
    feedbacks: standardFeedback,
    feedbackCta: "Share Service Feedback",
    bottomLabel: "Starts from",
    bottomPrice: 599,
    bookingService: "Pest Control Special",
    primaryCtaText: "Book Specialist",
    pickActionText: "Choose",
    theme: homeWarm,
  },
};
