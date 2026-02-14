import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

type FilterKey = "All" | "Cleaning" | "Repair" | "Salon" | "Electrical";

type CategoryItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  group: Exclude<FilterKey, "All">;
  route: string;
  gradient: readonly [string, string];
};

type CollectionItem = {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  image: string;
};

const filters: FilterKey[] = ["All", "Cleaning", "Repair", "Salon", "Electrical"];

const categories: CategoryItem[] = [
  {
    id: "c1",
    title: "Home Cleaning",
    subtitle: "Kitchen, bathroom, deep clean",
    icon: "sparkles-outline",
    group: "Cleaning",
    route: "/services/CleaningScreen",
    gradient: ["#0EA5E9", "#2563EB"],
  },
  {
    id: "c2",
    title: "Electrician",
    subtitle: "Wiring, switches, lights",
    icon: "flash-outline",
    group: "Electrical",
    route: "/services/ElectricianScreen",
    gradient: ["#F59E0B", "#EA580C"],
  },
  {
    id: "c3",
    title: "Plumbing",
    subtitle: "Leakage, fittings, pipelines",
    icon: "water-outline",
    group: "Repair",
    route: "/services/PlumbingScreen",
    gradient: ["#14B8A6", "#0EA5E9"],
  },
  {
    id: "c4",
    title: "AC Repair",
    subtitle: "Service, gas, cooling issues",
    icon: "snow-outline",
    group: "Repair",
    route: "/services/ACRepairScreen",
    gradient: ["#0284C7", "#4F46E5"],
  },
  {
    id: "c5",
    title: "Men's Salon",
    subtitle: "Haircut, shave, grooming",
    icon: "cut-outline",
    group: "Salon",
    route: "/services/MensSalonScreen",
    gradient: ["#7C3AED", "#9333EA"],
  },
  {
    id: "c6",
    title: "Women's Salon",
    subtitle: "Facial, wax, beauty care",
    icon: "woman-outline",
    group: "Salon",
    route: "/services/WomensSalonScreen",
    gradient: ["#DB2777", "#EC4899"],
  },
  {
    id: "c7",
    title: "Massage & Spa",
    subtitle: "Relaxation at home",
    icon: "heart-outline",
    group: "Salon",
    route: "/services/MassageSpaScreen",
    gradient: ["#BE185D", "#F43F5E"],
  },
  {
    id: "c8",
    title: "Appliance Repair",
    subtitle: "Washing machine, fridge, TV",
    icon: "tv-outline",
    group: "Repair",
    route: "/services/ApplianceRepairScreen",
    gradient: ["#0891B2", "#2563EB"],
  },
];

