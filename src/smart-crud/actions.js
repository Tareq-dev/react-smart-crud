import { getEntry } from "./store";
import { request } from "./http";
import { notify } from "./notify";

/* ================= CREATE ================= */
export async function createItem(url, data, options = {}) {
  try {
    const serverData = await request(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    options.onSuccess?.(serverData);
    return serverData;
  } catch (err) {
    options.onError?.(err);
    throw err;
  }
}

/* ================= UPDATE ================= */
export async function updateItem(url, id, data, options = {}) {
  const entry = getEntry(url);

  request(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((serverData) => {
      entry.fetched = false; // 🔥

      options.onSuccess?.(serverData);
    })
    .catch((error) => {
      options.onError?.(error);
    })
    .finally(() => {
      entry.subscribers.forEach((fn) => fn());
    });
}
/* ================= DELETE ================= */
export async function deleteItem(url, id, options = {}) {
  try {
    const res = await request(`${url}/${id}`, { method: "DELETE" });
    options.onSuccess?.(res);
    return res;
  } catch (err) {
    options.onError?.(err);
    throw err;
  }
}
