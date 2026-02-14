import React, { useMemo, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";

export type ServiceHubItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  icon: string;
  image?: string;
  tags: string[];
  badge?: string;
};

export type ServiceHubSection = {
  id: string;
  title: string;
  subtitle: string;
  gradient: [string, string];
  items: ServiceHubItem[];
};

export type ServiceHubPromo = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  route: string;
  gradient: [string, string];
  image: string;
  bookingAmount?: number;
  bookingService?: string;
};

export type ServiceHubHighlight = {
  id: string;
  label: string;
  value: string;
  icon: string;
};

export type ServiceHubFAQ = {
  id: string;
  question: string;
  answer: string;
};

export type ServiceHubConfig = {
  key: string;
  headerTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  heroGradient: [string, string];
  accent: string;
  quickInfo: ServiceHubHighlight[];
  promos: ServiceHubPromo[];
  sections: ServiceHubSection[];
  faqs: ServiceHubFAQ[];
};

type ServiceHubScreenProps = {
  config: ServiceHubConfig;
};

const FONT = Platform.select({
  ios: {
    heading: "AvenirNext-Bold",
    semi: "AvenirNext-DemiBold",
    body: "AvenirNext-Regular",
  },
  android: {
    heading: "sans-serif-medium",
    semi: "sans-serif-medium",
    body: "sans-serif",
  },
  default: {
    heading: "System",
    semi: "System",
    body: "System",
  },
});

const toPrice = (value: number) => `INR ${value}`;

