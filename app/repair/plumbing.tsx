import RepairServicePage from "@/components/RepairServicePage";
import { repairServiceDetails } from "@/constants/repair-details";

export default function Page() {
  return <RepairServicePage service={repairServiceDetails.plumbing} />;
}
