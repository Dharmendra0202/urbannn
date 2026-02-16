import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function ElectricianServicesScreen() {
  return <OfferShowcaseScreen config={offerShowcases["electrician-services"]} />;
}
