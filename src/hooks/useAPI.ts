import {fetcher, RequestParams} from "../fetcher";
import React from "react";

export const useAPI = <T>(url: string): [(params: RequestParams) => Promise<T | undefined>, boolean] => {
  const [inProgress, setInProgress] = React.useState(false);

  const execute = React.useCallback(async (params: RequestParams) => {
    setInProgress(true);

    const result = await fetcher<T>(url, params);

    setInProgress(false);
    return result;
  }, [url]);

  return [execute, inProgress];
};
