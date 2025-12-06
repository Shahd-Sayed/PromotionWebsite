import { Container } from "react-bootstrap";
import { useTheme } from "../../contexts/ThemeContext";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import SectionHeader from "../ui/SectionHeader";
import Loader from "../ui/Loader";
import ErrorContainer from "../ui/ErrorContainer";
import ProductCard from "../ui/ProductCard";
import Pagination from "../ui/Pagination";
import { SparklesIcon } from "lucide-react";

export default function ProductsSection({ addToCart }) {
  const { isDarkMode } = useTheme();
  const {
    data: products,
    meta,
    page,
    setPage,
    loading,
    error,
  } = usePaginatedFetch("/products", { perPage: 3 });

  return (
    <section className={`${isDarkMode ? "bg-slate-900" : "bg-gray-50"} py-10`}>
      <Container>
        <SectionHeader
          heading="Our Products"
          badge="EXPLORE PRODUCTS"
          description="Browse through our wide selection of products. Find the best deals and latest items curated just for you."
          Icon={SparklesIcon}
        />

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorContainer message="Failed to load data" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(products || []).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>

            <Pagination
              meta={meta}
              page={page}
              onPageChange={setPage}
              maxButtons={5}
              className="justify-center mb-6"
            />
          </>
        )}
      </Container>
    </section>
  );
}
