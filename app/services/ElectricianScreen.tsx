import React from "react";
import { ServiceHubScreen } from "@/components/ServiceHubScreen";
import { SERVICE_HUB_CONFIGS } from "@/constants/service-hub-config";

export default function ElectricianScreen() {
  return <ServiceHubScreen config={SERVICE_HUB_CONFIGS.electrician} />;
}