export function ServiceHubScreen({ config }: ServiceHubScreenProps) {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const sectionOffsets = useRef<Record<string, number>>({});

  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState(config.sections[0]?.id ?? "");
  const [showTopButton, setShowTopButton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(1);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredSections = useMemo(() => {
    if (!normalizedSearch) {
      return config.sections;
    }

    return config.sections
      .map((section) => {
        const items = section.items.filter((item) => {
          const haystack = [item.title, item.description, ...item.tags]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedSearch);
        });

        return {
          ...section,
          items,
        };
      })
      .filter((section) => section.items.length > 0);
  }, [config.sections, normalizedSearch]);

  const totalItems = useMemo(
    () => filteredSections.reduce((count, section) => count + section.items.length, 0),
    [filteredSections]
  );

  const scrollToSection = (sectionId: string) => {
    const y = sectionOffsets.current[sectionId] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(y - 8, 0), animated: true });
    setActiveSection(sectionId);
  };

  const onBookNow = (item: ServiceHubItem) => {
    router.push({
      pathname: "/offers/mens-booking",
      params: {
        service: item.title,
        amount: String(item.price),
      },
    } as any);
  };

  const onBookPromo = (promo: ServiceHubPromo) => {
    router.push({
      pathname: "/offers/mens-booking",
      params: {
        service: promo.bookingService ?? `${config.headerTitle} - ${promo.title}`,
        amount: String(promo.bookingAmount ?? 499),
      },
    } as any);
  };

  const onQuickBook = () => {
    router.push({
      pathname: "/offers/mens-booking",
      params: {
        service: `${config.headerTitle} Priority Booking`,
        amount: "499",
      },
    } as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.max(4, progress * 100)}%`,
              backgroundColor: config.accent,
            },
          ]}
        />
      </View>

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
        onContentSizeChange={(_, height) => setContentHeight(height)}
        onScroll={({ nativeEvent }) => {
          const y = nativeEvent.contentOffset.y;
          const maxScroll = Math.max(contentHeight - viewportHeight, 1);
          const nextProgress = Math.min(Math.max(y / maxScroll, 0), 1);

          setProgress(nextProgress);
          setShowTopButton(y > 520);

          const current = filteredSections.reduce((selected, section) => {
            const sectionY = sectionOffsets.current[section.id] ?? Number.POSITIVE_INFINITY;
            if (sectionY - 130 <= y) {
              return section.id;
            }
            return selected;
          }, filteredSections[0]?.id ?? "");

          if (current && current !== activeSection) {
            setActiveSection(current);
          }
        }}
        scrollEventThrottle={16}
      >
        <LinearGradient
          colors={config.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.heroTopRow}>
            <Pressable onPress={() => router.back()} style={styles.headerIconBtn}>
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>{config.headerTitle}</Text>
            <Pressable onPress={onQuickBook} style={styles.headerIconBtn}>
              <Ionicons name="calendar-outline" size={18} color="#FFFFFF" />
            </Pressable>
          </View>

          <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 450 }}
          >
            <Text style={styles.heroTitle}>{config.heroTitle}</Text>
            <Text style={styles.heroSubtitle}>{config.heroSubtitle}</Text>
          </MotiView>

          <View style={styles.quickInfoRow}>
            {config.quickInfo.map((info, index) => (
              <MotiView
                key={info.id}
                from={{ opacity: 0, translateY: 14 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 100 + index * 70, type: "timing", duration: 420 }}
                style={styles.quickInfoCard}
              >
                <Ionicons name={info.icon as any} size={16} color={config.accent} />
                <Text style={styles.quickInfoValue}>{info.value}</Text>
                <Text style={styles.quickInfoLabel}>{info.label}</Text>
              </MotiView>
            ))}
          </View>
        </LinearGradient>

        <View style={styles.searchCard}>
          <Ionicons name="search-outline" size={18} color="#64748B" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search services, tasks, or add-ons"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
          {search.length > 0 ? (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Quick Jump</Text>
          <Text style={styles.sectionCount}>{totalItems} services</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRow}
        >
          {filteredSections.map((section) => {
            const active = activeSection === section.id;
            return (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.sectionChip,
                  active && {
                    borderColor: config.accent,
                    backgroundColor: `${config.accent}1A`,
                  },
                ]}
                onPress={() => scrollToSection(section.id)}
              >
                <Text
                  style={[
                    styles.sectionChipText,
                    active && { color: config.accent, fontFamily: FONT?.semi },
                  ]}
                >
                  {section.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.exclusiveHeading}>Exclusive Offers</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promoRow}
        >
          {config.promos.map((promo, index) => (
            <MotiView
              key={promo.id}
              from={{ opacity: 0, translateX: 16 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ delay: index * 90, type: "timing" }}
              style={styles.promoCardWrap}
            >
              <ImageBackground
                source={{ uri: promo.image }}
                style={styles.promoCard}
                imageStyle={styles.promoImage}
              >
                <LinearGradient
                  colors={[
                    `${promo.gradient[0]}D9`,
                    `${promo.gradient[1]}C7`,
                    "rgba(2,6,23,0.76)",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.promoOverlay}
                >
                  <View>
                    <Text style={styles.promoTitle}>{promo.title}</Text>
                    <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => onBookPromo(promo)}
                    style={styles.promoButton}
                  >
                    <Text style={styles.promoButtonText}>Book Now</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </ImageBackground>
            </MotiView>
          ))}
        </ScrollView>

        {filteredSections.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={22} color="#64748B" />
            <Text style={styles.emptyTitle}>No matching services found</Text>
            <Text style={styles.emptySubtitle}>Try a different keyword like cleaning, wiring, or installation.</Text>
          </View>
        ) : (
          filteredSections.map((section, sectionIndex) => (
            <View
              key={section.id}
              onLayout={(event) => {
                sectionOffsets.current[section.id] = event.nativeEvent.layout.y;
              }}
              style={styles.serviceSection}
            >
              <LinearGradient
                colors={section.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sectionBanner}
              >
                <Text style={styles.sectionBannerTitle}>{section.title}</Text>
                <Text style={styles.sectionBannerSubtitle}>{section.subtitle}</Text>
              </LinearGradient>

              {section.items.map((item, itemIndex) => (
                <MotiView
                  key={item.id}
                  from={{ opacity: 0, translateY: 12 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{
                    delay: sectionIndex * 80 + itemIndex * 55,
                    type: "timing",
                    duration: 380,
                  }}
                >
                  <View style={styles.itemCard}>
                    <View
                      style={[
                        styles.iconHolder,
                        {
                          backgroundColor: `${config.accent}1F`,
                          borderColor: `${config.accent}40`,
                        },
                      ]}
                    >
                      <Ionicons name={item.icon as any} size={20} color={config.accent} />
                    </View>

                    <View style={styles.itemMain}>
                      <View style={styles.itemTitleRow}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                        {item.badge ? <Text style={styles.itemBadge}>{item.badge}</Text> : null}
                      </View>

                      <Text style={styles.itemDescription}>{item.description}</Text>

                      {item.image ? (
                        <View style={styles.itemImageWrap}>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.itemImage}
                            resizeMode="cover"
                          />
                        </View>
                      ) : null}

                      <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                          <Ionicons name="time-outline" size={13} color="#64748B" />
                          <Text style={styles.metaText}>{item.duration}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Ionicons name="wallet-outline" size={13} color="#64748B" />
                          <Text style={styles.metaText}>{toPrice(item.price)}</Text>
                        </View>
                      </View>

                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tagsRow}
                      >
                        {item.tags.map((tag) => (
                          <View key={`${item.id}-${tag}`} style={styles.tagChip}>
                            <Text style={styles.tagText}>{tag}</Text>
                          </View>
                        ))}
                      </ScrollView>
                    </View>

                    <TouchableOpacity
                      style={[styles.bookBtn, { backgroundColor: config.accent }]}
                      onPress={() => onBookNow(item)}
                    >
                      <Text style={styles.bookBtnText}>Book</Text>
                    </TouchableOpacity>
                  </View>
                </MotiView>
              ))}
            </View>
          ))
        )}

        <View style={styles.faqCard}>
          <Text style={styles.sectionHeading}>Things You Should Know</Text>
          {config.faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <Text style={styles.faqQ}>{faq.question}</Text>
              <Text style={styles.faqA}>{faq.answer}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {showTopButton ? (
        <TouchableOpacity
          style={[styles.topButton, { backgroundColor: config.accent }]}
          onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
        >
          <Ionicons name="arrow-up" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
  progressTrack: {
    height: 3,
    width: "100%",
    backgroundColor: "#DDE6F3",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  scrollContent: {
    paddingBottom: 92,
  },
  hero: {
    margin: 14,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
    borderRadius: 24,
    shadowColor: "#0F172A",
    shadowOpacity: 0.16,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerIconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  headerTitle: {
    color: "#F8FAFC",
    fontSize: 14,
    letterSpacing: 0.3,
    fontFamily: FONT?.semi,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    lineHeight: 32,
    fontFamily: FONT?.heading,
    marginBottom: 6,
  },
  heroSubtitle: {
    color: "#E5E7EB",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT?.body,
  },
  quickInfoRow: {
    marginTop: 16,
    flexDirection: "row",
    gap: 10,
  },
  quickInfoCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minHeight: 74,
  },
  quickInfoValue: {
    marginTop: 5,
    fontSize: 15,
    color: "#0F172A",
    fontFamily: FONT?.heading,
  },
  quickInfoLabel: {
    marginTop: 2,
    color: "#64748B",
    fontSize: 11,
    fontFamily: FONT?.body,
  },
  searchCard: {
    marginHorizontal: 14,
    marginTop: 6,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0F172A",
    fontFamily: FONT?.body,
  },
  sectionHeaderRow: {
    marginHorizontal: 14,
    marginTop: 2,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeading: {
    fontSize: 18,
    color: "#0F172A",
    fontFamily: FONT?.heading,
  },
  exclusiveHeading: {
    marginLeft: 14,
    fontSize: 18,
    color: "#0F172A",
    fontFamily: FONT?.heading,
  },
  sectionCount: {
    fontSize: 12,
    color: "#64748B",
    fontFamily: FONT?.body,
  },
  chipRow: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 8,
  },
  sectionChip: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  sectionChipText: {
    color: "#334155",
    fontSize: 12,
    fontFamily: FONT?.body,
  },
  promoRow: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 12,
  },
  promoCardWrap: {
    borderRadius: 18,
    overflow: "hidden",
  },
  promoCard: {
    width: 276,
    minHeight: 164,
    borderRadius: 18,
    overflow: "hidden",
  },
  promoImage: {
    borderRadius: 18,
  },
  promoOverlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 14,
  },
  promoTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: FONT?.heading,
  },
  promoSubtitle: {
    marginTop: 4,
    color: "#E2E8F0",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: FONT?.body,
  },
  promoButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  promoButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: FONT?.semi,
  },
  emptyState: {
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    padding: 16,
    alignItems: "center",
  },
  emptyTitle: {
    marginTop: 8,
    color: "#0F172A",
    fontSize: 15,
    fontFamily: FONT?.semi,
  },
  emptySubtitle: {
    marginTop: 4,
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    fontFamily: FONT?.body,
  },
  serviceSection: {
    marginHorizontal: 14,
    marginTop: 14,
  },
  sectionBanner: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  sectionBannerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: FONT?.heading,
  },
  sectionBannerSubtitle: {
    marginTop: 4,
    color: "#F1F5F9",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: FONT?.body,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  iconHolder: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemMain: {
    flex: 1,
  },
  itemTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemTitle: {
    flex: 1,
    color: "#0F172A",
    fontSize: 14,
    lineHeight: 19,
    fontFamily: FONT?.semi,
  },
  itemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    fontSize: 10,
    color: "#0F172A",
    backgroundColor: "#E2E8F0",
    fontFamily: FONT?.semi,
  },
  itemDescription: {
    marginTop: 4,
    color: "#475569",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: FONT?.body,
  },
  itemImageWrap: {
    marginTop: 9,
    borderRadius: 10,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: 108,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    color: "#475569",
    fontSize: 11,
    fontFamily: FONT?.body,
  },
  tagsRow: {
    marginTop: 9,
    gap: 6,
    paddingRight: 12,
  },
  tagChip: {
    borderRadius: 999,
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  tagText: {
    color: "#334155",
    fontSize: 10,
    fontFamily: FONT?.body,
  },
  bookBtn: {
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginLeft: 2,
  },
  bookBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontFamily: FONT?.semi,
  },
  faqCard: {
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D7E3F2",
    padding: 14,
  },
  faqItem: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  faqQ: {
    color: "#0F172A",
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FONT?.semi,
  },
  faqA: {
    marginTop: 4,
    color: "#475569",
    fontSize: 12,
    lineHeight: 17,
    fontFamily: FONT?.body,
  },
  topButton: {
    position: "absolute",
    right: 16,
    bottom: 24,
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0F172A",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
});
