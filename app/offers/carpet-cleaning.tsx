import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function CarpetCleaningScreen() {
  return <OfferShowcaseScreen config={offerShowcases["carpet-cleaning"]} />;
}
