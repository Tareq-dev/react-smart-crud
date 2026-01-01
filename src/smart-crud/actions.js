import { getEntry } from "./store";
import { request } from "./http";
import { notify } from "./notify";

/* ================= CREATE ================= */
export function createItem(url, data, options = {}) {
  const entry = getEntry(url);

  /* ========== OPTIMISTIC ========== */
  const optimisticData = options.optimistic ? options.optimistic(data) : data;

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
        item._temp ? { ...item, ...serverData, _temp: false } : item
      );
      if (options.onSuccess) {
        options.onSuccess(serverData);
      } else {
        notify("success", "Created", { url, data: serverData });
      }
    })
    .catch((error) => {
      // 🔴 rollback
      entry.data = entry.data.filter((i) => !i._temp);

      if (options.onError) {
        options.onError?.(error);
      } else {
        notify("error", error.message || "Create failed", {
          url,
          error,
        });
      }
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
      if (options.onSuccess) {
        options.onSuccess(serverData);
      } else {
        notify("success", "Updated", { url, id, data: serverData });
      }
    })
    .catch((error) => {
      entry.data = backup;
      if (options.onError) {
        options.onError?.(error);
      } else {
        notify("error", error.message || "Update failed", {
          url,
          id,
          error,
        });
      }
    })
    .finally(() => entry.subscribers.forEach((fn) => fn()));
}
/* ================= DELETE ================= */
export function deleteItem(url, id, options = {}) {
  const entry = getEntry(url);
  const backup = [...entry.data];

  // 🟢 Optimistic delete
  entry.data = entry.data.filter((i) => i.id !== id);
  entry.subscribers.forEach((fn) => fn());

  request(`${url}/${id}`, { method: "DELETE" })
    .then(() => {
      if (options.onSuccess) {
        options.onSuccess();
      } else {
        notify("success", "Deleted", { action: "delete", url, id });
      }
    })
    .catch((error) => {
      // 🔴 rollback
      entry.data = backup;
      entry.subscribers.forEach((fn) => fn());

      if (options.onError) {
        options.onError(error);
      } else {
        notify("error", error.message || "Delete failed", {
          action: "delete",
          url,
          id,
          error,
        });
      }
    });
}
