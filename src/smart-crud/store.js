export const store = new Map();

export function getEntry(key) {
  // console.log("ENTRY KEY:", key);
  if (!store.has(key)) {
    store.set(key, {
      data: [],
      loading: false,
      error: null,
      subscribers: new Set(),
    });
  }
  return store.get(key);
}
