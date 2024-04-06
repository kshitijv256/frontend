// useRequest.tsx

import axios from "axios";
import { useState, useEffect } from "react";

type UseRequestResult<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

export const useRequest = <T,>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: never,
): UseRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.request<T>({
          url,
          method,
          data: body,
        });
        setData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, method, body]);

  return { data, error, loading };
};
