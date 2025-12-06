import { useTheme } from "../../contexts/ThemeContext";
import GenericSection from "../ui/GenericSection";
import CardComponent from "../ui/CardComponent";
import { SparklesIcon } from "lucide-react";

export default function CategoriesSection() {
  const { isDarkMode } = useTheme();

  const gradients = [
    "from-emerald-500 to-teal-500",
    "from-teal-500 to-cyan-500",
    "from-cyan-500 to-blue-500",
    "from-green-500 to-emerald-500",
    "from-lime-500 to-green-500",
  ];

  return (
    <GenericSection
      endpoint="/categories"
      badge="BROWSE BY CATEGORY"
      heading="Explore Our Categories"
      description={
        "Discover a wide range of products organized just for you. Find exactly what you need in just a few clicks."
      }
      Icon={SparklesIcon}
      perPage={3}
      itemRenderer={(category) => (
        <CardComponent
          key={category.id}
          item={category}
          gradient={gradients}
          linkTo={`/categories/${category.id}`}
          isDarkMode={isDarkMode}
          description={category.description}></CardComponent>
      )}
    />
  );
}
