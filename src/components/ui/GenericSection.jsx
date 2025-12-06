import { Container } from "react-bootstrap";
import { useTheme } from "../../contexts/ThemeContext";
import usePaginatedFetch from "../../hooks/usePaginatedFetch";
import ErrorContainer from "./ErrorContainer";
import Loader from "./Loader";
import Pagination from "./Pagination";
import SectionHeader from "./SectionHeader";

function GenericSection({
  endpoint,
  badge,
  heading,
  description,
  itemRenderer,
  perPage = 3,
  icon,
}) {
  const { isDarkMode } = useTheme();
  const { data, meta, page, setPage, loading, error } = usePaginatedFetch(
    endpoint,
    { perPage }
  );

  return (
    <section className={`${isDarkMode ? "bg-slate-900" : "bg-gray-50"} py-3`}>
      <Container>
        <SectionHeader
          badge={badge}
          heading={heading}
          description={description}
          Icon={icon}
        />

        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorContainer message="Failed to load data" />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {(data || []).map(itemRenderer)}
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

export default GenericSection;
