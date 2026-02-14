import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Linking,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import HorizontalCard from "@/components/HorizontalCard";
import {
  getRecommendedRoute,
  recommendedServices,
} from "@/constants/recommended-services";
import { getRepairRoute, repairServices } from "@/constants/repair-services";




// const router = useRouter();

const { width } = Dimensions.get("window");
const cardWidth = (width - 80) / 4;

interface ServiceItem {
  id: number;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  route: string;
}

interface HorizontalItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

interface SearchResultItem {
  id: string;
  name: string;
  section: string;
  route: string;
}

interface SeasonalBundleItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  save: string;
  image: string;
  gradient: [string, string];
}

interface CustomerReviewItem {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  avatar: string;
}

interface WhyChooseItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface RebookItem {
  id: string;
  name: string;
  lastBooked: string;
  price: number;
  image: string;
  route: string;
}

type BrowserSpeechRecognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onresult: ((event: any) => void) | null;
  start: () => void;
  stop: () => void;
};

type LocationPermissionState = "unknown" | "granted" | "denied" | "blocked";

const normalizeSearchText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const matchesSearch = (name: string, query: string) => {
  const normalizedName = normalizeSearchText(name);
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return true;
  }

  const queryTokens = normalizedQuery.split(" ");
  return queryTokens.every((token) => normalizedName.includes(token));
};

const specialistRouteMap: Record<string, string> = {
  "Home Deep Cleaning": "/categories/home-cleaning",
  "Kitchen Cleaning": "/categories/kitchen-cleaning",
  "Bathroom Cleaning": "/categories/bathroom-cleaning",
};

const offerRouteMap: Record<string, string> = {
  "Salon at Home (Women)": "/offers/womens-salon",
  "Men’s Haircut + Beard Combo": "/offers/mens-haircut",
  "Full Body Massage at Home": "/offers/full-body-massage",
  "AC Service & Cleaning": "/offers/ac-service",
  "Refrigerator Repair": "/offers/refrigerator-repair",
  "Home Deep Cleaning": "/offers/home-deep-cleaning",
  "Pest Control Special": "/offers/pest-control",
  "Home Painting Offer": "/offers/painting-service",
  "Laundry & Ironing Combo": "/offers/laundry-service",
  "Carpet Shampoo Cleaning": "/offers/carpet-cleaning",
  "Kitchen Cleaning Package": "/offers/kitchen-cleaning",
  "Bathroom Cleaning Service": "/offers/bathroom-cleaning",
};

const cleaningRouteMap: Record<string, string> = {
  "Intense Bathroom Cleaning": "/cleaning/intense-bathroom",
  "Pest Control Service": "/cleaning/pest-control",
  "Apartment Pest Control": "/cleaning/apartment-pest",
  "Bathroom Deep Cleaning": "/cleaning/bathroom-deep",
  "Mattress Cleaning": "/cleaning/mattress-cleaning",
  "Fridge Cleaning": "/cleaning/fridge-cleaning",
  "Carpet Cleaning": "/cleaning/carpet-cleaning",
  "Laundry & Ironing": "/cleaning/laundry",
};

