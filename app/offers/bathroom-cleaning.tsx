import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function BathroomCleaningScreen() {
  return <OfferShowcaseScreen config={offerShowcases["bathroom-cleaning"]} />;
}
