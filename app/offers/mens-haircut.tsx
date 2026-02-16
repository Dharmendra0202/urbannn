import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function MensHaircutScreen() {
  return <OfferShowcaseScreen config={offerShowcases["mens-haircut"]} />;
}
