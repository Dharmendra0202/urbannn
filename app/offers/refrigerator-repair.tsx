import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function RefrigeratorRepairScreen() {
  return <OfferShowcaseScreen config={offerShowcases["refrigerator-repair"]} />;
}
