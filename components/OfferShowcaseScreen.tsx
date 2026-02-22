import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { OfferShowcaseConfig } from "@/constants/offer-showcases";

interface OfferShowcaseScreenProps {
  config: OfferShowcaseConfig;
}

export default function OfferShowcaseScreen({ config }: OfferShowcaseScreenProps) {
  const router = useRouter();

  const handleBook = (service: string, amount: number) => {
    router.push({
      pathname: "/offers/mens-booking",
      params: { service, amount: String(amount) },
    } as any);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={{ uri: config.heroImage }} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient colors={config.theme.heroOverlay} style={styles.heroOverlay} />
          <View style={[styles.heroBadge, { backgroundColor: config.theme.heroBadgeBg }]}>
            <Ionicons name="sparkles" size={13} color={config.theme.heroBadgeText} />
            <Text style={[styles.heroBadgeText, { color: config.theme.heroBadgeText }]}>{config.heroBadge}</Text>
          </View>
          <Text style={styles.heroTitle}>{config.heroTitle}</Text>
          <Text style={styles.heroSubtitle}>{config.heroSubtitle}</Text>
          <View style={styles.heroStats}>
            {config.stats.map((stat) => (
              <View
                key={stat.id}
                style={[
                  styles.heroStat,
                  { borderColor: config.theme.border, backgroundColor: "rgba(15,23,42,0.42)" },
                ]}
              >
                <Text style={styles.heroStatValue}>{stat.value}</Text>
                <Text style={styles.heroStatLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>{config.comboTitle ?? "Combo Offers"}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.comboRow}>
            {config.combos.map((combo) => (
              <TouchableOpacity
                key={combo.id}
                activeOpacity={0.92}
                style={[styles.comboCard, { borderColor: config.theme.border }]}
                onPress={() => handleBook(combo.title, combo.price)}
              >
                <Image source={{ uri: combo.image }} style={styles.comboImage} resizeMode="cover" />
                <LinearGradient colors={["rgba(2,6,23,0.05)", "rgba(2,6,23,0.68)"]} style={styles.comboOverlay} />
                <View style={styles.comboTop}>
                  <View style={styles.offPill}>
                    <Text style={[styles.offPillText, { color: config.theme.accent }]}>{combo.badge}</Text>
                  </View>
                  <View style={styles.timePill}>
                    <Ionicons name="time-outline" size={11} color="#FFF" />
                    <Text style={styles.timePillText}>{combo.duration}</Text>
                  </View>
                </View>
                <View style={styles.comboBottom}>
                  <Text style={styles.comboTitle}>{combo.title}</Text>
                  <Text style={styles.comboNote}>{combo.note}</Text>
                  <Text style={styles.comboPrice}>₹{combo.price}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>{config.professionalTitle}</Text>
          <View style={[styles.proShell, { borderColor: config.theme.border }]}>
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
              {config.professionals.map((pro) => (
                <View
                  key={pro.id}
                  style={[styles.proCard, { backgroundColor: config.theme.professionalBg }]}
                >
                  <Image source={{ uri: pro.image }} style={styles.proImage} resizeMode="cover" />
                  <View style={styles.proInfo}>
                    <Text style={styles.proName}>{pro.name}</Text>
                    <Text style={styles.proSpecialty}>{pro.specialty}</Text>
                    <Text style={[styles.proMeta, { color: config.theme.accent }]}>{pro.exp}</Text>
                  </View>
                  <View style={styles.proRight}>
                    <View style={styles.ratingPill}>
                      <Ionicons name="star" size={11} color="#F59E0B" />
                      <Text style={styles.ratingText}>{pro.rating.toFixed(1)}</Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.pickBtn, { backgroundColor: config.theme.pickButtonBg }]}
                      onPress={() => handleBook(`${pro.name} - ${config.bookingService}`, config.bottomPrice)}
                    >
                      <Text style={[styles.pickBtnText, { color: config.theme.pickButtonText }]}>
                        {config.pickActionText ?? "Select"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.sectionWrap}>
          <Text style={styles.sectionTitle}>{config.feedbackTitle ?? "Customer Feedback"}</Text>
          {config.feedbacks.map((feedback) => (
            <View key={feedback.id} style={styles.feedbackCard}>
              <View style={styles.feedbackTop}>
                <Text style={styles.feedbackName}>{feedback.name}</Text>
                <View style={styles.feedbackRating}>
                  <Ionicons name="star" size={11} color="#F59E0B" />
                  <Text style={styles.feedbackRatingText}>{feedback.rating}</Text>
                </View>
              </View>
              <Text style={styles.feedbackText}>{feedback.text}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={[styles.feedbackCta, { backgroundColor: config.theme.pickButtonBg }]}
            activeOpacity={0.9}
          >
            <Text style={[styles.feedbackCtaText, { color: config.theme.pickButtonText }]}>
              {config.feedbackCta ?? "Share Feedback"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { borderColor: config.theme.border }]}>
        <View>
          <Text style={styles.bottomLabel}>{config.bottomLabel}</Text>
          <Text style={styles.bottomPrice}>₹{config.bottomPrice}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleBook(config.bookingService, config.bottomPrice)}
        >
          <LinearGradient colors={config.theme.primaryButton} style={styles.bookBtn}>
            <Text style={[styles.bookBtnText, { color: config.theme.primaryButtonText }]}>
              {config.primaryCtaText ?? "Book Now"}
            </Text>
            <Ionicons name="arrow-forward" size={14} color={config.theme.primaryButtonText} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingBottom: 112 },
  hero: {
    margin: 14,
    height: 300,
    borderRadius: 24,
    overflow: "hidden",
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: "flex-end",
  },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  heroBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  heroBadgeText: { fontSize: 11, fontWeight: "900" },
  heroTitle: { color: "#FFF", fontSize: 30, fontWeight: "900" },
  heroSubtitle: {
    marginTop: 6,
    color: "#E2E8F0",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },
  heroStats: { marginTop: 12, flexDirection: "row", gap: 8 },
  heroStat: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  heroStatValue: { color: "#FFF", fontSize: 13, fontWeight: "900" },
  heroStatLabel: { color: "#CBD5E1", fontSize: 10, marginTop: 2, fontWeight: "600" },
  sectionWrap: { paddingHorizontal: 14, marginTop: 8 },
  sectionTitle: { color: "#0F172A", fontSize: 19, fontWeight: "900", marginBottom: 10 },
  comboRow: { paddingRight: 4 },
  comboCard: {
    width: 220,
    height: 186,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 10,
    borderWidth: 1,
    backgroundColor: "#0B1120",
  },
  comboImage: { ...StyleSheet.absoluteFillObject },
  comboOverlay: { ...StyleSheet.absoluteFillObject },
  comboTop: {
    marginTop: 9,
    marginHorizontal: 9,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  offPill: {
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.93)",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  offPillText: { fontSize: 10, fontWeight: "900" },
  timePill: {
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.64)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  timePillText: { color: "#FFF", fontSize: 10, fontWeight: "700" },
  comboBottom: { position: "absolute", left: 10, right: 10, bottom: 10 },
  comboTitle: { color: "#FFF", fontSize: 15, fontWeight: "900" },
  comboNote: { color: "#CBD5E1", fontSize: 11, marginTop: 2 },
  comboPrice: { color: "#FFF", fontSize: 18, fontWeight: "900", marginTop: 6 },
  proShell: {
    maxHeight: 220,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    padding: 8,
  },
  proCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 9,
    marginBottom: 8,
  },
  proImage: { width: 52, height: 52, borderRadius: 26, backgroundColor: "#CBD5E1" },
  proInfo: { flex: 1, marginLeft: 9 },
  proName: { color: "#0F172A", fontSize: 14, fontWeight: "900" },
  proSpecialty: { color: "#475569", fontSize: 11, marginTop: 1 },
  proMeta: { fontSize: 11, marginTop: 2, fontWeight: "800" },
  proRight: { alignItems: "flex-end", gap: 6 },
  ratingPill: {
    borderRadius: 999,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: { color: "#92400E", fontSize: 10, fontWeight: "900" },
  pickBtn: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  pickBtnText: { fontSize: 11, fontWeight: "900" },
  feedbackCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 11,
    marginBottom: 8,
  },
  feedbackTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  feedbackName: { color: "#0F172A", fontSize: 13, fontWeight: "900" },
  feedbackRating: {
    borderRadius: 999,
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  feedbackRatingText: { color: "#92400E", fontSize: 10, fontWeight: "900" },
  feedbackText: { marginTop: 7, color: "#475569", fontSize: 12, lineHeight: 18, fontWeight: "500" },
  feedbackCta: {
    marginTop: 2,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 10,
  },
  feedbackCtaText: { fontSize: 12, fontWeight: "900" },
  bottomBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomLabel: { color: "#64748B", fontSize: 11, fontWeight: "600" },
  bottomPrice: { color: "#0F172A", fontSize: 20, fontWeight: "900" },
  bookBtn: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  bookBtnText: { fontSize: 13, fontWeight: "900" },
});
