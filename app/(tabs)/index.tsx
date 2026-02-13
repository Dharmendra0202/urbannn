import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Carousel from "react-native-reanimated-carousel";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { Easing } from "react-native-reanimated";
import HorizontalCard from "@/components/HorizontalCard";
import {
  getRecommendedRoute,
  recommendedServices,
} from "@/constants/recommended-services";




// const router = useRouter();

const { width } = Dimensions.get("window");
const cardWidth = (width - 80) / 4;

// ✅ Interfaces
interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  offer: string;
  gradient?: readonly string[];
  image: string;
}
const fallbackGradient: readonly string[] = ["#7C3AED", "#A855F7"];

interface ServiceItem {
  id: number;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}

interface HorizontalItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

// ✅ Fallback Gradient
// ✅ Carousel Data
const carouselData: CarouselItem[] = [
  {
    id: "1",
    title: "Salon at Home",
    subtitle: "Premium grooming services",
    offer: "20% OFF",
    gradient: ["#A855F7", "#EC4899"],
    image:
      "https://images.pexels.com/photos/4107281/pexels-photo-4107281.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    title: "AC Repair",
    subtitle: "Cool comfort all summer",
    offer: "10% OFF",
    gradient: ["#06B6D4", "#3B82F6"],
    image:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    title: "Home Cleaning",
    subtitle: "Spotless and refreshing",
    offer: "15% OFF",
    gradient: ["#8B5CF6", "#7C3AED"],
    image:
      "https://images.unsplash.com/photo-1581579185169-1c9a9c97bd0b?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: "4",
    title: "Pest Control",
    subtitle: "Say goodbye to unwanted guests",
    offer: "25% OFF",
    gradient: ["#F97316", "#F59E0B"],
    image:
      "https://images.pexels.com/photos/6197120/pexels-photo-6197120.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "5",
    title: "Painting Service",
    subtitle: "Transform your walls with color",
    offer: "30% OFF",
    gradient: ["#EC4899", "#F43F5E"],
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "6",
    title: "Appliance Repair",
    subtitle: "Fast fixes, reliable service",
    offer: "15% OFF",
    gradient: ["#06B6D4", "#0EA5E9"],
    image:
      "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "7",
    title: "Home Décor",
    subtitle: "Style your space beautifully",
    offer: "10% OFF",
    gradient: ["#7C3AED", "#A855F7"],
    image:
      "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "8",
    title: "Gardening",
    subtitle: "Refresh your outdoors",
    offer: "20% OFF",
    gradient: ["#22C55E", "#16A34A"],
    image:
      "https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

// ✅ Services
const services: ServiceItem[] = [
  { id: 1, name: "Cleaning", icon: "sparkles-outline", color: "#8B5CF6" },
  { id: 2, name: "Electrician", icon: "flash-outline", color: "#F59E0B" },
  { id: 3, name: "Plumbing", icon: "water-outline", color: "#3B82F6" },
  { id: 4, name: "AC Repair", icon: "snow-outline", color: "#06B6D4" },
  { id: 5, name: "Men’s Salon", icon: "cut-outline", color: "#22C55E" },
  { id: 6, name: "Women’s Salon", icon: "woman-outline", color: "#EC4899" },
  { id: 7, name: "Massage & Spa", icon: "heart-outline", color: "#EF4444" },
  { id: 8, name: "Appliance Repair", icon: "tv-outline", color: "#6366F1" },
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


const homeRepair: HorizontalItem[] = [
  {
    id: "1",
    name: "Carpentry Work",
    price: 799,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/4505170/pexels-photo-4505170.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "2",
    name: "Plumbing Fix",
    price: 599,
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/5854186/pexels-photo-5854186.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "3",
    name: "Painting Service",
    price: 1999,
    rating: 4.9,
    image:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "4",
    name: "Wall Mounting & Drilling",
    price: 499,
    rating: 4.5,
    image:
      "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "5",
    name: "Electrical Installation",
    price: 699,
    rating: 4.8,
    image:
      "https://images.pexels.com/photos/3825582/pexels-photo-3825582.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "6",
    name: "Curtain & Rod Setup",
    price: 899,
    rating: 4.6,
    image:
      "https://images.pexels.com/photos/6207825/pexels-photo-6207825.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "7",
    name: "Door Lock Repair",
    price: 499,
    rating: 4.4,
    image:
      "https://images.pexels.com/photos/4792485/pexels-photo-4792485.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  // ✅ Derived filtered lists based on search
  const filteredSpecialists = specialists.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredOffers = offers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEssentials = cleaningEssentials.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRepair = homeRepair.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRecommended = recommendedServices.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Location state
  const [location, setLocation] = useState<string>("Tap to enable location");
  const [loadingLocation, setLoadingLocation] = useState<boolean>(false);

  // ✅ Function to fetch location (can be triggered manually)
  const handleLocationFetch = async () => {
    try {
      setLoadingLocation(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permission denied");
        setLoadingLocation(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const reverse = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      if (reverse.length > 0) {
        const { city, region } = reverse[0];
        setLocation(`${city ?? "Unknown"}, ${region ?? ""}`);
      } else {
        setLocation(
          `Lat: ${loc.coords.latitude.toFixed(
            2
          )}, Lon: ${loc.coords.longitude.toFixed(2)}`
        );
      }
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.locationWrapper}
            onPress={handleLocationFetch}
          >
            <Ionicons name="location-outline" size={20} color="#7C3AED" />
            <View>
              <Text style={styles.deliverLabel}>Deliver to</Text>
              <Text style={styles.locationText}>
                {loadingLocation ? "Detecting..." : location}{" "}
                <Text style={{ color: "#A855F7" }}>▼</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#111" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Search for services..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Offers Carousel */}
        <View style={styles.carouselWrapper}>
          <Carousel
            loop
            width={width - 32}
            height={180}
            autoPlay
            autoPlayInterval={3500}
            data={carouselData}
            scrollAnimationDuration={800}
            onSnapToItem={(index: number) => {
              setCurrentIndex(index);
            }}
            renderItem={({ item }: { item: CarouselItem }) => (
              <LinearGradient
                {...({
                  colors: item.gradient ?? fallbackGradient,
                  start: { x: 0, y: 0 },
                  end: { x: 1, y: 1 },
                  style: styles.gradientCard,
                } as any)}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />

                <View style={styles.carouselTextBox}>
                  <Text style={styles.carouselOffer}>{item.offer}</Text>
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                  <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
                  <TouchableOpacity style={styles.claimButton}>
                    <Text style={{ color: "#000", fontWeight: "600" }}>
                      Claim Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            )}
          />

          {/* ✅ Animated Connected Dots */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {carouselData.map((_, index) => {
              const isActive = currentIndex === index;

              return (
                <MotiView
                  key={index}
                  animate={{
                    width: isActive ? 30 : 10, // 🔥 stretched active dot
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: isActive ? "#7C3AED" : "#D1D5DB",
                    marginHorizontal: isActive ? 2 : 5, // closer spacing for connected feel
                  }}
                  transition={{
                    type: "timing",
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                  }}
                />
              );
            })}
          </View>

          {/* ✅ Pagination Dots */}
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            {carouselData.map((_, index) => {
              const isActive = currentIndex === index;

              return (
                <MotiView
                  key={index}
                  from={{ opacity: 0.5, scale: 0.8, translateY: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1.4 : 0.8,
                    translateY: isActive ? -2 : 0, // slight lift animation
                  }}
                  transition={{
                    type: "timing",
                    duration: 400,
                    easing: Easing.out(Easing.cubic),
                  }}
                  style={{
                    width: isActive ? 10 : 8,
                    height: isActive ? 10 : 8,
                    borderRadius: 5,
                    backgroundColor: isActive ? "#7C3AED" : "#D1D5DB",
                    marginHorizontal: 5,
                  }}
                />
              );
            })}
          </View> */}
        </View>

        {/* Services */}
        <Text style={styles.sectionHeading}>Services</Text>
        <View style={styles.grid}>
          {services.map((service, index) => (
            <MotiView
              key={service.id}
              from={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 80, type: "timing" }}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.serviceCard}
                onPress={() =>
                  router.push(
                    `/services/${service.name.replace(
                      /[^\w]/g,
                      "",
                    )}Screen` as any,
                  )
                }
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: service.color },
                  ]}
                >
                  <Ionicons name={service.icon} size={28} color="#fff" />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
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
                onPress={() => {
                  if (item.name === "Carpentry Work") {
                    router.push("/repair/carpentry" as any);
                  }

                  if (item.name === "Plumbing Fix") {
                    router.push("/repair/plumbing" as any);
                  }

                  if (item.name === "Painting Service") {
                    router.push("/repair/painting" as any);
                  }

                  if (item.name === "Wall Mounting & Drilling") {
                    router.push("/repair/wall-mounting" as any);
                  }

                  if (item.name === "Electrical Installation") {
                    router.push("/repair/electrical-installation" as any);
                  }

                  if (item.name === "Curtain & Rod Setup") {
                    router.push("/repair/curtain-setup" as any);
                  }

                  if (item.name === "Door Lock Repair") {
                    router.push("/repair/door-lock" as any);
                  }
                }}
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
                <Text style={{ color: "#000", fontWeight: "600" }}>
                  Explore Now
                </Text>
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
                const routePath = `/services/${item.name.replace(
                  /[^\w]/g,
                  ""
                )}`;
                router.push(routePath as any);
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
  notificationDot: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#111" },
  micButton: { backgroundColor: "#7C3AED", padding: 8, borderRadius: 8 },
  carouselWrapper: { alignItems: "center", marginBottom: 25 },
  gradientCard: {
    width: width - 32,
    height: 180,  // increased height for carousel
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    marginBottom: 12,
  },
  carouselImage: {
    ...StyleSheet.absoluteFillObject,
    // opacity: 0.25,
    borderRadius: 16,
    opacity: 1, // ✅ make the background image visible
    resizeMode: "cover", // ✅ ensures proper scaling
  },
  carouselTextBox: { padding: 16, justifyContent: "flex-end", height: "100%" },
  carouselOffer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  carouselTitle: { fontSize: 18, fontWeight: "700", color: "#fff" },
  carouselSubtitle: { fontSize: 13, color: "#F3F4F6", marginBottom: 10 },
  claimButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  sectionHeader: {
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  serviceCard: {
    width: cardWidth + 10,
    alignItems: "center",
    marginBottom: 23,
  },
  iconContainer: {
    width: 65,   // height and width for circular icon background
    height: 65,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceName: {
    fontSize: 13,
    color: "#111827",
    textAlign: "center",
    fontWeight: "600",
    width: 90,
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
  seeAll: { color: "#7C3AED", fontWeight: "500" },
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
  },
  bigBannerImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.25,
    borderRadius: 18,
  },
  bigBannerTextBox: {
    paddingHorizontal: 20,
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
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: "flex-start",
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
