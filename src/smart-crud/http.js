import { config } from "./config";
import { normalizeResponse } from "./normalizeResponse";

export async function request(url, options = {}) {
  const method = (options.method || "GET").toUpperCase();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (config.getToken) {
    const token = config.getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(config.baseUrl + url, {
    ...options,
    method,
    headers,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw {
      status: res.status,
      message: json.message || "Something went wrong",
      data: json,
    };
  }
  // 🧠 ONLY normalize for GET
  if (method === "GET") {
    try {
      return normalizeResponse(json);
    } catch (e) {
      console.error("Normalize failed", json);
      return [];
    }
  }

  // POST / PUT / DELETE → raw
  return json;
}
