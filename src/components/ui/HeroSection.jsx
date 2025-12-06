import { ArrowLeft, Sparkles } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Container } from "react-bootstrap";

const HeroSection = ({ item, type = "category" }) => {
  const { isDarkMode } = useTheme();

  const title = item.name;
  console.log(title);
  const description = item.description
    ? item.description.replace(/<\/?[^>]+(>|$)/g, "")
    : "";

  const count =
    type === "product"
      ? item.promotions
        ? item.promotions.flatMap((p) => p.products).length
        : 0
      : item.products?.length ?? 0;

  return (
    <div
      className={`relative overflow-hidden py-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}>
      <div className="flex items-start gap-6 mb-12">
        <div
          className={`p-4 rounded-2xl 
                bg-linear-to-r from-emerald-600 to-teal-600
            `}>
          <Sparkles className="w-12 h-12 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h1
              className={`text-4xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
              {title}
            </h1>
            {count !== undefined && (
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  isDarkMode
                    ? "bg-emerald-900/50 text-emerald-300"
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                {count} Items
              </span>
            )}
          </div>
          {description && (
            <p
              className={`text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
