import { useState, useEffect, useCallback } from "react";
import axiosClient from "../api/axiosClient";

export default function usePaginatedFetch(endpoint, options = {}) {
  const {
    initialPage = 1,
    perPage = 9,
    params: initialParams = {},
    autoFetch = true,
  } = options;

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    count: 0,
    per_page: perPage,
    current_page: initialPage,
    total_pages: 1,
  });
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [per_page, setPerPage] = useState(perPage);
  const [params, setParams] = useState(initialParams);

  const fetchPage = useCallback(
    async (pageNumber = page) => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get(endpoint, {
          params: {
            page: pageNumber,
            perPage: per_page,
            ...params,
          },
        });
        const items = res?.data?.data?.data ?? [];
        const pagination = res?.data?.data?.meta?.pagination ?? {};

        setData(items);
        setMeta({
          total: pagination.total ?? items.length,
          count: pagination.count ?? items.length,
          per_page: pagination.per_page ?? per_page,
          current_page: pagination.current_page ?? pageNumber,
          total_pages: pagination.total_pages ?? 1,
        });
        setPage(pagination.current_page ?? pageNumber);
      } catch (err) {
        console.error("usePaginatedFetch error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, page, per_page, params]
  );

  useEffect(() => {
    if (autoFetch) fetchPage(page);
  }, [page, per_page, params, endpoint]);

  const refresh = () => fetchPage(page);
  const goToPage = (p) => {
    const pn = Math.max(1, Math.min(p, meta.total_pages || p));
    setPage(pn);
  };

  return {
    data,
    meta,
    page,
    setPage: goToPage,
    per_page,
    setPerPage,
    params,
    setParams,
    loading,
    error,
    refresh,
  };
}
