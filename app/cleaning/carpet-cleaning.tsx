import CleaningServicePage from "@/components/CleaningServicePage";
import { cleaningServiceDetails } from "@/constants/cleaning-details";

export default function Page() {
  return <CleaningServicePage service={cleaningServiceDetails["carpet-cleaning"]} />;
}