// ✅ Services
const services: ServiceItem[] = [
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

// ✅ Offers / Essentials / Repair sections (horizontal lists)
const specialists: HorizontalItem[] = [
  {
    id: "1",
    name: "Home Deep Cleaning",
    price: 999,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    name: "Kitchen Cleaning",
    price: 799,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    name: "Bathroom Cleaning",
    price: 699,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const offers: HorizontalItem[] = [
  {
    id: "1",
    name: "Salon at Home (Women)",
    price: 1499,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    name: "Men’s Haircut + Beard Combo",
    price: 499,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3998393/pexels-photo-3998393.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    name: "Full Body Massage at Home",
    price: 1299,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "4",
    name: "AC Service & Cleaning",
    price: 899,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "5",
    name: "Refrigerator Repair",
    price: 999,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/9462630/pexels-photo-9462630.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "6",
    name: "Home Deep Cleaning",
    price: 1099,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "7",
    name: "Bathroom Cleaning Service",
    price: 699,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/4239144/pexels-photo-4239144.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "8",
    name: "Kitchen Cleaning Package",
    price: 799,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/5217884/pexels-photo-5217884.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "9",
    name: "Home Painting Offer",
    price: 1899,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/3865795/pexels-photo-3865795.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "10",
    name: "Pest Control Special",
    price: 599,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "11",
    name: "Laundry & Ironing Combo",
    price: 399,
    rating: 4.4,
    image:
      "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "12",
    name: "Carpet Shampoo Cleaning",
    price: 1199,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const cleaningEssentials: HorizontalItem[] = [
  {
    id: "1",
    name: "Intense Bathroom Cleaning",
    price: 2499,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    name: "Pest Control Service",
    price: 999,
    rating: 4.4,
    image:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    name: "Apartment Pest Control",
    price: 1549,
    rating: 4.3,
    image:
      "https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "4",
    name: "Bathroom Deep Cleaning",
    price: 399,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/5649812/pexels-photo-5649812.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "5",
    name: "Mattress Cleaning",
    price: 399,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "6",
    name: "Fridge Cleaning",
    price: 399,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/5824884/pexels-photo-5824884.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "7",
    name: "Carpet Cleaning",
    price: 399,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "8",
    name: "Laundry & Ironing",
    price: 249,
    rating: 4.4,
    image:
      "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const seasonalBundles: SeasonalBundleItem[] = [
  {
    id: "bundle-1",
    title: "Summer AC + Deep Clean",
    subtitle: "AC service + full home cleaning",
    price: 1699,
    save: "Save 24%",
    image:
      "https://images.pexels.com/photos/4099098/pexels-photo-4099098.jpeg?auto=compress&cs=tinysrgb&w=900",
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

const customerReviews: CustomerReviewItem[] = [
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

const whyChooseItems: WhyChooseItem[] = [
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

const rebookItems: RebookItem[] = [
  {
    id: "rebook-1",
    name: "Home Deep Cleaning",
    lastBooked: "Booked 12 days ago",
    price: 1099,
    image:
      "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=600",
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

const footerCompanyLinks = ["About Us", "Careers", "Blog", "Partner With Us"] as const;
const footerSupportLinks = [
  "Help Center",
  "Cancellation Policy",
  "Terms",
  "Privacy",
  "Contact Us",
] as const;
const footerTopCities = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Pune"] as const;
const footerSocials = [
  { id: "insta", icon: "logo-instagram", url: "https://www.instagram.com" },
  { id: "facebook", icon: "logo-facebook", url: "https://www.facebook.com" },
  { id: "x", icon: "logo-twitter", url: "https://x.com" },
] as const;


// const HorizontalCard: React.FC<{ item: HorizontalItem }> = ({ item }) => (
//   <TouchableOpacity activeOpacity={0.8} style={styles.horizontalCard}>
//     <Image
//       source={{ uri: item.image }}
//       style={styles.cardImage}
//       resizeMode="cover"
//       onError={(e) => console.log("Image failed to load:", e.nativeEvent.error)}
//     />
//     <Text style={styles.cardTitle}>{item.name}</Text>
//     <View style={styles.priceRow}>
//       <Text style={styles.priceText}>₹{item.price}</Text>
//       <View style={styles.ratingBox}>
//         <Ionicons name="star" size={12} color="#FFD700" />
//         <Text style={styles.ratingText}>{item.rating}</Text>
//       </View>
//     </View>
//   </TouchableOpacity>
// );
// ✅ Compact Mini Service Card Component
const MiniServiceCard: React.FC<{ item: HorizontalItem; onPress?: () => void }> = ({
  item,
  onPress,
}) => (
  <TouchableOpacity activeOpacity={0.8} style={styles.miniCard} onPress={onPress}>
    <Image
      source={{ uri: item.image }}
      style={styles.miniCardImage}
      resizeMode="cover"
    />
    <Text numberOfLines={1} style={styles.miniCardTitle}>
      {item.name}
    </Text>
    <Text style={styles.miniCardPrice}>₹{item.price}</Text>
  </TouchableOpacity>
);

// const routeMap: any = {
//   "Home Deep Cleaning": "/categories/home-cleaning",
//   "Kitchen Cleaning": "/categories/kitchen-cleaning",
//   "Bathroom Cleaning": "/categories/bathroom-cleaning",
// };


const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceFallbackShown, setVoiceFallbackShown] = useState(false);
  const searchInputRef = useRef<TextInput>(null);
  const speechRecognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const router = useRouter();
  const normalizedSearch = normalizeSearchText(search);
  // ✅ Derived filtered lists based on search
  const filteredSpecialists = specialists.filter((item) =>
    matchesSearch(item.name, normalizedSearch)
  );

  const filteredOffers = offers.filter((item) =>
    matchesSearch(item.name, normalizedSearch)
  );

  const filteredEssentials = cleaningEssentials.filter((item) =>
    matchesSearch(item.name, normalizedSearch)
  );

  const filteredRepair = repairServices.filter((item) =>
    matchesSearch(item.name, normalizedSearch)
  );

  const filteredRecommended = recommendedServices.filter((item) =>
    matchesSearch(item.name, normalizedSearch)
  );
  const filteredServices = services.filter((item) =>
    matchesSearch(item.name, normalizedSearch)
  );
  const hasSearchQuery = normalizedSearch.length > 0;
  const hasAnySearchResult =
    filteredSpecialists.length > 0 ||
    filteredOffers.length > 0 ||
    filteredEssentials.length > 0 ||
    filteredRepair.length > 0 ||
    filteredRecommended.length > 0 ||
    filteredServices.length > 0;

  const topSearchResults = useMemo(() => {
    if (!hasSearchQuery) {
      return [];
    }

    const results: SearchResultItem[] = [];
    const seen = new Set<string>();

    const addResult = (item: SearchResultItem) => {
      const normalizedName = normalizeSearchText(item.name);
      if (seen.has(normalizedName)) {
        return;
      }

      seen.add(normalizedName);
      results.push(item);
    };

    filteredServices.forEach((item) => {
      addResult({
        id: `service-${item.id}`,
        name: item.name,
        section: "Service",
        route: item.route,
      });
    });

    filteredSpecialists.forEach((item) => {
      const route = specialistRouteMap[item.name];
      if (!route) {
        return;
      }

      addResult({
        id: `specialist-${item.id}`,
        name: item.name,
        section: "Specialist",
        route,
      });
    });

    filteredEssentials.forEach((item) => {
      const route = cleaningRouteMap[item.name];
      if (!route) {
        return;
      }

      addResult({
        id: `cleaning-${item.id}`,
        name: item.name,
        section: "Cleaning",
        route,
      });
    });

    filteredRepair.forEach((item) => {
      addResult({
        id: `repair-${item.id}`,
        name: item.name,
        section: "Repair",
        route: getRepairRoute(item.id),
      });
    });

    filteredRecommended.forEach((item) => {
      addResult({
        id: `recommended-${item.id}`,
        name: item.name,
        section: "Recommended",
        route: getRecommendedRoute(item.id),
      });
    });

    filteredOffers.forEach((item) => {
      const route = offerRouteMap[item.name];
      if (!route) {
        return;
      }

      addResult({
        id: `offer-${item.id}`,
        name: item.name,
        section: "Offer",
        route,
      });
    });

    return results.slice(0, 8);
  }, [
    hasSearchQuery,
    filteredServices,
    filteredSpecialists,
    filteredEssentials,
    filteredRepair,
    filteredRecommended,
    filteredOffers,
  ]);

  // ✅ Location state
  const [location, setLocation] = useState<string>("Tap to enable location");
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);
  const [locationPermissionState, setLocationPermissionState] =
    useState<LocationPermissionState>("unknown");

  const updateLocationPermissionState = (
    status: Location.PermissionStatus,
    canAskAgain: boolean
  ) => {
    if (status === "granted") {
      setLocationPermissionState("granted");
      return;
    }

    setLocationPermissionState(canAskAgain ? "denied" : "blocked");
  };

  const openLocationSettings = async () => {
    if (Platform.OS === "web") {
      Alert.alert(
        "Enable browser location",
        "Please allow location access in your browser site settings."
      );
      return;
    }

    try {
      await Linking.openSettings();
    } catch (error) {
      console.log("Open settings error:", error);
    }
  };

  const fetchCurrentLocation = async () => {
    const loc = await Location.getCurrentPositionAsync({});
    const reverse = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (reverse.length > 0) {
      const { city, region } = reverse[0];
      setLocation(`${city ?? "Unknown"}, ${region ?? ""}`);
      return;
    }

    setLocation(
      `Lat: ${loc.coords.latitude.toFixed(2)}, Lon: ${loc.coords.longitude.toFixed(2)}`
    );
  };

  const syncLocationPermission = useCallback(async () => {
    try {
      const permission = await Location.getForegroundPermissionsAsync();
      updateLocationPermissionState(permission.status, permission.canAskAgain);
    } catch (error) {
      console.log("Permission check error:", error);
    }
  }, []);

  // ✅ Function to fetch location (can be triggered manually)
  const handleLocationFetch = async () => {
    try {
      setLoadingLocation(true);

      const currentPermission = await Location.getForegroundPermissionsAsync();
      updateLocationPermissionState(
        currentPermission.status,
        currentPermission.canAskAgain
      );

      if (currentPermission.status === "granted") {
        await fetchCurrentLocation();
        return;
      }

      const requestedPermission = await Location.requestForegroundPermissionsAsync();
      updateLocationPermissionState(
        requestedPermission.status,
        requestedPermission.canAskAgain
      );

      if (requestedPermission.status === "granted") {
        await fetchCurrentLocation();
        return;
      }

      if (!requestedPermission.canAskAgain) {
        setLocation("Location blocked. Open settings to enable.");
        Alert.alert(
          "Enable location",
          "Location access is blocked. Open app settings and allow location permission.",
          [
            { text: "Not now", style: "cancel" },
            { text: "Open settings", onPress: openLocationSettings },
          ]
        );
        return;
      }

      setLocation("Permission denied. Tap again to enable location.");
    } catch (error) {
      console.log("Location error:", error);
      setLocation("Unable to fetch");
    } finally {
      setLoadingLocation(false);
    }
  };
  // ✅ this closes the effect correctly

  const specialOffer = {
    id: "special1",
    title: "Premium Home Makeover",
    subtitle: "Uplift your space with our expert renovation team",
    offer: "Up to 25% OFF",
    gradient: ["#8B5CF6", "#EC4899"],
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
  };

  useEffect(() => {
    return () => {
      speechRecognitionRef.current?.stop();
      speechRecognitionRef.current = null;
    };
  }, []);

  useEffect(() => {
    syncLocationPermission();
  }, [syncLocationPermission]);

  useFocusEffect(
    useCallback(() => {
      syncLocationPermission();

      if (Platform.OS !== "android") {
        return undefined;
      }

      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => {
        subscription.remove();
      };
    }, [syncLocationPermission])
  );

  const handleSearchSubmit = () => {
    Keyboard.dismiss();

    if (hasSearchQuery && !hasAnySearchResult) {
      Alert.alert(
        "No services found",
        "Try another keyword like cleaning, repair, salon, or AC service."
      );
    }
  };

  const startWebVoiceSearch = () => {
    const browserGlobal = globalThis as any;
    const SpeechRecognitionCtor =
      browserGlobal?.SpeechRecognition || browserGlobal?.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      Alert.alert(
        "Voice search unavailable",
        "Your browser does not support speech recognition."
      );
      return;
    }

    const recognition: BrowserSpeechRecognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
      speechRecognitionRef.current = null;
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      Alert.alert(
        "Voice search error",
        event?.error
          ? `Could not capture voice (${event.error}). Try again.`
          : "Could not capture voice. Try again."
      );
    };

    recognition.onresult = (event) => {
      const transcript = event?.results?.[0]?.[0]?.transcript?.trim?.() ?? "";
      if (transcript.length > 0) {
        setSearch(transcript);
      }
    };

    speechRecognitionRef.current = recognition;
    recognition.start();
  };

  const handleMicPress = () => {
    if (Platform.OS === "web") {
      if (isListening) {
        speechRecognitionRef.current?.stop();
        setIsListening(false);
        return;
      }

      startWebVoiceSearch();
      return;
    }

    if (!voiceFallbackShown) {
      Alert.alert(
        "Voice search setup needed",
        "Full voice-to-text on Android/iOS needs a speech-recognition package. I have enabled it for web and kept quick search fallback for mobile."
      );
      setVoiceFallbackShown(true);
    }

    if (!hasSearchQuery) {
      setSearch("cleaning");
    }
    searchInputRef.current?.focus();
    handleSearchSubmit();
  };

  const handleNotificationPress = () => {
    router.push("/notifications");
  };

  const handleTopSearchPress = (item: SearchResultItem) => {
    setSearch(item.name);
    Keyboard.dismiss();
    router.push(item.route as any);
  };

  const handleSupportCall = async () => {
    try {
      await Linking.openURL("tel:+919999999999");
    } catch (error) {
      console.log("Call support error:", error);
      Alert.alert("Unable to place call", "Please try again in a moment.");
    }
  };

  const handleSupportEmail = async () => {
    try {
      await Linking.openURL("mailto:support@urbannn.app");
    } catch (error) {
      console.log("Email support error:", error);
      Alert.alert("Unable to open email", "Please try again in a moment.");
    }
  };

  const handleSupportChat = () => {
    Alert.alert(
      "Live chat",
      "Support chat will connect you shortly. You can also call for faster help."
    );
  };

  const handleFooterLinkPress = (label: string) => {
    if (label === "Contact Us") {
      void handleSupportCall();
      return;
    }

    if (label === "Help Center") {
      handleSupportChat();
      return;
    }

    Alert.alert(label, `${label} page will be available soon.`);
  };

  const handleFooterSocialPress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("Open social link error:", error);
      Alert.alert("Unable to open link", "Please try again in a moment.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LinearGradient
          colors={["#1E3A8A", "#1D4ED8", "#0EA5E9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.servicesBannerCard}
        >
          <View style={styles.servicesBannerTopRow}>
            <TouchableOpacity
              style={styles.servicesBannerLocationChip}
              onPress={handleLocationFetch}
              activeOpacity={0.85}
            >
              <Ionicons name="location-outline" size={15} color="#E0E7FF" />
              <View style={{ flex: 1 }}>
                <Text style={styles.servicesBannerLocationLabel}>Current Area</Text>
                <Text style={styles.servicesBannerLocationText} numberOfLines={1}>
                  {loadingLocation ? "Detecting..." : location}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNotificationPress}
              style={styles.servicesBannerNotifyBtn}
            >
              <Ionicons name="notifications-outline" size={18} color="#E0E7FF" />
              <View style={styles.servicesBannerNotifyDot} />
            </TouchableOpacity>
          </View>

          <Text style={styles.servicesBannerTitle}>Book Trusted Help In Minutes</Text>
          <Text style={styles.servicesBannerSubtitle}>
            Premium home services, fast slots, and verified professionals for every task.
          </Text>

          <View
            style={[
              styles.servicesBannerSearchShell,
              isSearchFocused && styles.servicesBannerSearchShellFocused,
            ]}
          >
            <TouchableOpacity
              style={styles.servicesBannerSearchIcon}
              onPress={handleSearchSubmit}
              activeOpacity={0.8}
            >
              <Ionicons name="search-outline" size={18} color="#6B7280" />
            </TouchableOpacity>
            <TextInput
              ref={searchInputRef}
              placeholder={isSearchFocused ? "" : "Search for cleaning, AC, salon..."}
              placeholderTextColor="#94A3B8"
              style={styles.servicesBannerSearchInput}
              value={search}
              onChangeText={setSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
              autoCorrect={false}
              spellCheck={false}
              autoCapitalize="none"
              autoComplete="off"
              importantForAutofill="no"
              textContentType="none"
              multiline={false}
              allowFontScaling={false}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity
              style={[styles.servicesBannerMicButton, isListening && styles.micButtonActive]}
              onPress={handleMicPress}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isListening ? "stop-circle-outline" : "mic-outline"}
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.servicesBannerPillsRow}>
            <View style={styles.servicesBannerPill}>
              <Ionicons name="shield-checkmark-outline" size={13} color="#A5F3FC" />
              <Text style={styles.servicesBannerPillText}>Verified Pros</Text>
            </View>
            <View style={styles.servicesBannerPill}>
              <Ionicons name="flash-outline" size={13} color="#A5F3FC" />
              <Text style={styles.servicesBannerPillText}>Fast Arrivals</Text>
            </View>
            <View style={styles.servicesBannerPill}>
              <Ionicons name="star-outline" size={13} color="#A5F3FC" />
              <Text style={styles.servicesBannerPillText}>Top Rated</Text>
            </View>
          </View>
        </LinearGradient>
        {locationPermissionState !== "granted" ? (
          <TouchableOpacity
            style={styles.servicesBannerLocationNotice}
            onPress={handleLocationFetch}
            activeOpacity={0.85}
          >
            <Ionicons name="information-circle-outline" size={16} color="#0369A1" />
            <Text style={styles.servicesBannerLocationNoticeText}>
              {locationPermissionState === "blocked"
                ? "Location is blocked. Tap to open settings."
                : "Enable location for nearby service availability."}
            </Text>
          </TouchableOpacity>
        ) : null}
        {hasSearchQuery && topSearchResults.length > 0 ? (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.searchResultsTitle}>Top Search Results</Text>
            {topSearchResults.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.searchResultItem}
                onPress={() => handleTopSearchPress(item)}
                activeOpacity={0.85}
              >
                <View style={styles.searchResultLeft}>
                  <Ionicons name="search-outline" size={16} color="#6B7280" />
                  <View>
                    <Text style={styles.searchResultName}>{item.name}</Text>
                    <Text style={styles.searchResultType}>{item.section}</Text>
                  </View>
                </View>
                <Ionicons name="arrow-forward" size={16} color="#7C3AED" />
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
        {hasSearchQuery && !hasAnySearchResult ? (
          <Text style={styles.searchHintText}>
            No matching services right now. Try another keyword.
          </Text>
        ) : null}

        {/* Services */}
        <Text style={styles.sectionHeading}>Services</Text>
        <View style={styles.grid}>
          {services.map((service, index) => (
            <MotiView
              key={service.id}
              from={{ opacity: 0, scale: 0.9, translateY: 10 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              transition={{ delay: index * 70, type: "timing", duration: 260 }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.serviceCard}
                onPress={() => router.push(service.route as any)}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: service.color },
                  ]}
                >
                  <Ionicons name={service.icon} size={28} color="#fff" />
                </View>
                <Text numberOfLines={2} ellipsizeMode="tail" style={styles.serviceName}>
                  {service.name}
                </Text>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        {/* Specialists Section */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>We Are Specialists In</Text>
          <TouchableOpacity onPress={() => router.push("/categories")}>
            <Text style={styles.seeAll}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={filteredSpecialists} // ✅ now shows only searched items
          renderItem={({ item }) => (
            <HorizontalCard
              item={item}
              onPress={() => {
                if (item.name === "Home Deep Cleaning") {
                  router.push("/categories/home-cleaning" as any);
                }

                if (item.name === "Kitchen Cleaning") {
                  router.push("/categories/kitchen-cleaning" as any);
                }

                if (item.name === "Bathroom Cleaning") {
                  router.push("/categories/bathroom-cleaning" as any);
                }
              }}
            />
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }} // // boxes height
        />

        {/* Offers & Discounts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Offers & Discounts</Text>
          <TouchableOpacity onPress={() => router.push("/offers" as any)}>
            <Text style={styles.seeAll}>See more</Text>
          </TouchableOpacity>
        </View>

        {filteredOffers.length === 0 ? (
          <Text
            style={{ textAlign: "center", color: "#6B7280", marginBottom: 10 }}
          >
            No offers found
          </Text>
        ) : (
          <FlatList
            horizontal
            data={filteredOffers}
            renderItem={({ item }) => (
              <HorizontalCard
                item={item}
                onPress={() => {
                  if (item.name === "Salon at Home (Women)") {
                    router.push("/offers/womens-salon" as any);
                  }

                  if (item.name === "Men’s Haircut + Beard Combo") {
                    router.push("/offers/mens-haircut" as any);
                  }

                  if (item.name === "Full Body Massage at Home") {
                    router.push("/offers/full-body-massage" as any);
                  }

                  if (item.name === "AC Service & Cleaning") {
                    router.push("/offers/ac-service" as any);
                  }

                  if (item.name === "Refrigerator Repair") {
                    router.push("/offers/refrigerator-repair" as any);
                  }

                  if (item.name === "Home Deep Cleaning") {
                    router.push("/offers/home-deep-cleaning" as any);
                  }

                  if (item.name === "Pest Control Special") {
                    router.push("/offers/pest-control" as any);
                  }

                  if (item.name === "Home Painting Offer") {
                    router.push("/offers/painting-service" as any);
                  }

                  if (item.name === "Laundry & Ironing Combo") {
                    router.push("/offers/laundry-service" as any);
                  }

                  if (item.name === "Carpet Shampoo Cleaning") {
                    router.push("/offers/carpet-cleaning" as any);
                  }

                  if (item.name === "Home Deep Cleaning") {
                    router.push("/categories/home-cleaning" as any);
                  }

                  if (item.name === "Kitchen Cleaning Package") {
                    router.push("/offers/kitchen-cleaning" as any);
                  }

                  if (item.name === "Bathroom Cleaning Service") {
                    router.push("/offers/bathroom-cleaning" as any);
                  }

                  if (item.name === "Wall Mounting & Drilling") {
                    router.push("/offers/wall-mounting" as any);
                  }

                  if (item.name === "Electrician") {
                    router.push("/offers/electrician-services" as any);
                  }

                  if (item.name === "Plumbing") {
                    router.push("/offers/plumbing-services" as any);
                  }

                  if (item.name === "AC Service & Cleaning") {
                    router.push("/offers/ac-repair" as any);
                  }
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}
          />
        )}

        {/* Cleaning Essentials */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Cleaning Essentials</Text>
          <TouchableOpacity onPress={() => router.push("/cleaning" as any)}>
            <Text style={styles.seeAll}>See more</Text>
          </TouchableOpacity>
        </View>

        {filteredEssentials.length === 0 ? (
          <Text
            style={{ textAlign: "center", color: "#6B7280", marginBottom: 10 }}
          >
            No cleaning essentials found
          </Text>
        ) : (
          <FlatList
            horizontal
            data={filteredEssentials} // ✅ filters cleaning essentials
            renderItem={({ item }) => (
              <HorizontalCard
                item={item}
                onPress={() => {
                  if (item.name === "Intense Bathroom Cleaning") {
                    router.push("/cleaning/intense-bathroom");
                  }

                  if (item.name === "Pest Control Service") {
                    router.push("/cleaning/pest-control");
                  }

                  if (item.name === "Apartment Pest Control") {
                    router.push("/cleaning/apartment-pest");
                  }

                  if (item.name === "Bathroom Deep Cleaning") {
                    router.push("/cleaning/bathroom-deep");
                  }

                  if (item.name === "Mattress Cleaning") {
                    router.push("/cleaning/mattress-cleaning");
                  }

                  if (item.name === "Fridge Cleaning") {
                    router.push("/cleaning/fridge-cleaning");
                  }

                  if (item.name === "Carpet Cleaning") {
                    router.push("/cleaning/carpet-cleaning");
                  }

                  if (item.name === "Laundry & Ironing") {
                    router.push("/cleaning/laundry");
                  }
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }} // boxes height
          />
        )}

        {/* Home Repair & Installation */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Home Repair & Installation</Text>
          <TouchableOpacity onPress={() => router.push("/repair" as any)}>
            <Text style={styles.seeAll}>See more</Text>
          </TouchableOpacity>
        </View>

        {filteredRepair.length === 0 ? (
          <Text
            style={{ textAlign: "center", color: "#6B7280", marginBottom: 10 }}
          >
            No repair services found
          </Text>
        ) : (
          <FlatList
            horizontal
            data={filteredRepair} // ✅ filters repair list
            renderItem={({ item }) => (
              <HorizontalCard
                item={item}
                onPress={() => router.push(getRepairRoute(item.id) as any)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }} // ✅ adds space top & bottom
          />
        )}

        {/* Big Promotional Banner */}
        <View style={styles.bigBannerWrapper}>
          <LinearGradient
            colors={specialOffer.gradient as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bigBanner}
          >
            <Image
              source={{ uri: specialOffer.image }}
              style={styles.bigBannerImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.55)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.bigBannerOverlay}
            />
            <View style={styles.bigBannerTextBox}>
              <Text style={styles.bigBannerOffer}>{specialOffer.offer}</Text>
              <Text style={styles.bigBannerTitle}>{specialOffer.title}</Text>
              <Text style={styles.bigBannerSubtitle}>
                {specialOffer.subtitle}
              </Text>
              <TouchableOpacity
                style={styles.bigBannerButton}
                onPress={() => router.push("/special-offer")} // 👈 opens a new screen
              >
                <Text style={styles.bigBannerButtonText}>Explore More</Text>
                <Ionicons name="arrow-forward" size={16} color="#312E81" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* ✅ Recommended Services Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Recommended For You</Text>
          <TouchableOpacity onPress={() => router.push("/recommended" as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {filteredRecommended.length === 0 ? (
          <Text
            style={{ textAlign: "center", color: "#6B7280", marginBottom: 10 }}
          >
            No recommended services found
          </Text>
        ) : (
          <FlatList
            horizontal
            data={filteredRecommended} // ✅ filters recommended section
            renderItem={({ item }) => (
              <MiniServiceCard
                item={item}
                onPress={() => router.push(getRecommendedRoute(item.id) as any)}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 6 }}
          />
        )}

        {/* Rebook in 1 Tap */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Rebook in 1 Tap</Text>
          <TouchableOpacity onPress={() => router.push("/bookings" as any)}>
            <Text style={styles.seeAll}>History</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={rebookItems}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rebookListContent}
          renderItem={({ item }: { item: RebookItem }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.rebookCard}
              onPress={() => router.push(item.route as any)}
            >
              <Image source={{ uri: item.image }} style={styles.rebookImage} />
              <View style={styles.rebookContent}>
                <Text style={styles.rebookName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.rebookMeta}>{item.lastBooked}</Text>
                <View style={styles.rebookBottomRow}>
                  <Text style={styles.rebookPrice}>INR {item.price}</Text>
                  <TouchableOpacity
                    style={styles.rebookButton}
                    onPress={() => router.push(item.route as any)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.rebookButtonText}>Rebook</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Seasonal Bundles */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Seasonal Bundles</Text>
          <TouchableOpacity onPress={() => router.push("/offers" as any)}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={seasonalBundles}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bundleListContent}
          renderItem={({ item }: { item: SeasonalBundleItem }) => (
            <TouchableOpacity activeOpacity={0.9} style={styles.bundleCard}>
              <Image source={{ uri: item.image }} style={styles.bundleImage} />
              <LinearGradient
                colors={["rgba(2,6,23,0.2)", "rgba(2,6,23,0.72)"]}
                style={styles.bundleOverlay}
              />
              <LinearGradient
                colors={item.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.bundleSavePill}
              >
                <Text style={styles.bundleSaveText}>{item.save}</Text>
              </LinearGradient>
              <View style={styles.bundleContent}>
                <Text style={styles.bundleTitle}>{item.title}</Text>
                <Text style={styles.bundleSubtitle}>{item.subtitle}</Text>
                <Text style={styles.bundlePrice}>From INR {item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Customer Reviews */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Customer Reviews</Text>
        </View>
        <FlatList
          horizontal
          data={customerReviews}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewListContent}
          renderItem={({ item }: { item: CustomerReviewItem }) => (
            <View style={styles.reviewCard}>
              <View style={styles.reviewTopRow}>
                <Image source={{ uri: item.avatar }} style={styles.reviewAvatar} />
                <View style={styles.reviewNameWrap}>
                  <Text style={styles.reviewName}>{item.name}</Text>
                  <Text style={styles.reviewService}>{item.service}</Text>
                </View>
                <View style={styles.reviewRatingPill}>
                  <Ionicons name="star" size={12} color="#F59E0B" />
                  <Text style={styles.reviewRatingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{item.comment}</Text>
            </View>
          )}
        />

        {/* Why Choose Us */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Why Choose Us</Text>
        </View>
        <View style={styles.whyChooseGrid}>
          {whyChooseItems.map((item) => (
            <View key={item.id} style={styles.whyChooseCard}>
              <View style={[styles.whyChooseIcon, { backgroundColor: `${item.color}22` }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.whyChooseTitle}>{item.title}</Text>
              <Text style={styles.whyChooseSubtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </View>

        {/* Need Help */}
        <LinearGradient
          colors={["#0F172A", "#1D4ED8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.helpCard}
        >
          <View style={styles.helpTopRow}>
            <View>
              <Text style={styles.helpTitle}>Need Help?</Text>
              <Text style={styles.helpSubtitle}>Our support team is available 24/7.</Text>
            </View>
            <Ionicons name="headset-outline" size={24} color="#BFDBFE" />
          </View>
          <View style={styles.helpButtonRow}>
            <TouchableOpacity
              style={styles.helpButtonPrimary}
              onPress={handleSupportCall}
              activeOpacity={0.85}
            >
              <Ionicons name="call-outline" size={15} color="#0F172A" />
              <Text style={styles.helpButtonPrimaryText}>Call Support</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.helpButtonGhost}
              onPress={handleSupportChat}
              activeOpacity={0.85}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={15} color="#DBEAFE" />
              <Text style={styles.helpButtonGhostText}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.helpButtonGhost}
              onPress={handleSupportEmail}
              activeOpacity={0.85}
            >
              <Ionicons name="mail-outline" size={15} color="#DBEAFE" />
              <Text style={styles.helpButtonGhostText}>Email</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* App Footer */}
        <View style={styles.appFooter}>
          <View style={styles.footerBrandRow}>
            <View style={styles.footerBrandBadge}>
              <Ionicons name="home-outline" size={14} color="#1D4ED8" />
            </View>
            <View>
              <Text style={styles.footerBrandTitle}>urbannn</Text>
              <Text style={styles.footerBrandTagline}>
                Trusted home services at your doorstep
              </Text>
            </View>
          </View>

          <Text style={styles.footerSectionTitle}>Company</Text>
          <View style={styles.footerLinkWrap}>
            {footerCompanyLinks.map((label) => (
              <TouchableOpacity
                key={label}
                style={styles.footerChip}
                onPress={() => handleFooterLinkPress(label)}
                activeOpacity={0.8}
              >
                <Text style={styles.footerChipText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footerSectionTitle}>Support</Text>
          <View style={styles.footerLinkWrap}>
            {footerSupportLinks.map((label) => (
              <TouchableOpacity
                key={label}
                style={styles.footerChip}
                onPress={() => handleFooterLinkPress(label)}
                activeOpacity={0.8}
              >
                <Text style={styles.footerChipText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footerSectionTitle}>Available in</Text>
          <View style={styles.footerCityWrap}>
            {footerTopCities.map((city) => (
              <View key={city} style={styles.footerCityChip}>
                <Text style={styles.footerCityText}>{city}</Text>
              </View>
            ))}
          </View>

          <View style={styles.footerSocialRow}>
            {footerSocials.map((social) => (
              <TouchableOpacity
                key={social.id}
                style={styles.footerSocialBtn}
                onPress={() => handleFooterSocialPress(social.url)}
                activeOpacity={0.8}
              >
                <Ionicons name={social.icon} size={16} color="#1E293B" />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footerDivider} />
          <Text style={styles.footerMetaText}>urbannn v1.0.0 • © 2026 Urbannn Technologies</Text>
        </View>

        {/* 
          ✅ Quick Home Services Section
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeading}>Quick Home Services</Text>
            <TouchableOpacity
              onPress={() => router.push("/quick-services" as any)}
            >
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

        <FlatList
          horizontal
          data={services.slice(0, 6)} // first 6 quick services
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.miniCard, { width: 100 }]}
              onPress={() => {
                router.push(item.route as any);
              }}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: item.color, width: 60, height: 60 },
                ]}
              >
                <Ionicons name={item.icon} size={26} color="#fff" />
              </View>
              <Text
                numberOfLines={1}
                style={{ fontSize: 12, textAlign: "center" }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

//
// ✅ Styles
//
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { flexGrow: 1, padding: 16, paddingBottom: 120 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  locationWrapper: { flexDirection: "row", alignItems: "center" },
  deliverLabel: { fontSize: 12, color: "#6B7280" },
  locationText: { fontSize: 16, fontWeight: "600", color: "#111827" },
  locationHintText: {
    marginTop: 2,
    fontSize: 11,
    color: "#7C3AED",
    fontWeight: "600",
  },
  notificationDot: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  search3DWrapper: {
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#6D28D9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 10,
  },
  search3DWrapperFocused: {
    borderColor: "#C4B5FD",
    shadowColor: "#7C3AED",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  searchContainerFocused: {
    borderWidth: 1,
    borderColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
  },
  searchIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDE9FE",
    marginRight: 8,
  },
  searchInput: { flex: 1, fontSize: 14, fontWeight: "500", color: "#111827" },
  searchHintText: {
    marginTop: 2,
    marginBottom: 14,
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "600",
  },
  searchResultsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 2,
    marginBottom: 14,
  },
  searchResultsTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 6,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  searchResultLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  searchResultName: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  searchResultType: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 1,
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7C3AED",
    shadowColor: "#4C1D95",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  micButtonActive: { backgroundColor: "#DC2626" },
  servicesBannerCard: {
    marginBottom: 18,
    borderRadius: 24,
    padding: 14,
    shadowColor: "#1E3A8A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 7,
  },
  servicesBannerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 14,
  },
  servicesBannerLocationChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    paddingHorizontal: 11,
    paddingVertical: 9,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  servicesBannerLocationLabel: {
    color: "#BFDBFE",
    fontSize: 11,
    fontWeight: "500",
  },
  servicesBannerLocationText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  servicesBannerNotifyBtn: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  servicesBannerNotifyDot: {
    position: "absolute",
    top: 8,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FB7185",
  },
  servicesBannerTitle: {
    color: "#F8FAFC",
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "800",
  },
  servicesBannerSubtitle: {
    marginTop: 5,
    color: "#E2E8F0",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },
  servicesBannerSearchShell: {
    marginTop: 13,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingLeft: 8,
    paddingRight: 52,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  servicesBannerSearchShellFocused: {
    borderColor: "#93C5FD",
  },
  servicesBannerSearchIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  servicesBannerSearchInput: {
    flex: 1,
    minWidth: 0,
    paddingRight: 44,
    paddingVertical: 0,
    height: 20,
    lineHeight: 20,
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "500",
    includeFontPadding: false,
  },
  servicesBannerMicButton: {
    position: "absolute",
    right: 8,
    top: 7,
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },
  servicesBannerPillsRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  servicesBannerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
    backgroundColor: "rgba(15,23,42,0.25)",
  },
  servicesBannerPillText: {
    color: "#E0F2FE",
    fontSize: 11,
    fontWeight: "700",
  },
  servicesBannerLocationNotice: {
    marginTop: -2,
    marginBottom: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#BAE6FD",
    backgroundColor: "#ECFEFF",
    paddingVertical: 11,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  servicesBannerLocationNoticeText: {
    flex: 1,
    fontSize: 14,
    color: "#0C4A6E",
    fontWeight: "500",
  },
  sectionHeader: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    shadowColor: "#334155",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 0,
    color: "#0F172A",
    letterSpacing: 0.2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 4,
    marginTop: 6,
  },
  serviceCard: {
    width: cardWidth + 10,
    paddingTop: 2,
    paddingBottom: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.55)",
    shadowColor: "#0F172A",
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  serviceName: {
    fontSize: 12,
    lineHeight: 15,
    color: "#0F172A",
    textAlign: "center",
    fontWeight: "700",
    width: "100%",
    paddingHorizontal: 2,
    minHeight: 30,
  },
  horizontalCard: {
    backgroundColor: "#fff",
    width: 150,
    borderRadius: 20,
    marginRight: 14,
    shadowColor: "#9498a0ff", // soft gray
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    paddingBottom: 10,
    overflow: "hidden", // ✅ ensures image isn’t hidden or clipped
    position: "relative",
  },

  cardImage: {
    width: "100%",
    height: 100,  // increased height in specialist section
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#ccc",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  }, // ✅ translucent overlay for text
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginHorizontal: 8,
    marginTop: 6,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
    marginTop: 2,
  },
  priceText: { fontSize: 13, color: "#7C3AED", fontWeight: "600" },
  ratingBox: { flexDirection: "row", alignItems: "center" },
  ratingText: { fontSize: 12, color: "#111" },
  seeAll: {
    color: "#6D28D9",
    fontWeight: "700",
    fontSize: 12,
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: "hidden",
  },
  bigBannerWrapper: {
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 2,
  },
  bigBanner: {
    width: width - 32,
    height: 200, // bigger height for big banner
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    shadowColor: "#312E81",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 5,
  },
  bigBannerImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.75,
    borderRadius: 18,
  },
  bigBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bigBannerTextBox: {
    paddingHorizontal: 20,
    zIndex: 2,
  },
  bigBannerOffer: {
    backgroundColor: "rgba(255,255,255,0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 8,
  },
  bigBannerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  bigBannerSubtitle: {
    color: "#f3f4f6",
    fontSize: 13,
    marginBottom: 12,
  },
  bigBannerButton: {
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bigBannerButtonText: {
    color: "#312E81",
    fontWeight: "700",
    fontSize: 13,
  },
  bundleListContent: {
    paddingBottom: 8,
  },
  bundleCard: {
    width: 240,
    height: 172,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#D9E4F6",
    backgroundColor: "#FFFFFF",
  },
  bundleImage: {
    ...StyleSheet.absoluteFillObject,
  },
  bundleOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  bundleSavePill: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  bundleSaveText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  bundleContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingBottom: 11,
  },
  bundleTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  bundleSubtitle: {
    color: "#DBEAFE",
    fontSize: 12,
    marginTop: 2,
  },
  bundlePrice: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 7,
    fontWeight: "700",
  },
  reviewListContent: {
    paddingBottom: 8,
  },
  reviewCard: {
    width: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDE7F5",
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginRight: 12,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  reviewTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  reviewAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E5E7EB",
  },
  reviewNameWrap: {
    flex: 1,
  },
  reviewName: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "700",
  },
  reviewService: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 1,
  },
  reviewRatingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  reviewRatingText: {
    color: "#92400E",
    fontSize: 11,
    fontWeight: "700",
  },
  reviewComment: {
    color: "#334155",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 9,
  },
  whyChooseGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  whyChooseCard: {
    width: "48.5%",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DCE6F7",
    backgroundColor: "#F8FAFF",
    padding: 11,
    marginBottom: 8,
  },
  whyChooseIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  whyChooseTitle: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "700",
  },
  whyChooseSubtitle: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 2,
  },
  helpCard: {
    marginTop: 2,
    marginBottom: 12,
    borderRadius: 18,
    padding: 14,
    shadowColor: "#1D4ED8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  helpTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helpTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  helpSubtitle: {
    color: "#DBEAFE",
    fontSize: 12,
    marginTop: 2,
  },
  helpButtonRow: {
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
  },
  helpButtonPrimary: {
    flex: 1.2,
    backgroundColor: "#DBEAFE",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
  },
  helpButtonPrimaryText: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "700",
  },
  helpButtonGhost: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(219,234,254,0.45)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
    backgroundColor: "rgba(15,23,42,0.2)",
  },
  helpButtonGhostText: {
    color: "#DBEAFE",
    fontSize: 12,
    fontWeight: "700",
  },
  rebookListContent: {
    paddingBottom: 8,
  },
  rebookCard: {
    width: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DCE7F8",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginRight: 12,
    shadowColor: "#1E293B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  rebookImage: {
    width: "100%",
    height: 104,
    backgroundColor: "#E5E7EB",
  },
  rebookContent: {
    padding: 10,
  },
  rebookName: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
  },
  rebookMeta: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 3,
  },
  rebookBottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rebookPrice: {
    color: "#1D4ED8",
    fontSize: 13,
    fontWeight: "700",
  },
  rebookButton: {
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  rebookButtonText: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "700",
  },
  appFooter: {
    marginTop: 6,
    marginBottom: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE6F6",
    backgroundColor: "#F8FBFF",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  footerBrandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 12,
  },
  footerBrandBadge: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DBEAFE",
  },
  footerBrandTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
  },
  footerBrandTagline: {
    color: "#64748B",
    fontSize: 11,
    marginTop: 1,
  },
  footerSectionTitle: {
    color: "#334155",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 7,
  },
  footerLinkWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  footerChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#DCE6F6",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  footerChipText: {
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
  },
  footerCityWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 10,
  },
  footerCityChip: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: "#EEF2FF",
  },
  footerCityText: {
    color: "#3730A3",
    fontSize: 10,
    fontWeight: "600",
  },
  footerSocialRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  footerSocialBtn: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DCE6F6",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  footerDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  footerMetaText: {
    marginTop: 8,
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "500",
  },
  miniCard: {
    backgroundColor: "#fff",
    width: 120,
    borderRadius: 14,
    marginRight: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: 8,
  },
  miniCardImage: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: "#E5E7EB",
  },
  miniCardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
    marginTop: 6,
    paddingHorizontal: 4,
    textAlign: "center",
  },
  miniCardPrice: {
    fontSize: 12,
    color: "#7C3AED",
    fontWeight: "500",
    marginTop: 2,
  },
});
