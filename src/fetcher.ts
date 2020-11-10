import {_NextI18Next} from "@topsoft4u/utils/dist/i18n";
import Router from "next/router";
import {NotificationManager} from "./NotificationManager";

export const fetcher = async <T>(url: string, params: RequestParams = {}): Promise<T | undefined> => {
  const {i18n} = _NextI18Next.getInstance();
  const t = i18n.t.bind(i18n);

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

  let response, result;
  try {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    response = await fetch(`${baseUrl}/api/${url}?${qs}`, {headers, method, body});

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else if (contentType && contentType.indexOf("text/html") === -1) {
      result = await response.text();
    }

    if (response.ok)
      return result;

    let title;
    if (result)
      title = t(result, {ns: "api"});

    switch (response.status) {
      case 400:
        NotificationManager.error({message: t("You have to figure this out before proceeding.", {ns: "api"}), title});
        return undefined;
      case 401:
        NotificationManager.error({message: t("You must be signed in to perform this action", {ns: "api"}), title});
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
        NotificationManager.error({message: t("You do not have permissions to perform this action", {ns: "api"}), title});
        return undefined;
      case 404:
        NotificationManager.error({message: t("Action does not exists", {ns: "api"}), title});
        return undefined;
      default:
      case 500:
        NotificationManager.error({message: t("This is not your fault, that's us. We'll fix this as soon as we can.", {ns: "api"}), title});
        return undefined;
    }
  } catch (e) {
    NotificationManager.error({message: t("This is not your fault, that's us. We'll fix this as soon as we can.", {ns: "api"}), title: t(e.message, {ns: "api"})});
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
