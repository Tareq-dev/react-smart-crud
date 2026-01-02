export const setByPath = (obj, path, value) => {
  const keys = path.split(".");
  const last = keys.pop();

  let ref = obj;
  keys.forEach((k) => {
    if (!ref[k]) ref[k] = {};
    ref = ref[k];
  });

  ref[last] = value;
};

export const getByPath = (obj, path) =>
  path.split(".").reduce((o, k) => o?.[k], obj);
