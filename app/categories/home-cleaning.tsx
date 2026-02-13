import CategoryDetailPage from "@/components/CategoryDetailPage";
import { categoryDetails } from "@/constants/category-details";

export default function HomeCleaningScreen() {
  return <CategoryDetailPage service={categoryDetails["home-cleaning"]} />;
}
