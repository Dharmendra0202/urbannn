import RecommendedServicePage from "@/components/RecommendedServicePage";
import { recommendedServiceDetails } from "@/constants/recommended-details";

export default function Page() {
  return (
    <RecommendedServicePage
      service={recommendedServiceDetails["bathroom-cleaning"]}
    />
  );
}
