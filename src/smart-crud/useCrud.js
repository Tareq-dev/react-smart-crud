import { useEffect, useState } from "react";
import { getEntry } from "./store";
import { request } from "./http";

export function useCrud(url) {
  const entry = getEntry(url);
  const [, force] = useState(0);

  useEffect(() => {
    const rerender = () => force((x) => x + 1);
    entry.subscribers.add(rerender);

    if (!entry.loading && entry.data.length === 0) {
      entry.loading = true;

      request(url)
        .then((data) => {
          entry.data = data;
          entry.error = null;
        })
        .catch(() => {
          entry.error = "Failed";
        })
        .finally(() => {
          entry.loading = false;
          entry.subscribers.forEach((fn) => fn());
        });
    }

    return () => entry.subscribers.delete(rerender);
  }, [url]);

  // 🔑 IMPORTANT: return new reference
  return {
    data: entry.data,
    loading: entry.loading,
    error: entry.error,
  };
}
