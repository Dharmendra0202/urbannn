import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function WallMountingScreen() {
  return <OfferShowcaseScreen config={offerShowcases["wall-mounting"]} />;
}
