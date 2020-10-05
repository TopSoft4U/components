import {_NextI18Next} from "@topsoft4u/utils/dist/i18n";
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
  Object.keys(queryString).filter(key => queryString[key]).forEach(key => qs.append(key, `${queryString[key]}`));

  let response, result;
  try {
    response = await fetch(`${window.location.origin}/api/${url}?${qs}`, {headers, method, body});

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    switch (response.status) {
      case 200:
        break;
      case 400:
        NotificationManager.error({message: t("You have to figure this out before proceeding.", {ns: "api"}), title: t(result, {ns: "api"})});
        break;
      case 401:
        NotificationManager.error({message: t("You must be signed in to perform this action", {ns: "api"}), title: t(result, {ns: "api"})});
        break;
      case 403:
        NotificationManager.error({message: t("You do not have permissions to perform this action", {ns: "api"}), title: t(result, {ns: "api"})});
        break;
      default:
      case 500:
        NotificationManager.error({message: t("This is not your fault, that's us. We'll fix this as soon as we can.", {ns: "api"}), title: t(result, {ns: "api"})});
        break;
    }
  } catch (e) {
    NotificationManager.error({message: t("This is not your fault, that's us. We'll fix this as soon as we can.", {ns: "api"}), title: t(e.message, {ns: "api"})});
  }

  return result;
};

type Fetcher = <T>(url: string, params?: RequestParams) => Promise<T>;
export type RequestParams = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Headers;
  body?: Record<string, unknown> | undefined;
  query?: Record<string, unknown>;
}
