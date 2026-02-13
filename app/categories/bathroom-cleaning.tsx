import CategoryDetailPage from "@/components/CategoryDetailPage";
import { categoryDetails } from "@/constants/category-details";

export default function BathroomCleaningScreen() {
  return <CategoryDetailPage service={categoryDetails["bathroom-cleaning"]} />;
}
