import Router from "next/router";
import getT from "next-translate/getT";
import {NotificationManager} from "./NotificationManager";

export const fetcher = async <T>(url: string, params: RequestParams = {}): Promise<T | undefined> => {
  const t = await getT("", "api");

  let method = params.method || "GET";

  const headers: Headers = new Headers(params.headers);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  let body;
  if (params.body) {
    if (!method || method === "GET")
      method = "POST";

    body = JSON.stringify(params.body || null);
  }

  const queryString = params.query || {};
  const qs = new URLSearchParams();
  Object.keys(queryString).filter(key => queryString[key]).forEach(key => {
    if (Array.isArray(queryString[key])) {
      (queryString[key] as string[]).filter(val => val).map(val => qs.append(`${key}`, `${val}`));
      return;
    }

    qs.append(key, `${queryString[key]}`);
  });

  let response: Response, result;
  try {
    const basePath = process.env.NEXT_PUBLIC_API_URL;
    response = await fetch(`${basePath}/${url}?${qs}`, {headers, method, body, credentials: "include"});

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else if (!contentType || contentType.indexOf("text/html") === -1) {
      result = await response.text();
    }

    if (response.ok)
      return result;

    let title;
    if (result)
      title = result;

    switch (response.status) {
      case 400:
        NotificationManager.error({message: t("api:fetcher.err400"), title});
        return undefined;
      case 401:
        NotificationManager.error({message: t("api:fetcher.err401"), title});
        if (Router && window && window.location) {
          await Router.push({
            pathname: "/login",
            query: {
              redirect: window.location.href
            }
          });
        }
        return undefined;
      case 403:
        NotificationManager.error({message: t("api:fetcher.err403"), title});
        return undefined;
      case 404:
        NotificationManager.error({message: t("api:fetcher.err404"), title});
        return undefined;
      default:
      case 500:
        NotificationManager.error({message: t("api:fetcher.err500"), title});
        return undefined;
    }
  } catch (e) {
    NotificationManager.error({message: t("api:fetcher.exception"), title: t(e.message)});
    return undefined;
  }
};

type Fetcher = <T>(url: string, params?: RequestParams) => Promise<T>;
export type RequestParams = {
  method?: RequestMethod;
  headers?: Headers;
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
