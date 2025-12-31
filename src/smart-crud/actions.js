import { getEntry } from "./store";
import { request } from "./http";
import { notify } from "./notify";

/* ================= CREATE ================= */

export function createItem(url, data, options = {}) {
  const entry = getEntry(url);

  /* ========== OPTIMISTIC ========== */
  const optimisticData = options.optimistic
    ? options.optimistic(data)
    : data;

  const tempItem = {
    id: Date.now(),
    ...optimisticData,
    _temp: true,
  };

  entry.data = [tempItem, ...entry.data];
  entry.subscribers.forEach((fn) => fn());

  /* ========== REQUEST ========== */
  request(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((serverData) => {
      // ✅ MERGE — replace না
      entry.data = entry.data.map((item) =>
        item._temp
          ? { ...item, ...serverData, _temp: false }
          : item
      );

      options.onSuccess?.(serverData);
    })
    .catch((error) => {
      // 🔴 rollback
      entry.data = entry.data.filter((i) => !i._temp);
      options.onError?.(error);
    })
    .finally(() => {
      entry.subscribers.forEach((fn) => fn());
    });
}


/* ================= UPDATE ================= */
export function updateItem(url, id, data, options = {}) {
  const entry = getEntry(url);
  const backup = [...entry.data];

  // 🟢 OPTIMISTIC UPDATE
  entry.data = entry.data.map((item) =>
    item.id === id
      ? {
          ...(options.optimistic
            ? options.optimistic(item, data)
            : { ...item, ...data }),
          _updating: true,
        }
      : item
  );

  entry.subscribers.forEach((fn) => fn());

  request(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((serverData) => {
      // 🔵 Merge server data, overwrite না
      entry.data = entry.data.map((item) =>
        item.id === id ? { ...item, ...serverData, _updating: false } : item
      );

      options.onSuccess?.(serverData);
    })
    .catch((error) => {
      entry.data = backup;
      options.onError?.(error);
    })
    .finally(() => entry.subscribers.forEach((fn) => fn()));
}

/* ================= DELETE ================= */
export function deleteItem(url, id, options = {}) {
  const entry = getEntry(url);
  const backup = [...entry.data];

  entry.data = entry.data.filter((i) => i.id !== id);
  entry.subscribers.forEach((fn) => fn());

  request(`${url}/${id}`, { method: "DELETE" })
    .then(() => {
      options.onSuccess?.();
      notify("success", "Deleted");
    })
    .catch((error) => {
      entry.data = backup;
      entry.subscribers.forEach((fn) => fn());
      options.onError?.(error);
    });
}
