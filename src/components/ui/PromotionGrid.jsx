import { Tag } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export default function PromotionGrid({ promotions = [] }) {
  const { isDarkMode } = useTheme();

  if (!Array.isArray(promotions) || promotions.length === 0) {
    return (
      <div
        className={`text-center py-12 rounded-xl ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white"
        }`}>
        <Tag className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <h3 className="font-bold">No promotions for this product</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promotions.map((promo) => (
        <div
          key={promo.id}
          className={`p-6 rounded-xl shadow transition ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white"
          }`}>
          <h3 className="font-bold text-lg mb-2">{promo.name}</h3>
          <p className="text-sm mb-3">{promo.description}</p>

          <span
            className={`inline-block rounded-full px-3 py-1 text-sm ${
              promo.status === "active"
                ? "bg-green-600 text-white"
                : "bg-gray-400 text-white"
            }`}>
            {promo.status}
          </span>
        </div>
      ))}
    </div>
  );
}
