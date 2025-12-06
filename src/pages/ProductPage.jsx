import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { Container } from "react-bootstrap";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";
import EmptyStat from "../components/ui/EmptyStat";
import Pagination from "../components/ui/Pagination";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import ProductCard from "../components/ui/ProductCard";
import HeadingPages from "../components/ui/HeadingPages";

export default function ProductPage({ addToCart }) {
  const { isDarkMode } = useTheme();

  const [filters, setFilters] = useState({
    search: "",
    min_price: "",
    max_price: "",
    category_id: "",
  });

  const {
    data: products,
    meta,
    page,
    setPage,
    setParams,
    loading,
    error,
  } = usePaginatedFetch("/products", {
    perPage: 8,
    params: filters,
  });



  return (
    <div
      className={`${
        isDarkMode ? "bg-slate-900 text-white" : "bg-gray-100 text-black"
      } min-h-screen py-6`}>
      <Container>
        <HeadingPages heading={"Our Products"} />

        <div
          className={`${
            isDarkMode ? "bg-slate-800" : "bg-white"
          } p-4 rounded-xl shadow mb-5`}>
          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              className={`form-control ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Search..."
              value={filters.search}
              onChange={(e) => {
                const value = e.target.value;
                setFilters((prev) => ({ ...prev, search: value }));
                setParams((prev) => ({ ...prev, search: value }));
              }}
            />

            <input
              type="number"
              className={`form-control ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Min Price"
              value={filters.min_price}
              onChange={(e) => {
                const value = e.target.value;
                setFilters((prev) => ({ ...prev, min_price: value }));
                setParams((prev) => ({ ...prev, min_price: value }));
              }}
            />

            <input
              type="number"
              className={`form-control ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              placeholder="Max Price"
              value={filters.max_price}
              onChange={(e) => {
                const value = e.target.value;
                setFilters((prev) => ({ ...prev, max_price: value }));
                setParams((prev) => ({ ...prev, max_price: value }));
              }}
            />

            <button className="btn btn-success" onClick={() => setPage(1)}>
              Apply Filters
            </button>
          </div>
        </div>

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
