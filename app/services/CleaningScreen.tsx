import React from "react";
import { ServiceHubScreen } from "@/components/ServiceHubScreen";
import { SERVICE_HUB_CONFIGS } from "@/constants/service-hub-config";

export default function CleaningScreen() {
  return <ServiceHubScreen config={SERVICE_HUB_CONFIGS.cleaning} />;
}
