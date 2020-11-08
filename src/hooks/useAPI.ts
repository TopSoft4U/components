import React from "react";
import {fetcher, RequestMethod, RequestParams} from "../fetcher";

export const useAPI = <T>(url: string, method: RequestMethod = "GET"): [(params?: RequestParams) => Promise<T | undefined>, boolean] => {
  const [inProgress, setInProgress] = React.useState(false);

  const execute = React.useCallback(async (params?: RequestParams) => {
    setInProgress(true);

    const result = await fetcher<T>(url, {method, ...(params || {})});

    setInProgress(false);
    return result;
  }, [method, url]);

  return [execute, inProgress];
};
