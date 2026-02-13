import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");

type HeroBanner = {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  gradient: readonly [string, string, string];
};

type OfferCard = {
  id: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: string;
  rating: number;
  eta: string;
  image: string;
};

const heroBanners: HeroBanner[] = [
  {
    id: "hb-1",
    title: "Monsoon Home Revival",
    subtitle: "Deep cleaning + pest protection in one smart package",
    tag: "Save up to 35%",
    gradient: ["#0F172A", "#1E3A8A", "#0EA5E9"],
    image:
      "https://images.pexels.com/photos/4239148/pexels-photo-4239148.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "hb-2",
    title: "Repair Priority Slot",
    subtitle: "Fast-track technician dispatch with weekend availability",
    tag: "Priority booking",
    gradient: ["#312E81", "#6D28D9", "#C026D3"],
    image:
      "https://images.pexels.com/photos/4792479/pexels-photo-4792479.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "hb-3",
    title: "Premium Care Bundle",
    subtitle: "Salon, spa and appliance care with one checkout",
    tag: "Combo deal",
    gradient: ["#14532D", "#047857", "#0D9488"],
    image:
      "https://images.pexels.com/photos/3865792/pexels-photo-3865792.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const specialOffers: OfferCard[] = [
  {
    id: "of-1",
    title: "Bathroom + Kitchen Deep Clean",
    price: 1599,
    oldPrice: 2299,
    discount: "30% OFF",
    rating: 4.9,
    eta: "2.5 hrs",
    image:
      "https://images.pexels.com/photos/4239147/pexels-photo-4239147.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "of-2",
    title: "AC Service + Gas Check",
    price: 999,
    oldPrice: 1399,
    discount: "28% OFF",
    rating: 4.8,
    eta: "75 mins",
    image:
      "https://images.pexels.com/photos/3807277/pexels-photo-3807277.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "of-3",
    title: "Women Salon Glow Package",
    price: 1399,
    oldPrice: 1899,
    discount: "26% OFF",
    rating: 4.9,
    eta: "90 mins",
    image:
      "https://images.pexels.com/photos/3997380/pexels-photo-3997380.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "of-4",
    title: "Sofa + Carpet Premium Care",
    price: 1299,
    oldPrice: 1799,
    discount: "27% OFF",
    rating: 4.7,
    eta: "2 hrs",
    image:
      "https://images.pexels.com/photos/4107282/pexels-photo-4107282.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const benefits = [
  "Verified professionals",
  "Fixed transparent pricing",
  "Free reschedule before 2 hours",
];

export default function SpecialOfferScreen() {
  const router = useRouter();
  const [activeBanner, setActiveBanner] = useState(0);

  const bannerDescription = useMemo(
    () => heroBanners[activeBanner]?.subtitle ?? "",
    [activeBanner]
  );

  const handleBookNow = (offer: OfferCard) => {
    router.push({
      pathname: "/offers/mens-booking",
      params: {
        service: offer.title,
        amount: String(offer.price),
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <FlatList
        data={specialOffers}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <LinearGradient
              colors={["#0B1020", "#111827", "#172554"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            >
              <View style={styles.headerTop}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                  <Ionicons name="chevron-back" size={20} color="#E2E8F0" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Explore More Offers</Text>
                <View style={styles.backBtnGhost} />
              </View>

              <Text style={styles.headerSub}>
                Curated premium deals with faster booking slots.
              </Text>

              <View style={styles.bannerFrame}>
                <Carousel
                  loop
                  width={width - 32}
                  height={220}
                  data={heroBanners}
                  autoPlay
                  autoPlayInterval={3200}
                  scrollAnimationDuration={700}
                  pagingEnabled
                  snapEnabled
                  onProgressChange={(_, absoluteProgress) => {
                    const index =
                      ((Math.round(absoluteProgress) % heroBanners.length) +
                        heroBanners.length) %
                      heroBanners.length;
                    if (index !== activeBanner) {
                      setActiveBanner(index);
                    }
                  }}
                  renderItem={({ item }) => (
                    <LinearGradient
                      colors={item.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.heroCard}
                    >
                      <Image source={{ uri: item.image }} style={styles.heroImage} />
                      <LinearGradient
                        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)"]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={styles.heroOverlay}
                      />

                      <View style={styles.heroContent}>
                        <Text style={styles.heroTag}>{item.tag}</Text>
                        <Text style={styles.heroTitle}>{item.title}</Text>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          style={styles.heroButton}
                          onPress={() => setActiveBanner(heroBanners.indexOf(item))}
                        >
                          <Text style={styles.heroButtonText}>Active Deal</Text>
                          <Ionicons name="flash" size={13} color="#1E3A8A" />
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  )}
                />

                <View style={styles.connectedDotsRow}>
                  {heroBanners.map((_, index) => {
                    const isActive = index === activeBanner;
                    return (
                      <MotiView
                        key={index}
                        style={{ marginHorizontal: 2 }}
                        animate={{
                          width: isActive ? 28 : 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: isActive ? "#60A5FA" : "#334155",
                        }}
                        transition={{
                          type: "timing",
                          duration: 220,
                          easing: Easing.out(Easing.cubic),
                        }}
                      />
                    );
                  })}
                </View>
              </View>

              <Text style={styles.bannerSubtext}>{bannerDescription}</Text>
            </LinearGradient>

            <View style={styles.listHeaderContent}>
              <View style={styles.benefitRow}>
                {benefits.map((item) => (
                  <View key={item} style={styles.benefitChip}>
                    <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
                    <Text style={styles.benefitText}>{item}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.listHeading}>Book these special offers</Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 320, delay: index * 80 }}
            style={styles.offerCardWrap}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.offerCard}
              onPress={() => handleBookNow(item)}
            >
              <Image source={{ uri: item.image }} style={styles.offerImage} />
              <View style={styles.offerBody}>
                <View style={styles.offerTopRow}>
                  <Text numberOfLines={1} style={styles.offerTitle}>
                    {item.title}
                  </Text>
                  <View style={styles.discountPill}>
                    <Text style={styles.discountPillText}>{item.discount}</Text>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.ratingPill}>
                    <Ionicons name="star" size={12} color="#F59E0B" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.metaSep}>•</Text>
                  <Text style={styles.etaText}>Avg time {item.eta}</Text>
                </View>

                <View style={styles.priceRow}>
                  <Text style={styles.newPrice}>₹{item.price}</Text>
                  <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity
                    style={styles.bookButton}
                    onPress={() => handleBookNow(item)}
                  >
                    <Text style={styles.bookButtonText}>Book now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </MotiView>
        )}
        ListFooterComponent={
          <View style={styles.footerNoteWrap}>
            <Text style={styles.footerNote}>
              Prices shown are limited-time promotional rates.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 14,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(148,163,184,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnGhost: {
    width: 34,
    height: 34,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#F8FAFC",
    letterSpacing: 0.2,
  },
  headerSub: {
    marginTop: 10,
    color: "#CBD5E1",
    fontSize: 13,
    marginBottom: 10,
  },
  bannerFrame: {
    alignItems: "center",
  },
  heroCard: {
    width: width - 32,
    height: 220,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    padding: 16,
  },
  heroTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.24)",
    color: "#F8FAFC",
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
  },
  heroTitle: {
    color: "#F8FAFC",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
    maxWidth: "90%",
    marginBottom: 10,
  },
  heroButton: {
    alignSelf: "flex-start",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  heroButtonText: {
    color: "#1E3A8A",
    fontWeight: "700",
    fontSize: 12,
  },
  connectedDotsRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerSubtext: {
    marginTop: 8,
    fontSize: 12,
    color: "#BFDBFE",
    textAlign: "center",
    paddingHorizontal: 6,
  },
  listContent: {
    paddingBottom: 42,
  },
  listHeaderContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  benefitRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  benefitChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#ECFDF3",
    borderColor: "#BBF7D0",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  benefitText: {
    color: "#14532D",
    fontSize: 11,
    fontWeight: "700",
  },
  listHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  offerCardWrap: {
    marginBottom: 12,
    marginHorizontal: 16,
  },
  offerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    shadowColor: "#334155",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  offerImage: {
    width: "100%",
    height: 170,
    backgroundColor: "#E2E8F0",
  },
  offerBody: {
    padding: 12,
  },
  offerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  offerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  discountPill: {
    backgroundColor: "#0EA5E9",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountPillText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  metaRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
  },
  ratingText: {
    color: "#92400E",
    fontSize: 11,
    fontWeight: "700",
  },
  metaSep: {
    marginHorizontal: 7,
    color: "#94A3B8",
  },
  etaText: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
  },
  priceRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  newPrice: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
  },
  oldPrice: {
    color: "#94A3B8",
    fontSize: 12,
    textDecorationLine: "line-through",
    marginLeft: 6,
  },
  bookButton: {
    backgroundColor: "#1D4ED8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  footerNoteWrap: {
    marginTop: 6,
    alignItems: "center",
  },
  footerNote: {
    fontSize: 11,
    color: "#64748B",
    textAlign: "center",
  },
});