const collections: CollectionItem[] = [
  {
    id: "k1",
    title: "Cleaning Essentials",
    subtitle: "Bathroom, mattress, carpet and more",
    route: "/cleaning",
    image:
      "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "k2",
    title: "Home Repair Hub",
    subtitle: "Door lock, carpentry, painting",
    route: "/repair",
    image:
      "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "k3",
    title: "Offers & Discounts",
    subtitle: "Best deals updated daily",
    route: "/special-offer",
    image:
      "https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "k4",
    title: "Premium Specials",
    subtitle: "Combo packs with priority slots",
    route: "/special-offer",
    image:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const dealCards = [
  {
    id: "d1",
    title: "Bathroom + Kitchen Bundle",
    sub: "Save up to 30%",
    route: "/offers/kitchen-cleaning",
    colors: ["#1D4ED8", "#0EA5E9"] as const,
  },
  {
    id: "d2",
    title: "AC Summer Plan",
    sub: "Fast slots available",
    route: "/offers/ac-service",
    colors: ["#0F766E", "#0EA5A4"] as const,
  },
  {
    id: "d3",
    title: "Salon Combo Deals",
    sub: "Home visit included",
    route: "/offers/womens-salon",
    colors: ["#BE185D", "#EC4899"] as const,
  },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedFilter, setSelectedFilter] = useState<FilterKey>("All");
  const [query, setQuery] = useState("");

  const columns = width >= 900 ? 3 : 2;
  const horizontalPadding = 16;
  const gap = 12;
  const categoryCardWidth =
    (width - horizontalPadding * 2 - gap * (columns - 1)) / columns;

  const filteredCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return categories.filter((item) => {
      const groupMatch = selectedFilter === "All" || item.group === selectedFilter;
      const queryMatch =
        normalized.length === 0 ||
        item.title.toLowerCase().includes(normalized) ||
        item.subtitle.toLowerCase().includes(normalized);
      return groupMatch && queryMatch;
    });
  }, [query, selectedFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient
          colors={["#0F172A", "#1E3A8A", "#0EA5E9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text style={styles.heroTitle}>Find The Right Category</Text>
          <Text style={styles.heroSub}>
            Browse by service type, compare options, and book in one tap.
          </Text>
          <TouchableOpacity
            style={styles.heroCta}
            onPress={() => router.push("/special-offer")}
          >
            <Text style={styles.heroCtaText}>View top deals</Text>
            <Ionicons name="arrow-forward" size={14} color="#1E3A8A" />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#64748B" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search categories or services"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
          {query.length > 0 ? (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.filterRow}>
          {filters.map((filter) => {
            const active = filter === selectedFilter;
            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setSelectedFilter(filter)}
                style={[styles.filterChip, active && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, active && styles.filterTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Categories</Text>
          <Text style={styles.sectionMeta}>{filteredCategories.length} found</Text>
        </View>

        <View style={styles.grid}>
          {filteredCategories.map((item, index) => (
            <MotiView
              key={item.id}
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: "timing",
                duration: 300,
                delay: index * 50,
                easing: Easing.out(Easing.cubic),
              }}
              style={{
                width: categoryCardWidth,
                marginBottom: gap,
                marginRight: (index + 1) % columns === 0 ? 0 : gap,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.categoryCard}
                onPress={() => router.push(item.route as any)}
              >
                <LinearGradient
                  colors={item.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.categoryIconWrap}
                >
                  <Ionicons name={item.icon} size={22} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.categoryTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.categorySub}>
                  {item.subtitle}
                </Text>
              </TouchableOpacity>
            </MotiView>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Collections</Text>
          <TouchableOpacity onPress={() => router.push("/special-offer" as any)}>
            <Text style={styles.linkText}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={collections}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.collectionCard}
              onPress={() => router.push(item.route as any)}
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.collectionImage}
                imageStyle={styles.collectionImageRadius}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.65)"]}
                  style={styles.collectionOverlay}
                >
                  <Text style={styles.collectionTitle}>{item.title}</Text>
                  <Text style={styles.collectionSub}>{item.subtitle}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Deals</Text>
          <TouchableOpacity onPress={() => router.push("/special-offer")}>
            <Text style={styles.linkText}>Explore</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          data={dealCards}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.dealCard}
              onPress={() => router.push(item.route as any)}
            >
              <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.dealGradient}
              >
                <Text style={styles.dealTitle}>{item.title}</Text>
                <Text style={styles.dealSub}>{item.sub}</Text>
                <View style={styles.dealAction}>
                  <Text style={styles.dealActionText}>Open deal</Text>
                  <Ionicons name="arrow-forward" size={14} color="#E0F2FE" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />

        <LinearGradient
          colors={["#111827", "#1E3A8A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.footerCta}
        >
          <Text style={styles.footerTitle}>Need help picking a category?</Text>
          <Text style={styles.footerSub}>
            Start with a quick booking and our team will assign the right expert.
          </Text>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() =>
              router.push({
                pathname: "/offers/mens-booking",
                params: { service: "General Home Service", amount: "499" },
              } as any)
            }
          >
            <Text style={styles.footerButtonText}>Book General Service</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  hero: {
    marginTop: 6,
    borderRadius: 18,
    padding: 16,
  },
  heroTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#F8FAFC",
  },
  heroSub: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
    color: "#DBEAFE",
    maxWidth: "92%",
  },
  heroCta: {
    marginTop: 14,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  heroCtaText: {
    color: "#1E3A8A",
    fontSize: 12,
    fontWeight: "700",
  },
  searchWrap: {
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    alignItems: "center",
    flexDirection: "row",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#0F172A",
  },
  filterRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: "#EEF2FF",
  },
  filterChipActive: {
    backgroundColor: "#4F46E5",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3730A3",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    marginTop: 18,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  sectionMeta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  linkText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F46E5",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  categoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 12,
    minHeight: 142,
    shadowColor: "#334155",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  categorySub: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 17,
  },
  collectionCard: {
    width: 236,
    height: 150,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  collectionImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  collectionImageRadius: {
    borderRadius: 16,
  },
  collectionOverlay: {
    padding: 12,
  },
  collectionTitle: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "700",
  },
  collectionSub: {
    marginTop: 4,
    color: "#CBD5E1",
    fontSize: 12,
  },
  dealCard: {
    width: 220,
    marginRight: 12,
    borderRadius: 14,
    overflow: "hidden",
  },
  dealGradient: {
    padding: 14,
    minHeight: 120,
    justifyContent: "space-between",
  },
  dealTitle: {
    color: "#F8FAFC",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },
  dealSub: {
    color: "#DBEAFE",
    fontSize: 12,
  },
  dealAction: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dealActionText: {
    color: "#E0F2FE",
    fontSize: 12,
    fontWeight: "700",
  },
  footerCta: {
    marginTop: 20,
    borderRadius: 18,
    padding: 16,
  },
  footerTitle: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "800",
  },
  footerSub: {
    marginTop: 6,
    color: "#BFDBFE",
    fontSize: 12,
    lineHeight: 18,
  },
  footerButton: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  footerButtonText: {
    color: "#1E3A8A",
    fontSize: 12,
    fontWeight: "800",
  },
});
