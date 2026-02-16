import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function PlumbingServicesScreen() {
  return <OfferShowcaseScreen config={offerShowcases["plumbing-services"]} />;
}
