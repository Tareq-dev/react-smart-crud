import { config } from "./config";

export async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  // 🔐 token optional
  if (config.getToken) {
    const token = config.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(config.baseUrl + url, {
    ...options,
    headers,
  });

  // 🟢 body safe parse
  const data = await res.json().catch(() => ({}));

  // 🔴 IMPORTANT FIX
  if (!res.ok) {
    throw {
      status: res.status,
      message: data.message || "Something went wrong",
      data,
    };
  }

  return data;
}
