import { useCallback, useEffect, useState } from "react";

/**
 * Generic data-fetching hook for the services layer.
 * Pass a function that returns a Promise (e.g. () => getCompanies()).
 * `deps` controls when the request re-runs (e.g. an id from the URL).
 *
 * Returns { data, loading, error, refetch }. Call refetch() to reload
 * (e.g. after creating a record) without leaving the page.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTick, setReloadTick] = useState(0);

  const refetch = useCallback(() => setReloadTick((tick) => tick + 1), []);

  useEffect(() => {
    let active = true;
    // Reset state on every dependency change so a refetch (e.g. a new id on a
    // detail page) shows the loading state again instead of stale data.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((err) => {
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadTick]);

  return { data, loading, error, refetch };
}
