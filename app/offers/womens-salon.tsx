import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function WomensSalonScreen() {
  return <OfferShowcaseScreen config={offerShowcases["womens-salon"]} />;
}
