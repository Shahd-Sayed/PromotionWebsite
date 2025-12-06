import { useRef } from "react";

export const useScrollRefs = () => {
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const currentPromoRef = useRef(null);
  const productsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return { heroRef, categoriesRef, currentPromoRef, productsRef, scrollToSection };
};
