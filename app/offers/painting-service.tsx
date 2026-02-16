import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function PaintingServiceScreen() {
  return <OfferShowcaseScreen config={offerShowcases["painting-service"]} />;
}
