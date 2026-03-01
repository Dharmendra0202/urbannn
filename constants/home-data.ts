import type {
    CustomerReviewItem,
    FooterSocialLink,
    HorizontalItem,
    OfferItem,
    RebookItem,
    SeasonalBundleItem,
    ServiceItem,
    WhyChooseItem,
} from "../types/home";
import { imageAssets } from "./image-assets";

export const specialOffer = {
  id: "special1",
  title: "Premium Home Makeover",
  subtitle: "Uplift your space with our expert renovation team",
  offer: "Up to 25% OFF",
  gradient: ["#8B5CF6", "#EC4899"],
  image:
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export const services: ServiceItem[] = [
  {
    id: 1,
    name: "Cleaning",
    icon: "sparkles-outline",
    color: "#8B5CF6",
    route: "/services/CleaningScreen",
  },
  {
    id: 2,
    name: "Electrician",
    icon: "flash-outline",
    color: "#F59E0B",
    route: "/services/ElectricianScreen",
  },
  {
    id: 3,
    name: "Plumbing",
    icon: "water-outline",
    color: "#3B82F6",
    route: "/services/PlumbingScreen",
  },
  {
    id: 4,
    name: "AC Repair",
    icon: "snow-outline",
    color: "#06B6D4",
    route: "/services/ACRepairScreen",
  },
  {
    id: 5,
    name: "Men’s Salon",
    icon: "cut-outline",
    color: "#22C55E",
    route: "/services/MensSalonScreen",
  },
  {
    id: 6,
    name: "Women’s Salon",
    icon: "woman-outline",
    color: "#EC4899",
    route: "/services/WomensSalonScreen",
  },
  {
    id: 7,
    name: "Massage & Spa",
    icon: "heart-outline",
    color: "#EF4444",
    route: "/services/MassageSpaScreen",
  },
  {
    id: 8,
    name: "Appliance Repair",
    icon: "tv-outline",
    color: "#6366F1",
    route: "/services/ApplianceRepairScreen",
  },
];

export const specialists: HorizontalItem[] = [
  {
    id: "1",
    name: "Home Deep Cleaning",
    price: 999,
    rating: 4.8,
    image: imageAssets.homeDeepCleaning,
    route: "/categories/home-cleaning",
  },
  {
    id: "2",
    name: "Kitchen Cleaning",
    price: 799,
    rating: 4.7,
    image: imageAssets.kitchenCleaning,
    route: "/categories/kitchen-cleaning",
  },
  {
    id: "3",
    name: "Bathroom Cleaning",
    price: 699,
    rating: 4.6,
    image: imageAssets.bathroomCleaning,
    route: "/categories/bathroom-cleaning",
  },
];

export const offers: OfferItem[] = [
  {
    id: "1",
    name: "Salon at Home (Women)",
    price: 1499,
    rating: 4.9,
    image: imageAssets.salonAtHomeWomen,
    discount: "35% OFF",
    eta: "45 min",
    tint: ["rgba(244,63,94,0.05)", "rgba(30,41,59,0.42)"],
    route: "/offers/womens-salon",
  },
  {
    id: "2",
    name: "Men’s Haircut + Beard Combo",
    price: 499,
    rating: 4.8,
    image: imageAssets.mensSalon,
    discount: "28% OFF",
    eta: "30 min",
    tint: ["rgba(14,165,233,0.05)", "rgba(15,23,42,0.42)"],
    route: "/offers/mens-haircut",
  },
  {
    id: "3",
    name: "Full Body Massage at Home",
    price: 1299,
    rating: 4.7,
    image: imageAssets.fullBodyMassage,
    discount: "30% OFF",
    eta: "60 min",
    tint: ["rgba(6,182,212,0.04)", "rgba(15,23,42,0.44)"],
    route: "/offers/full-body-massage",
  },
  {
    id: "4",
    name: "AC Service & Cleaning",
    price: 899,
    rating: 4.8,
    image: imageAssets.acServiceCleaning,
    discount: "26% OFF",
    eta: "50 min",
    tint: ["rgba(56,189,248,0.06)", "rgba(15,23,42,0.42)"],
    route: "/offers/ac-service",
  },
  {
    id: "5",
    name: "Refrigerator Repair",
    price: 999,
    rating: 4.6,
    image: imageAssets.refrigeratorRepair,
    discount: "22% OFF",
    eta: "55 min",
    tint: ["rgba(14,116,144,0.05)", "rgba(15,23,42,0.44)"],
    route: "/offers/refrigerator-repair",
  },
  {
    id: "9",
    name: "Home Painting Offer",
    price: 1899,
    rating: 4.9,
    image: imageAssets.wallPainting,
    discount: "32% OFF",
    eta: "120 min",
    tint: ["rgba(190,24,93,0.06)", "rgba(15,23,42,0.45)"],
    route: "/offers/painting-service",
  },
  {
    id: "10",
    name: "Pest Control Special",
    price: 599,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=600",
    discount: "18% OFF",
    eta: "35 min",
    tint: ["rgba(22,163,74,0.05)", "rgba(15,23,42,0.44)"],
    route: "/offers/pest-control",
  },
  {
    id: "11",
    name: "Laundry & Ironing Combo",
    price: 399,
    rating: 4.4,
    image: imageAssets.laundry,
    discount: "15% OFF",
    eta: "25 min",
    tint: ["rgba(14,165,233,0.04)", "rgba(15,23,42,0.45)"],
    route: "/offers/laundry-service",
  },
  {
    id: "12",
    name: "Carpet Shampoo Cleaning",
    price: 1199,
    rating: 4.6,
    image: imageAssets.carpetCleaning,
    discount: "23% OFF",
    eta: "65 min",
    tint: ["rgba(79,70,229,0.05)", "rgba(15,23,42,0.44)"],
    route: "/offers/carpet-cleaning",
  },
];

export const cleaningEssentials: HorizontalItem[] = [
  {
    id: "1",
    name: "Intense Bathroom Cleaning",
    price: 2499,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg?auto=compress&cs=tinysrgb&w=600",
    route: "/cleaning/intense-bathroom",
  },
  {
    id: "2",
    name: "Pest Control Service",
    price: 999,
    rating: 4.4,
    image:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=600",
    route: "/cleaning/pest-control",
  },
  {
    id: "3",
    name: "Apartment Pest Control",
    price: 1549,
    rating: 4.3,
    image:
      "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=600",
    route: "/cleaning/apartment-pest",
  },
  {
    id: "4",
    name: "Bathroom Deep Cleaning",
    price: 399,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg?auto=compress&cs=tinysrgb&w=600",
    route: "/cleaning/bathroom-deep",
  },
  {
    id: "5",
    name: "Mattress Cleaning",
    price: 399,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=600",
    route: "/cleaning/mattress-cleaning",
  },
  {
    id: "6",
    name: "Fridge Cleaning",
    price: 399,
    rating: 4.6,
    image: imageAssets.kitchenCleaning,
    route: "/cleaning/fridge-cleaning",
  },
  {
    id: "7",
    name: "Carpet Cleaning",
    price: 399,
    rating: 4.7,
    image: imageAssets.carpetCleaning,
    route: "/cleaning/carpet-cleaning",
  },
  {
    id: "8",
    name: "Laundry & Ironing",
    price: 249,
    rating: 4.4,
    image: imageAssets.laundry,
    route: "/cleaning/laundry",
  },
];

export const seasonalBundles: SeasonalBundleItem[] = [
  {
    id: "bundle-1",
    title: "Summer AC + Deep Clean",
    subtitle: "AC service + full home cleaning",
    price: 1699,
    save: "Save 24%",
    image: imageAssets.acServiceCleaning,
    gradient: ["#0EA5E9", "#1D4ED8"],
  },
  {
    id: "bundle-2",
    title: "Salon + Spa Retreat",
    subtitle: "Women salon with body spa",
    price: 1999,
    save: "Save 18%",
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900",
    gradient: ["#EC4899", "#8B5CF6"],
  },
  {
    id: "bundle-3",
    title: "Pest Control Combo",
    subtitle: "Kitchen + bathroom + balcony",
    price: 1399,
    save: "Save 22%",
    image:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=900",
    gradient: ["#F97316", "#EA580C"],
  },
];

export const customerReviews: CustomerReviewItem[] = [
  {
    id: "review-1",
    name: "Ritika S.",
    service: "Deep Cleaning",
    rating: 4.9,
    comment: "Team arrived on time, very professional and quick.",
    avatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "review-2",
    name: "Ankit R.",
    service: "AC Repair",
    rating: 4.8,
    comment: "Issue fixed in one visit. Transparent pricing.",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    id: "review-3",
    name: "Neha P.",
    service: "Salon at Home",
    rating: 5.0,
    comment: "Excellent service quality and neat setup at home.",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

export const whyChooseItems: WhyChooseItem[] = [
  {
    id: "trust-1",
    title: "Verified Professionals",
    subtitle: "Background checked experts",
    icon: "shield-checkmark-outline",
    color: "#0EA5E9",
  },
  {
    id: "trust-2",
    title: "On-Time Arrival",
    subtitle: "Tracked slots, reliable timing",
    icon: "time-outline",
    color: "#4F46E5",
  },
  {
    id: "trust-3",
    title: "Upfront Pricing",
    subtitle: "No hidden charges at checkout",
    icon: "wallet-outline",
    color: "#059669",
  },
];

export const rebookItems: RebookItem[] = [
  {
    id: "rebook-1",
    name: "Home Deep Cleaning",
    lastBooked: "Booked 12 days ago",
    price: 1099,
    image: imageAssets.homeDeepCleaning,
    route: "/services/CleaningScreen",
  },
  {
    id: "rebook-2",
    name: "AC Repair Visit",
    lastBooked: "Booked 25 days ago",
    price: 899,
    image:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600",
    route: "/services/ACRepairScreen",
  },
  {
    id: "rebook-3",
    name: "Men's Haircut Combo",
    lastBooked: "Booked 8 days ago",
    price: 499,
    image:
      "https://images.pexels.com/photos/3998393/pexels-photo-3998393.jpeg?auto=compress&cs=tinysrgb&w=600",
    route: "/offers/mens-haircut",
  },
];

export const footerCompanyLinks = ["About Us", "Careers", "Blog", "Partner With Us"] as const;
export const footerSupportLinks = [
  "Help Center",
  "Cancellation Policy",
  "Terms",
  "Privacy",
  "Contact Us",
] as const;
export const footerTopCities = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune"] as const;
export const footerSocials: FooterSocialLink[] = [
  { id: "insta", icon: "logo-instagram", url: "https://www.instagram.com" },
  { id: "facebook", icon: "logo-facebook", url: "https://www.facebook.com" },
  { id: "x", icon: "logo-twitter", url: "https://x.com" },
];

const isRemoteUrl = (value: string) => value.startsWith("http");

export const homeImagePrefetchUrls = Array.from(
  new Set(
    [
      specialOffer.image,
      ...offers.map((item) => item.image),
      ...specialists.map((item) => item.image),
      ...cleaningEssentials.map((item) => item.image),
      ...seasonalBundles.map((item) => item.image),
      ...customerReviews.map((item) => item.avatar),
      ...rebookItems.map((item) => item.image),
    ].filter(isRemoteUrl)
  )
);
