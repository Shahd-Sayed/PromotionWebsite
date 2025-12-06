import { Tag } from "lucide-react";

import { useTheme } from "../../contexts/ThemeContext";
import GenericSection from '../ui/GenericSection';
import CardComponent from '../ui/CardComponent';

function CurrentPromo() {
  const { isDarkMode } = useTheme();

  return (
    <GenericSection
      endpoint="/promotion"
      badge="Current Promotions"
      heading="Explore Our Promotions"
      description="Check out our latest offers and discounts."
      icon={Tag}
      perPage={3}
      itemRenderer={(promo) => (
        <CardComponent
          key={promo.id}
          item={promo}
          linkTo={`/promotion/${promo.id}`}
          isDarkMode={isDarkMode}
          description={promo.description}>
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            {promo.category && (
              <span className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                {promo.category.name}
              </span>
            )}
            {promo.discount_value > 0 && (
              <span className="bg-red-500 text-white text-xs px-3 py-1 rounded font-bold">
                {promo.discount_type === "percentage"
                  ? `${promo.discount_value}% OFF`
                  : `-${promo.discount_value} EGP`}
              </span>
            )}
          </div>
        </CardComponent>
      )}
    />
  );
}

export default CurrentPromo;
