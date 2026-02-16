import React from "react";
import OfferShowcaseScreen from "@/components/OfferShowcaseScreen";
import { offerShowcases } from "@/constants/offer-showcases";

export default function LaundryServiceScreen() {
  return <OfferShowcaseScreen config={offerShowcases["laundry-service"]} />;
}
