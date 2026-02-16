import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function KitchenCleaningScreen() {
  return <OfferShowcaseScreen config={offerShowcases["kitchen-cleaning"]} />;
}
