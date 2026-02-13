import CategoryDetailPage from "@/components/CategoryDetailPage";
import { categoryDetails } from "@/constants/category-details";

export default function KitchenCleaningScreen() {
  return <CategoryDetailPage service={categoryDetails["kitchen-cleaning"]} />;
}
