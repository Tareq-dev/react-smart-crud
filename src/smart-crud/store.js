export const store = new Map();

export function getEntry(key) {
  if (!store.has(key)) {
    store.set(key, {
      data: [],
      loading: false,
      error: null,
      fetched: false,     // 🔑 NEW
      subscribers: new Set(),
    });
  }
  return store.get(key);
}
