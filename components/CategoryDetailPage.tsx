import React, { useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { CategoryDetail } from "@/constants/category-details";

const { width } = Dimensions.get("window");
const slideWidth = width - 52;

const headingFont = Platform.select({
  ios: "Georgia",
  android: "serif",
  default: undefined,
});

const bodyFont = Platform.select({
  ios: "AvenirNext-Regular",
  android: "sans-serif",
  default: undefined,
});

const uiFont = Platform.select({
  ios: "AvenirNext-DemiBold",
  android: "sans-serif-medium",
  default: undefined,
});

type Props = {
  service: CategoryDetail;
};

export default function CategoryDetailPage({ service }: Props) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const packagePrice = service.packages[selectedPackage]?.price ?? service.startPrice;

  const addOnTotal = useMemo(
    () =>
      (service.addOns ?? [])
        .filter((item) => selectedAddOns.includes(item.id))
        .reduce((sum, item) => sum + item.price, 0),
    [selectedAddOns, service.addOns],
  );

  const totalPrice = packagePrice + addOnTotal;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const onSlideScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / slideWidth);
    if (index >= 0 && index < service.gallery.length) {
      setActiveSlide(index);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={service.heroGradient} style={styles.hero}>
          <Image source={{ uri: service.heroImage }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Ionicons name="chevron-back" size={22} color="#0F172A" />
          </TouchableOpacity>

          <View style={styles.heroBody}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{service.offerLabel}</Text>
            </View>
            <Text style={styles.heroTitle}>{service.title}</Text>
            <Text style={styles.heroSubtitle}>{service.subtitle}</Text>
          </View>
        </LinearGradient>

        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.metricText}>{service.rating}</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="briefcase-outline" size={16} color="#15803D" />
            <Text style={styles.metricText}>{service.completedJobs}</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="time-outline" size={16} color="#2563EB" />
            <Text style={styles.metricText}>{service.responseTime}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this service</Text>
          <Text style={styles.bodyText}>{service.overview}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Checklist</Text>
          {service.checklist.map((item) => (
            <View key={item} style={styles.row}>
              <Ionicons name="checkmark-circle" size={18} color="#0F766E" />
              <Text style={styles.rowText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools and chemicals used</Text>
          <View style={styles.toolWrap}>
            {service.productHighlights.map((item) => (
              <View key={item} style={styles.toolChip}>
                <Ionicons name="flask-outline" size={14} color="#0C4A6E" />
                <Text style={styles.toolText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service snapshots</Text>
          <Text style={styles.hintText}>
            Swipe to view live service moments and expected output quality.
          </Text>

          <ScrollView
            horizontal
            snapToInterval={slideWidth}
            decelerationRate="fast"
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onSlideScrollEnd}
            contentContainerStyle={styles.sliderTrack}
          >
            {service.gallery.map((item) => (
              <View key={item.id} style={styles.slideCard}>
                <Image source={{ uri: item.image }} style={styles.slideImage} />
                <View style={styles.slideBody}>
                  <Text style={styles.slideTitle}>{item.title}</Text>
                  <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.dotRow}>
            {service.gallery.map((item, index) => (
              <View
                key={item.id}
                style={[styles.dot, activeSlide === index && styles.dotActive]}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How we execute</Text>
          {service.processSteps.map((step, index) => (
            <View key={step} style={styles.processRow}>
              <View style={styles.stepDot}>
                <Text style={styles.stepText}>{index + 1}</Text>
              </View>
              <Text style={styles.rowText}>{step}</Text>
            </View>
          ))}
        </View>

        {service.addOns?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Add-ons</Text>
            {service.addOns.map((item) => {
              const active = selectedAddOns.includes(item.id);

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.addOnRow, active && styles.addOnRowActive]}
                  onPress={() => toggleAddOn(item.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.addOnContent}>
                    <Text style={styles.addOnTitle}>{item.label}</Text>
                    <Text style={styles.addOnPrice}>+₹{item.price}</Text>
                  </View>
                  <Ionicons
                    name={active ? "checkbox" : "square-outline"}
                    size={22}
                    color={active ? "#0F766E" : "#64748B"}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose package</Text>
          {service.packages.map((pkg, index) => {
            const isActive = selectedPackage === index;

            return (
              <TouchableOpacity
                key={pkg.id}
                style={[styles.packageCard, isActive && styles.packageCardActive]}
                activeOpacity={0.9}
                onPress={() => setSelectedPackage(index)}
              >
                <View style={styles.packageHeader}>
                  <Text style={styles.packageTitle}>{pkg.name}</Text>
                  {pkg.badge ? (
                    <View style={styles.packageBadge}>
                      <Text style={styles.packageBadgeText}>{pkg.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.packageMeta}>{pkg.duration}</Text>
                <Text style={styles.packageDescription}>{pkg.description}</Text>
                <Text style={styles.packagePrice}>₹{pkg.price}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <LinearGradient colors={["#1E293B", "#0F172A"]} style={styles.noteBanner}>
          <Text style={styles.noteTitle}>Service assurance</Text>
          <Text style={styles.noteText}>{service.serviceNote}</Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          {service.faqs.map((faq, index) => {
            const expanded = openFaq === index;

            return (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqCard}
                activeOpacity={0.85}
                onPress={() => setOpenFaq((prev) => (prev === index ? null : index))}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons
                    name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
                    size={18}
                    color="#64748B"
                  />
                </View>
                {expanded ? <Text style={styles.faqAnswer}>{faq.answer}</Text> : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total payable</Text>
          <Text style={styles.bottomPrice}>₹{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: {
                service: service.title,
                amount: String(totalPrice),
              },
            } as any)
          }
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingBottom: 120 },
  hero: {
    height: 280,
    margin: 14,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 18,
  },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 6, 23, 0.38)",
  },
  backButton: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 3,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroBody: { zIndex: 2 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
  },
  badgeText: {
    color: "#111827",
    fontSize: 11,
    fontFamily: uiFont,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 30,
    lineHeight: 35,
    fontFamily: headingFont,
  },
  heroSubtitle: {
    color: "#E2E8F0",
    marginTop: 6,
    fontSize: 14,
    maxWidth: "88%",
    lineHeight: 20,
    fontFamily: bodyFont,
  },
  metricRow: {
    marginHorizontal: 14,
    marginTop: 2,
    flexDirection: "row",
    gap: 8,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE4EE",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  metricText: {
    color: "#0F172A",
    fontSize: 12,
    textAlign: "center",
    fontFamily: uiFont,
  },
  section: {
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DCE4EE",
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    lineHeight: 25,
    fontFamily: headingFont,
    marginBottom: 8,
  },
  bodyText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: bodyFont,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  rowText: {
    flex: 1,
    color: "#1E293B",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: bodyFont,
  },
  toolWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  toolChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#BAE6FD",
    backgroundColor: "#F0F9FF",
  },
  toolText: {
    color: "#0C4A6E",
    fontSize: 12,
    fontFamily: uiFont,
  },
  hintText: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 10,
    fontFamily: bodyFont,
  },
  sliderTrack: {
    paddingRight: 8,
  },
  slideCard: {
    width: slideWidth,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DCE4EE",
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    marginRight: 10,
  },
  slideImage: {
    width: "100%",
    height: 170,
  },
  slideBody: {
    padding: 10,
  },
  slideTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontFamily: uiFont,
  },
  slideSubtitle: {
    color: "#475569",
    marginTop: 3,
    fontSize: 12,
    lineHeight: 17,
    fontFamily: bodyFont,
  },
  dotRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#CBD5E1",
  },
  dotActive: {
    width: 18,
    backgroundColor: "#0F766E",
  },
  processRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D4ED8",
  },
  stepText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: uiFont,
  },
  addOnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  addOnRowActive: {
    backgroundColor: "#F0FDFA",
  },
  addOnContent: {
    flex: 1,
    paddingRight: 10,
  },
  addOnTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontFamily: uiFont,
  },
  addOnPrice: {
    color: "#0F766E",
    marginTop: 2,
    fontSize: 13,
    fontFamily: bodyFont,
  },
  packageCard: {
    borderWidth: 1,
    borderColor: "#DCE4EE",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  packageCardActive: {
    borderColor: "#F97316",
    backgroundColor: "#FFF7ED",
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  packageTitle: {
    flex: 1,
    color: "#0F172A",
    fontSize: 16,
    fontFamily: uiFont,
  },
  packageBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#FED7AA",
    backgroundColor: "#FFEDD5",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  packageBadgeText: {
    color: "#9A3412",
    fontSize: 11,
    fontFamily: uiFont,
  },
  packageMeta: {
    color: "#64748B",
    marginTop: 6,
    fontSize: 12,
    fontFamily: bodyFont,
  },
  packageDescription: {
    color: "#334155",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: bodyFont,
  },
  packagePrice: {
    color: "#0F766E",
    marginTop: 8,
    fontSize: 20,
    fontFamily: uiFont,
  },
  noteBanner: {
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 16,
    padding: 16,
  },
  noteTitle: {
    color: "#E2E8F0",
    fontSize: 20,
    lineHeight: 25,
    fontFamily: headingFont,
  },
  noteText: {
    color: "#CBD5E1",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: bodyFont,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: "#DCE4EE",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  faqQuestion: {
    flex: 1,
    color: "#0F172A",
    fontSize: 14,
    fontFamily: uiFont,
  },
  faqAnswer: {
    marginTop: 8,
    color: "#334155",
    fontSize: 13,
    lineHeight: 19,
    fontFamily: bodyFont,
  },
  bottomBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    borderRadius: 16,
    backgroundColor: "#0F172A",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontFamily: bodyFont,
  },
  bottomPrice: {
    color: "#F8FAFC",
    fontSize: 20,
    fontFamily: uiFont,
  },
  bookButton: {
    backgroundColor: "#FDBA74",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  bookButtonText: {
    color: "#7C2D12",
    fontSize: 14,
    fontFamily: uiFont,
  },
});
