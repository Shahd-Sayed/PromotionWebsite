import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Container } from "react-bootstrap";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";
import EmptyStat from "../components/ui/EmptyStat";
import Pagination from './../components/ui/Pagination';
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import ProductCard from "../components/ui/ProductCard";
import HeadingPages from './../components/ui/HeadingPages';


export default function ProductPage() {
  const { isDarkMode } = useTheme();
  const [cart, setCart] = useState([]);

  const {
    data: products,
    meta,
    page,
    setPage,
    loading,
    error,
  } = usePaginatedFetch("/products", {
    perPage: 8,
  });

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-slate-900" : "bg-gray-100"
      } min-h-screen py-6`}>
        
      <Container>

        <HeadingPages heading={"Our Products"} />

        {loading && <Loader />}

        {error && <ErrorAlert message={"Failed to load products"} />}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <EmptyStat message={"No products found"} />
        )}

        <div className="mt-8 flex justify-center">
          <Pagination meta={meta} page={page} onPageChange={setPage} />
        </div>
      </Container>
    </div>
  );
}
