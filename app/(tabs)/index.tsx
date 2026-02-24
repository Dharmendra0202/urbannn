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
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import HorizontalCardList from "@/components/HorizontalCardList";
import SectionHeader from "@/components/SectionHeader";
import {
  cleaningEssentials,
  customerReviews,
  footerCompanyLinks,
  footerSocials,
  footerSupportLinks,
  footerTopCities,
  homeImagePrefetchUrls,
  offers,
  rebookItems,
  seasonalBundles,
  services,
  specialOffer,
  specialists,
  whyChooseItems,
} from "@/constants/home-data";
import {
  getRecommendedRoute,
  recommendedServices,
} from "@/constants/recommended-services";
import { getRepairRoute, repairServices } from "@/constants/repair-services";
import type { HorizontalItem, SearchResultItem } from "@/types/home";


const { width } = Dimensions.get("window");
const cardWidth = (width - 80) / 4;

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

const filterBySearch = <T extends { name: string }>(items: T[], query: string) =>
  items.filter((item) => matchesSearch(item.name, query));

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
  const filteredSpecialists = filterBySearch(specialists, normalizedSearch);
  const filteredOffers = filterBySearch(offers, normalizedSearch);
  const filteredEssentials = filterBySearch(cleaningEssentials, normalizedSearch);
  const filteredRepair = filterBySearch(repairServices, normalizedSearch);
  const filteredRecommended = filterBySearch(recommendedServices, normalizedSearch);
  const filteredServices = filterBySearch(services, normalizedSearch);
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
      if (!item.route) {
        return;
      }

      addResult({
        id: `specialist-${item.id}`,
        name: item.name,
        section: "Specialist",
        route: item.route,
      });
    });

    filteredEssentials.forEach((item) => {
      if (!item.route) {
        return;
      }

      addResult({
        id: `cleaning-${item.id}`,
        name: item.name,
        section: "Cleaning",
        route: item.route,
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
      if (!item.route) {
        return;
      }

      addResult({
        id: `offer-${item.id}`,
        name: item.name,
        section: "Offer",
        route: item.route,
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

  useEffect(() => {
    const remoteUrls = [
      ...homeImagePrefetchUrls,
      ...recommendedServices
        .map((item) => item.image)
        .filter((url) => url.startsWith("http")),
    ];
    const uniqueUrls = Array.from(new Set(remoteUrls));
    uniqueUrls.forEach((url) => {
      Image.prefetch(url);
    });

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

        <SectionHeader
          title="We Are Specialists In"
          actionLabel="See more"
          onPress={() => router.push("/categories")}
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
          actionStyle={styles.seeAll}
        />
        <HorizontalCardList
          data={filteredSpecialists}
          onItemPress={(item) => {
            if (item.route) {
              router.push(item.route as any);
            }
          }}
          contentContainerStyle={{ paddingVertical: 4 }}
        />

        {/* Offers & Discounts */}
        <SectionHeader
          title="Offers & Discounts"
          actionLabel="See more"
          onPress={() => router.push("/offers" as any)}
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
          actionStyle={styles.seeAll}
        />

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
            renderItem={({ item, index }) => (
              <MotiView
                from={{ opacity: 0, translateY: 12 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: index * 45, type: "timing", duration: 320 }}
                style={styles.offerCardWrap}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.offerCardPremium}
                  onPress={() => router.push(item.route as any)}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.offerCardPremiumImage}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={["rgba(2,6,23,0.0)", "rgba(2,6,23,0.34)"]}
                    style={styles.offerCardPremiumOverlay}
                  />

                  <View style={styles.offerCardPremiumTop}>
                    <View style={styles.offerDiscountPill}>
                      <Ionicons name="pricetag" size={12} color="#082F49" />
                      <Text style={styles.offerDiscountText}>{item.discount}</Text>
                    </View>
                    <View style={styles.offerEtaPill}>
                      <Ionicons name="flash" size={11} color="#FFFFFF" />
                      <Text style={styles.offerEtaText}>{item.eta}</Text>
                    </View>
                  </View>

                  <View style={styles.offerCardPremiumBottom}>
                    <Text numberOfLines={2} style={styles.offerCardPremiumTitle}>
                      {item.name}
                    </Text>

                    <View style={styles.offerMetaRow}>
                      <View style={styles.offerRatingPill}>
                        <Ionicons name="star" size={12} color="#FCD34D" />
                        <Text style={styles.offerRatingPillText}>{item.rating.toFixed(1)}</Text>
                      </View>
                      <Text style={styles.offerFromText}>from</Text>
                      <Text style={styles.offerCardPremiumPrice}>₹{item.price}</Text>
                    </View>

                    <View style={styles.offerCtaRow}>
                      <Text style={styles.offerCtaText}>Book now</Text>
                      <Ionicons name="arrow-forward" size={14} color="#0F172A" />
                    </View>
                  </View>
                </TouchableOpacity>
              </MotiView>
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersListContent}
          />
        )}

        {/* Cleaning Essentials */}
        <SectionHeader
          title="Cleaning Essentials"
          actionLabel="See more"
          onPress={() => router.push("/cleaning" as any)}
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
          actionStyle={styles.seeAll}
        />

        <HorizontalCardList
          data={filteredEssentials}
          emptyText="No cleaning essentials found"
          emptyTextStyle={{ textAlign: "center", color: "#6B7280", marginBottom: 10 }}
          onItemPress={(item) => {
            if (item.route) {
              router.push(item.route as any);
            }
          }}
          contentContainerStyle={{ paddingVertical: 4 }}
        />

        {/* Home Repair & Installation */}
        <SectionHeader
          title="Home Repair & Installation"
          actionLabel="See more"
          onPress={() => router.push("/repair" as any)}
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
          actionStyle={styles.seeAll}
        />

        <HorizontalCardList
          data={filteredRepair}
          emptyText="No repair services found"
          emptyTextStyle={{ textAlign: "center", color: "#6B7280", marginBottom: 10 }}
          onItemPress={(item) => router.push(getRepairRoute(item.id) as any)}
          contentContainerStyle={{ paddingVertical: 4 }}
        />

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
        <SectionHeader
          title="Recommended For You"
          actionLabel="See all"
          onPress={() => router.push("/recommended" as any)}
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
          actionStyle={styles.seeAll}
        />

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
        <SectionHeader
          title="Rebook in 1 Tap"
          actionLabel="History"
          onPress={() => router.push("/bookings" as any)}
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
          actionStyle={styles.seeAll}
        />
        <FlatList
          horizontal
          data={rebookItems}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rebookListContent}
          renderItem={({ item }) => (
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
        <SectionHeader
          title="Seasonal Bundles"
          actionLabel="See all"
          onPress={() => router.push("/offers" as any)}
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
          actionStyle={styles.seeAll}
        />
        <FlatList
          horizontal
          data={seasonalBundles}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bundleListContent}
          renderItem={({ item }) => (
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
        <SectionHeader
          title="Customer Reviews"
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
        />
        <FlatList
          horizontal
          data={customerReviews}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.reviewListContent}
          renderItem={({ item }) => (
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
        <SectionHeader
          title="Why Choose Us"
          containerStyle={styles.sectionHeader}
          titleStyle={styles.sectionHeading}
        />
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
    width: 62,
    height: 62,
    borderRadius: 31,
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
  offersListContent: {
    paddingVertical: 2,
    paddingRight: 4,
  },
  offerCardWrap: {
    marginRight: 12,
  },
  offerCardPremium: {
    width: 220,
    height: 236,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    backgroundColor: "#0F172A",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 6,
  },
  offerCardPremiumImage: {
    ...StyleSheet.absoluteFillObject,
  },
  offerCardPremiumOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  offerCardPremiumTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  offerDiscountPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.93)",
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  offerDiscountText: {
    color: "#082F49",
    fontSize: 11,
    fontWeight: "800",
  },
  offerEtaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.72)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  offerEtaText: {
    color: "#E2E8F0",
    fontSize: 10,
    fontWeight: "700",
  },
  offerCardPremiumBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  offerCardPremiumTitle: {
    color: "#F8FAFC",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
    marginBottom: 8,
  },
  offerMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  offerRatingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  offerRatingPillText: {
    color: "#F8FAFC",
    fontSize: 11,
    fontWeight: "700",
  },
  offerFromText: {
    marginLeft: 8,
    color: "#CBD5E1",
    fontSize: 11,
    fontWeight: "600",
  },
  offerCardPremiumPrice: {
    marginLeft: 4,
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  offerCtaRow: {
    borderRadius: 12,
    backgroundColor: "rgba(241,245,249,0.95)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 9,
  },
  offerCtaText: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "800",
  },
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
