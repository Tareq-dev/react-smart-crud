function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

function isDataArray(arr) {
  if (!Array.isArray(arr)) return false;
  if (arr.length === 0) return false; // ⚠️ empty ignore

  const first = arr[0];

  // primitive array reject
  if (!isPlainObject(first)) return false;

  // strong CRUD hint
  if ("id" in first || "_id" in first) return true;

  // fallback: object array
  return true;
}

export function normalizeResponse(input) {
  // 1️⃣ Direct array
  if (Array.isArray(input)) return input;

  if (!isPlainObject(input)) return [];

  const found = [];

  function scan(obj, depth = 0) {
    if (depth > 5) return; // 🔒 infinite loop protection

    for (const value of Object.values(obj)) {
      if (Array.isArray(value) && isDataArray(value)) {
        found.push(value);
      } else if (isPlainObject(value)) {
        scan(value, depth + 1);
      }
    }
  }

  scan(input);

  // 2️⃣ One clear candidate
  if (found.length === 1) return found[0];

  // 3️⃣ Multiple → biggest meaningful
  if (found.length > 1) {
    return found.sort((a, b) => b.length - a.length)[0];
  }

  // 4️⃣ Single object (GET by id)
  if ("id" in input || "_id" in input) {
    return [input];
  }

  // 5️⃣ Fallback
  return [];
}
