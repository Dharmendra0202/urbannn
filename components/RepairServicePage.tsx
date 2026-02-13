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
import { RepairServiceDetail } from "@/constants/repair-details";

const { width } = Dimensions.get("window");

type Props = {
  service: RepairServiceDetail;
};

export default function RepairServicePage({ service }: Props) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={service.heroGradient} style={styles.hero}>
          <Image source={{ uri: service.heroImage }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
            <Ionicons name="hammer-outline" size={16} color="#1D4ED8" />
            <Text style={styles.metricText}>{service.completedJobs}</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="flash-outline" size={16} color="#0F766E" />
            <Text style={styles.metricText}>{service.responseTime}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this service</Text>
          <Text style={styles.bodyText}>{service.overview}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work included</Text>
          {service.workIncludes.map((item) => (
            <View key={item} style={styles.row}>
              <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
              <Text style={styles.rowText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required tools/materials</Text>
          <Text style={styles.hintText}>
            Keep these ready for faster completion and better quality.
          </Text>
          <View style={styles.toolWrap}>
            {service.requiredItems.map((tool) => (
              <View key={tool} style={styles.toolChip}>
                <Ionicons name="construct-outline" size={14} color="#1E3A8A" />
                <Text style={styles.toolText}>{tool}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent jobs gallery</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryContainer}
          >
            {service.gallery.map((item) => (
              <View key={item.id} style={styles.galleryCard}>
                <Image source={{ uri: item.image }} style={styles.galleryImage} />
                <View style={styles.galleryBody}>
                  <Text style={styles.galleryTitle}>{item.title}</Text>
                  <Text style={styles.gallerySubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How it works</Text>
          {service.processSteps.map((step, index) => (
            <View key={step} style={styles.processRow}>
              <View style={styles.stepDot}>
                <Text style={styles.stepText}>{index + 1}</Text>
              </View>
              <Text style={styles.rowText}>{step}</Text>
            </View>
          ))}
        </View>

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

        <LinearGradient colors={["#0F172A", "#1F2937"]} style={styles.noteBanner}>
          <Text style={styles.noteTitle}>Service Assurance</Text>
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
          <Text style={styles.bottomLabel}>Starts at</Text>
          <Text style={styles.bottomPrice}>
            ₹{service.packages[selectedPackage]?.price ?? service.startPrice}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.9}
          onPress={() =>
            router.push({
              pathname: "/offers/mens-booking",
              params: {
                service: service.title,
                amount: String(
                  service.packages[selectedPackage]?.price ?? service.startPrice,
                ),
              },
            } as any)
          }
        >
          <Text style={styles.bookButtonText}>Book Service</Text>
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
    backgroundColor: "rgba(2, 6, 23, 0.35)",
  },
  backButton: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 3,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
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
    fontWeight: "700",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "#E2E8F0",
    marginTop: 6,
    fontSize: 14,
    maxWidth: "86%",
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
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  metricText: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  section: {
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 8,
  },
  bodyText: {
    color: "#334155",
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  rowText: {
    flex: 1,
    color: "#1F2937",
    fontSize: 14,
    lineHeight: 20,
  },
  hintText: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 10,
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
    borderColor: "#DBEAFE",
    backgroundColor: "#EFF6FF",
  },
  toolText: {
    color: "#1E3A8A",
    fontSize: 12,
    fontWeight: "600",
  },
  galleryContainer: { paddingVertical: 4, paddingRight: 8 },
  galleryCard: {
    width: width * 0.68,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    backgroundColor: "#F8FAFC",
    marginRight: 12,
  },
  galleryImage: { width: "100%", height: 160 },
  galleryBody: { padding: 10 },
  galleryTitle: {
    color: "#0F172A",
    fontWeight: "700",
    fontSize: 14,
  },
  gallerySubtitle: {
    color: "#475569",
    fontSize: 12,
    marginTop: 2,
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
    fontWeight: "700",
    fontSize: 12,
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
    gap: 10,
  },
  packageTitle: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },
  packageBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#A7F3D0",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  packageBadgeText: {
    color: "#065F46",
    fontSize: 11,
    fontWeight: "700",
  },
  packageMeta: {
    color: "#64748B",
    marginTop: 6,
    fontSize: 12,
  },
  packageDescription: {
    color: "#334155",
    marginTop: 6,
    fontSize: 13,
  },
  packagePrice: {
    color: "#0F766E",
    marginTop: 8,
    fontSize: 18,
    fontWeight: "800",
  },
  noteBanner: {
    marginTop: 14,
    marginHorizontal: 14,
    borderRadius: 16,
    padding: 16,
  },
  noteTitle: {
    color: "#F8FAFC",
    fontSize: 17,
    fontWeight: "800",
  },
  noteText: {
    color: "#CBD5E1",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
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
    gap: 10,
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
  },
  bottomPrice: {
    color: "#F8FAFC",
    fontSize: 20,
    fontWeight: "800",
  },
  bookButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
  },
  bookButtonText: {
    color: "#052E16",
    fontSize: 14,
    fontWeight: "800",
  },
});
