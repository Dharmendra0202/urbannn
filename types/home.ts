export type IoniconName = keyof typeof import("@expo/vector-icons").Ionicons.glyphMap;

export interface ServiceItem {
  id: number;
  name: string;
  icon: IoniconName;
  color: string;
  route: string;
}

export interface HorizontalItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  route?: string;
}

export interface OfferItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  discount: string;
  eta: string;
  tint: [string, string];
  route: string;
}

export interface SearchResultItem {
  id: string;
  name: string;
  section: string;
  route: string;
}

export interface SeasonalBundleItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  save: string;
  image: string;
  gradient: [string, string];
}

export interface CustomerReviewItem {
  id: string;
  name: string;
  service: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  subtitle: string;
  icon: IoniconName;
  color: string;
}

export interface RebookItem {
  id: string;
  name: string;
  lastBooked: string;
  price: number;
  image: string;
  route: string;
}

export interface FooterSocialLink {
  id: string;
  icon: IoniconName;
  url: string;
}
