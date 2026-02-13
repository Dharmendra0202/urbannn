import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { RecommendedServiceDetail } from "@/constants/recommended-details";

const { width } = Dimensions.get("window");

type Props = {
  service: RecommendedServiceDetail;
};

export default function RecommendedServicePage({ service }: Props) {
  const router = useRouter();
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const selectedPackage = service.packages[selectedPackageIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <LinearGradient colors={service.heroGradient} style={styles.hero}>
          <Image source={{ uri: service.heroImage }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.85}
          >
            <Ionicons name="chevron-back" size={22} color="#111827" />
          </TouchableOpacity>

          <View style={styles.heroTextWrap}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>{service.offerLabel}</Text>
            </View>
            <Text style={styles.heroTitle}>{service.title}</Text>
            <Text style={styles.heroSubtitle}>{service.subtitle}</Text>
          </View>
        </LinearGradient>

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.metricLabel}>{service.rating}</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="briefcase-outline" size={16} color="#2563EB" />
            <Text style={styles.metricLabel}>{service.completedJobs}</Text>
          </View>
          <View style={styles.metricItem}>
            <Ionicons name="time-outline" size={16} color="#7C3AED" />
            <Text style={styles.metricLabel}>{service.durationLabel}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why choose this service</Text>
          <Text style={styles.sectionBody}>{service.overview}</Text>
          <View style={styles.chipWrap}>
            {service.highlights.map((item) => (
              <View key={item} style={styles.chip}>
                <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
                <Text style={styles.chipText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work gallery</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryRow}
          >
            {service.workGallery.map((work) => (
              <View key={work.id} style={styles.galleryCard}>
                <Image source={{ uri: work.image }} style={styles.galleryImage} />
                <View style={styles.galleryMeta}>
                  <Text style={styles.galleryTitle}>{work.title}</Text>
                  <Text style={styles.gallerySubtitle}>{work.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is included</Text>
          {service.includes.map((point) => (
            <View key={point} style={styles.listRow}>
              <Ionicons name="checkmark-done-circle" size={18} color="#059669" />
              <Text style={styles.listText}>{point}</Text>
            </View>
          ))}
        </View>

        {service.installationChecklist.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Installation checklist</Text>
            <Text style={styles.sectionHint}>
              Keep these ready for faster and safer installation.
            </Text>
            <View style={styles.checklistWrap}>
              {service.installationChecklist.map((item) => (
                <View key={item} style={styles.checklistChip}>
                  <Ionicons name="construct-outline" size={14} color="#1D4ED8" />
                  <Text style={styles.checklistText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Packages</Text>
          {service.packages.map((pkg, index) => {
            const isActive = selectedPackageIndex === index;

            return (
              <TouchableOpacity
                key={pkg.id}
                activeOpacity={0.9}
                style={[styles.packageCard, isActive && styles.packageCardActive]}
                onPress={() => setSelectedPackageIndex(index)}
              >
                <View style={styles.packageHeader}>
                  <Text style={styles.packageName}>{pkg.name}</Text>
                  {pkg.badge ? (
                    <View style={styles.packageBadge}>
                      <Text style={styles.packageBadgeText}>{pkg.badge}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.packageMeta}>
                  {pkg.duration} • {pkg.visits}
                </Text>
                <Text style={styles.packageDescription}>{pkg.description}</Text>
                <Text style={styles.packagePrice}>₹{pkg.price}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service flow</Text>
          {[
            "Choose package and preferred date",
            "Verified pro is assigned instantly",
            "On-time visit with full checklist",
            "Final quality check before closing",
          ].map((step, index) => (
            <View key={step} style={styles.flowRow}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepText}>{index + 1}</Text>
              </View>
              <Text style={styles.flowText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          {service.faqs.map((faq, index) => {
            const isOpen = expandedFaqIndex === index;

            return (
              <TouchableOpacity
                key={faq.id}
                activeOpacity={0.85}
                style={styles.faqCard}
                onPress={() =>
                  setExpandedFaqIndex((prev) => (prev === index ? null : index))
                }
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons
                    name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
                    size={18}
                    color="#6B7280"
                  />
                </View>
                {isOpen ? <Text style={styles.faqAnswer}>{faq.answer}</Text> : null}
              </TouchableOpacity>
            );
          })}
        </View>

        <LinearGradient
          colors={["#0F172A", "#1F2937"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        >
          <Text style={styles.bannerTitle}>UrbanCare Promise</Text>
          <Text style={styles.bannerText}>
            Background-verified professionals, fixed pricing, and instant support.
          </Text>
        </LinearGradient>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Starting from</Text>
          <Text style={styles.bottomPrice}>
            ₹{selectedPackage?.price ?? service.startingPrice}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.bottomButton}
          onPress={() => router.push("/offers/mens-booking" as any)}
        >
          <Text style={styles.bottomButtonText}>Book Now</Text>
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
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2, 6, 23, 0.35)",
  },
  backButton: {
    position: "absolute",
    top: 14,
    left: 14,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.86)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  heroTextWrap: {
    zIndex: 1,
  },
  offerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.92)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    marginBottom: 8,
  },
  offerText: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "700",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  heroSubtitle: {
    marginTop: 6,
    color: "#E2E8F0",
    fontSize: 14,
    maxWidth: "85%",
  },
  metricsRow: {
    marginHorizontal: 14,
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  metricItem: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 6,
  },
  metricLabel: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 12,
  },
  section: {
    marginTop: 14,
    marginHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
  },
  sectionBody: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
  },
  chipWrap: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F0FDF4",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#DCFCE7",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipText: {
    color: "#166534",
    fontWeight: "600",
    fontSize: 12,
  },
  galleryRow: {
    paddingTop: 4,
    paddingBottom: 2,
    paddingRight: 6,
  },
  galleryCard: {
    width: width * 0.68,
    marginRight: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  galleryImage: {
    width: "100%",
    height: 160,
  },
  galleryMeta: {
    padding: 10,
  },
  galleryTitle: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 14,
  },
  gallerySubtitle: {
    color: "#475569",
    fontSize: 12,
    marginTop: 2,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  listText: {
    flex: 1,
    color: "#1F2937",
    fontSize: 14,
    lineHeight: 20,
  },
  sectionHint: {
    color: "#64748B",
    marginBottom: 10,
    fontSize: 13,
  },
  checklistWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  checklistChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#EFF6FF",
    borderColor: "#DBEAFE",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  checklistText: {
    color: "#1E3A8A",
    fontSize: 12,
    fontWeight: "600",
  },
  packageCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  packageCardActive: {
    borderColor: "#14B8A6",
    backgroundColor: "#F0FDFA",
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  packageName: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 15,
  },
  packageBadge: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  packageBadgeText: {
    color: "#065F46",
    fontSize: 11,
    fontWeight: "700",
  },
  packageMeta: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 12,
  },
  packageDescription: {
    marginTop: 6,
    color: "#334155",
    fontSize: 13,
  },
  packagePrice: {
    marginTop: 8,
    color: "#0F766E",
    fontSize: 18,
    fontWeight: "800",
  },
  flowRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1D4ED8",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
  flowText: {
    flex: 1,
    color: "#1F2937",
    fontSize: 14,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  faqQuestion: {
    flex: 1,
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 14,
  },
  faqAnswer: {
    marginTop: 8,
    color: "#334155",
    fontSize: 13,
    lineHeight: 19,
  },
  banner: {
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 16,
    padding: 16,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  bannerText: {
    color: "#CBD5E1",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },
  bottomBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: "#0F172A",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomLabel: {
    color: "#94A3B8",
    fontSize: 12,
  },
  bottomPrice: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "800",
  },
  bottomButton: {
    backgroundColor: "#22C55E",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  bottomButtonText: {
    color: "#052E16",
    fontWeight: "800",
    fontSize: 14,
  },
});
