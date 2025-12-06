import { useTheme } from "../contexts/ThemeContext";
import { Container } from "react-bootstrap";
import Loader from "../components/ui/Loader";
import ErrorAlert from "../components/ui/ErrorAlert";
import EmptyStat from "../components/ui/EmptyStat";
import Pagination from "./../components/ui/Pagination";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import HeadingPages from "./../components/ui/HeadingPages";
import CardComponent from "../components/ui/CardComponent";

export default function CategoryPage() {
  const { isDarkMode } = useTheme();

  const {
    data: categories,
    meta,
    page,
    setPage,
    loading,
    error,
  } = usePaginatedFetch("/categories", {
    perPage: 8,
  });

  return (
    <div
      className={`${
        isDarkMode ? "bg-slate-900" : "bg-gray-100"
      } min-h-screen py-6`}>
      <Container>
        <HeadingPages heading={"Our Categories"} />

        {loading && <Loader />}

        {error && <ErrorAlert message={"Failed to load Categories"} />}

        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CardComponent
                key={category.id}
                item={category}
                linkTo={`/categories/${category.id}`}
                isDarkMode={isDarkMode}
                description={category.description}
              />
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && (
          <EmptyStat message={"No Categories found"} />
        )}

        <div className="mt-8 flex justify-center">
          <Pagination meta={meta} page={page} onPageChange={setPage} />
        </div>
      </Container>
    </div>
  );
}
