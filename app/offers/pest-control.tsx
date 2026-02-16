import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function PestControlScreen() {
  return <OfferShowcaseScreen config={offerShowcases["pest-control"]} />;
}
