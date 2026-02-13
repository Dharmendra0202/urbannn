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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { CleaningServiceDetail } from "@/constants/cleaning-details";

const { width } = Dimensions.get("window");

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
  service: CleaningServiceDetail;
};

export default function CleaningServicePage({ service }: Props) {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [selectedPanel, setSelectedPanel] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activePanel = useMemo(
    () => service.contentPanels[selectedPanel] ?? service.contentPanels[0],
    [selectedPanel, service.contentPanels],
  );

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
            <Ionicons name="home-outline" size={16} color="#0E7490" />
            <Text style={styles.metricText}>{service.completedJobs}</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="time-outline" size={16} color="#C2410C" />
            <Text style={styles.metricText}>{service.avgDuration}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service overview</Text>
          <Text style={styles.bodyText}>{service.overview}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What gets covered</Text>
          {service.workIncludes.map((item) => (
            <View key={item} style={styles.row}>
              <Ionicons name="checkmark-circle" size={18} color="#0F766E" />
              <Text style={styles.rowText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products and tools used</Text>
          <Text style={styles.hintText}>
            We use service-safe materials and machine workflows based on your
            surface type.
          </Text>
          <View style={styles.toolWrap}>
            {service.productHighlights.map((product) => (
              <View key={product} style={styles.toolChip}>
                <Ionicons name="flask-outline" size={14} color="#0E7490" />
                <Text style={styles.toolText}>{product}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service playbook</Text>
          <Text style={styles.hintText}>
            Use the vertical tabs on the left to quickly switch product and
            process details.
          </Text>

          <View style={styles.panelLayout}>
            <ScrollView
              style={styles.panelRail}
              contentContainerStyle={styles.panelRailContent}
              showsVerticalScrollIndicator={false}
            >
              {service.contentPanels.map((panel, index) => {
                const isActive = selectedPanel === index;

                return (
                  <TouchableOpacity
                    key={panel.id}
                    style={[styles.panelTab, isActive && styles.panelTabActive]}
                    activeOpacity={0.85}
                    onPress={() => setSelectedPanel(index)}
                  >
                    <Text
                      style={[
                        styles.panelTabLabel,
                        isActive && styles.panelTabLabelActive,
                      ]}
                    >
                      {panel.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.panelCard}>
              <Text style={styles.panelTitle}>{activePanel.title}</Text>
              <Text style={styles.bodyText}>{activePanel.description}</Text>

              <View style={styles.panelBulletWrap}>
                {activePanel.bullets.map((bullet) => (
                  <View key={bullet} style={styles.row}>
                    <Ionicons
                      name="ellipse"
                      size={7}
                      color="#0E7490"
                      style={styles.dotIcon}
                    />
                    <Text style={styles.rowText}>{bullet}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent service snapshots</Text>
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
          <Text style={styles.sectionTitle}>How the service runs</Text>
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
          <Text style={styles.sectionTitle}>Choose your package</Text>
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

        <LinearGradient colors={["#0B3B4A", "#0F766E"]} style={styles.noteBanner}>
          <Text style={styles.noteTitle}>Clean Home Promise</Text>
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
                    color="#5F6E7B"
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
          <Text style={styles.bottomLabel}>Starting from</Text>
          <Text style={styles.bottomPrice}>
            ₹{service.packages[selectedPackage]?.price ?? service.startPrice}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          activeOpacity={0.9}
          onPress={() => router.push("/offers/mens-booking" as any)}
        >
          <Text style={styles.bookButtonText}>Book Cleaning</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5FBFA" },
  scrollContent: { paddingBottom: 120 },
  hero: {
    height: 285,
    margin: 14,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 18,
  },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 18, 32, 0.42)",
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
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginBottom: 8,
  },
  badgeText: {
    color: "#0B3B4A",
    fontSize: 11,
    fontFamily: uiFont,
    letterSpacing: 0.3,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    fontFamily: headingFont,
    lineHeight: 35,
  },
  heroSubtitle: {
    color: "#E2E8F0",
    marginTop: 7,
    fontSize: 14,
    maxWidth: "88%",
    lineHeight: 19,
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
    borderColor: "#D9E8E6",
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
    borderColor: "#D9E8E6",
    backgroundColor: "#FFFFFF",
    padding: 14,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 22,
    lineHeight: 27,
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
  hintText: {
    color: "#64748B",
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 18,
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
    backgroundColor: "#ECFEFF",
  },
  toolText: {
    color: "#0E7490",
    fontSize: 12,
    fontFamily: uiFont,
  },
  panelLayout: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 10,
  },
  panelRail: {
    width: 102,
    maxHeight: 212,
  },
  panelRailContent: {
    gap: 8,
    paddingBottom: 2,
  },
  panelTab: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9E8E6",
    backgroundColor: "#F8FAFC",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  panelTabActive: {
    borderColor: "#0E7490",
    backgroundColor: "#CCFBF1",
  },
  panelTabLabel: {
    color: "#475569",
    fontSize: 12,
    textAlign: "center",
    fontFamily: uiFont,
  },
  panelTabLabelActive: {
    color: "#0F766E",
  },
  panelCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D9E8E6",
    backgroundColor: "#F8FAFC",
    padding: 12,
  },
  panelTitle: {
    color: "#0F172A",
    fontSize: 18,
    lineHeight: 23,
    fontFamily: headingFont,
    marginBottom: 6,
  },
  panelBulletWrap: {
    marginTop: 10,
  },
  dotIcon: {
    marginTop: 6,
  },
  galleryContainer: { paddingVertical: 4, paddingRight: 8 },
  galleryCard: {
    width: width * 0.7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D9E8E6",
    overflow: "hidden",
    backgroundColor: "#F0FDFA",
    marginRight: 12,
  },
  galleryImage: { width: "100%", height: 158 },
  galleryBody: { padding: 10 },
  galleryTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontFamily: uiFont,
  },
  gallerySubtitle: {
    color: "#475569",
    fontSize: 12,
    marginTop: 2,
    fontFamily: bodyFont,
  },
  processRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  stepDot: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0E7490",
  },
  stepText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: uiFont,
  },
  packageCard: {
    borderWidth: 1,
    borderColor: "#D9E8E6",
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
    color: "#ECFEFF",
    fontSize: 21,
    lineHeight: 26,
    fontFamily: headingFont,
  },
  noteText: {
    color: "#D1FAE5",
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: bodyFont,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: "#D9E8E6",
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
    backgroundColor: "#082F49",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomLabel: {
    color: "#7DD3FC",
    fontSize: 12,
    fontFamily: bodyFont,
  },
  bottomPrice: {
    color: "#E0F2FE",
    fontSize: 21,
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
