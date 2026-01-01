

# react-smart-crud 

 
A **minimal, smart, optimistic CRUD helper for React**  
No Redux. No Zustand. No boilerplate.

**Designed for api management systems**.


## ✨ Features

- ⚡ Optimistic UI (instant update)
- 🧠 Global cache (shared across components)
- ♻️ Auto re-fetch & sync
- 🔐 Optional auth token support
- 🔔 Optional toast / notification support
- 🧩 Zero external state library
- 🪶 Very small API surface

---

## 📦 Installation

```bash
npm create vite@latest my-project

cd my-project

npm install react-smart-crud
````

Optional dependency:

```bash
npm install react-hot-toast
```

---

## ⚙️ One-time Setup (Required)

Create a setup file **once** in your app.

### 📄 `src/smartCrudConfig.js`

```js
import { setupCrud } from "react-smart-crud";
import toast from "react-hot-toast";

setupCrud({
  baseUrl: "https://jsonplaceholder.typicode.com",
  getToken: () => localStorage.getItem("token"),
  notify: (type, message) => {
    if (type === "success") toast.success(message);
    if (type === "error") toast.error(message);
  },
});
```

### 📄 `main.jsx`

```js
import "./smartCrudConfig";
```

⚠️ **Do this only once** in your app.

---

## 🧠 useCrud Hook

```js
const { data, loading, error } = useCrud("users");
```

### Returned values

| key     | type    | description   |
| ------- | ------- | ------------- |
| data    | array   | cached data   |
| loading | boolean | request state |
| error   | any     | error info    |

---

## ✍️ Create (POST)

```js
createItem("users", { name: "John" });
```

### With optimistic UI

```js
createItem(
  "users",
  { name: "John" },
  {
    optimistic: (data) => data,
    onSuccess: () => console.log("Created"),
    onError: (err) => console.error(err),
  }
);
```

---

## 🔄 Update (PUT)

```js
updateItem("users", 1, { name: "Updated" });
```

---

## ❌ Delete (DELETE)

```js
deleteItem("users", 1);
```

---

## 📂 Example Endpoints

| Action | Endpoint          |
| ------ | ----------------- |
| Fetch  | GET /users        |
| Create | POST /users       |
| Update | PUT /users/:id    |
| Delete | DELETE /users/:id |

---

## 🧪 Works With

* REST APIs
* Laravel / Express / Django
* Admin dashboards
* School / Business management systems
* Small to mid projects

---

## 🧩 Philosophy

> Simple cache + smart subscribers
> No unnecessary abstraction
> Let React re-render naturally

---

## 📄 License

MIT © Tarequl Islam





## ✅  REAL-WORLD EXAMPLE (Vite + React)

### 📄 `UserPage.jsx`

```jsx
import { useCrud, createItem, deleteItem } from "react-smart-crud";

export default function UserPage() {
  const { data: users, loading, error } = useCrud("users");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      <button
        onClick={() =>
          createItem("users", {
            name: "New User",
            email: "test@mail.com",
          })
        }
      >
        ➕ Add User
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name}
            <button onClick={() => deleteItem("users", u.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
````

 
---

## 🔥 Optimistic UI – Full Explanation (ADD THIS)

### 🎯 Why Optimistic UI?

Optimistic UI means:

> **Server response আসার আগেই UI update হবে**
> Error হলে auto rollback হবে

react-smart-crud এ এটা **fully optional**।

---

## 🧠 Optimistic Options Structure

Every mutation (`createItem`, `updateItem`, `deleteItem`) supports:

```ts
{
  optimistic?: Function
  onSuccess?: Function
  onError?: Function
}
```

---

## 🟢 CREATE with Optimistic UI

### Example

```js
createItem(
  "users",
  {
    email: form.email,
    password: form.password,
  },
  {
    // 🔮 optimistic preview data
    optimistic: (data) => ({
      email: data.email,
      role: "user",
    }),

    onSuccess: () => toast.success("User created"),
    onError: () => toast.error("Failed to create"),
  }
);
```

### How it works


1. Temporary item added instantly
2. `_temp: true` flag attached
3. Server response merges into same item
4. Error হলে rollback


---
 

## 🔄 UPDATE with Optimistic UI (Advanced)

### Example

```js
updateItem(
  "users",
  editingUser.id,
  {
    email: form.email,
    role: form.role,
  },
  {
    optimistic: (old, patch) => ({
      ...old,
      email: patch.email,
      role: patch.role,
    }),

    onSuccess: () => {
      toast.success("Profile updated");
      clearEdit();
    },

    onError: (err) => toast.error(err.message),
  }
);
```

### Optimistic function signature

```ts
optimistic: (oldItem, newData) => updatedItem
```

✔ You control exactly how UI changes
✔ Useful for forms, partial updates, toggle switches

---

## ❌ DELETE with Manual Error Handling

```js
deleteItem("users", user.id, {
  onSuccess: () => toast.success("Deleted"),
  onError: (err) => toast.error(err.message),
});
```

---

## 🔔 Toast / Notification Integration

You can use:

* react-hot-toast

---

## 🔧 One-time Setup for Toast

### `src/smartCrudConfig.js`

```js
import { setupCrud } from "react-smart-crud";
import toast from "react-hot-toast";

setupCrud({
  baseUrl: "https://your-api.com",

  notify: (type, message) => {
    if (type === "success") toast.success(message);
    if (type === "error") toast.error(message);
  },
});
```

---

## 🧠 Manual vs Automatic Notifications

### Automatic (inside library)

```js
notify("success", "Deleted");
```

### Manual (recommended)

```js
createItem("users", data, {
  onSuccess: () => toast.success("Created"),
  onError: (err) => toast.error(err.message),
});
```

✔ Full control
✔ Better UX
✔ No magic

---

# 🧩 Summary Table (ADD THIS)

| Action     | Optimistic         | Rollback | Manual Toast |
| ---------- | ------------------ | -------- | ------------ |
| createItem | ✅                  | ✅        | ✅            |
| updateItem | ✅                  | ✅        | ✅            |
| deleteItem | ❌ (instant remove) | ✅        | ✅            |

---

# 💡 Best Practices (Pro Tips)

✔ Always return **full object** from optimistic update

✔ Keep optimistic logic **UI-only**

✔ Never trust optimistic data as server truth

✔ Handle toast in component, not inside library

---

















---

## ✅ How it works (Mental Model)

```
Component
   ↓
useCrud("users")
   ↓
Global store cache
   ↓
API request (once)
   ↓
All subscribers auto update
```

👉 Multiple components → **same data, no duplicate fetch**

---