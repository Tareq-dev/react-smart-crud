
# react-smart-crud   
Smart, minimal, and developer-controlled CRUD engine for React — with **Optimistic UI**, **zero prop-drilling**, and **no state management headache**.

---

## 🔥 What is react-smart-crud?

`react-smart-crud` is a **lightweight state + CRUD utility** designed to remove the most painful parts of React CRUD development:

- ❌ No more endless `useState`
- ❌ No more `useEffect` refetch loops
- ❌ No prop drilling between components
- ❌ No forced toast / UI library
- ❌ No Redux / React Query overhead

👉 You write **business logic**, not plumbing.

---

## 🧠 Core Idea (Very Important)

> **One shared store per resource.  
Optimistic first.  
Server truth always wins.  
Developer controls UI & UX.**

- Data lives in a **central in-memory store**
- Any component subscribed to that store updates automatically
- CRUD actions update UI instantly (optimistic)
- Server response finalizes or rolls back state
- Errors come directly from backend

---

## 😵 Problems This Library Solves

### Before (Typical React CRUD)
- `useState` in parent
- `useEffect` for fetch
- Props passed through 3–4 components
- Re-fetch list after every mutation
- Toast logic mixed with API logic
- Server error message lost

### After (react-smart-crud)
- ✅ No `useState` for list data
- ✅ No `useEffect` refetch
- ✅ No props drilling
- ✅ Instant UI update
- ✅ Manual toast control
- ✅ Real server error shown

---

## ✨ Key Features

✅ Optimistic Create / Update / Delete  
✅ No `useState` needed for CRUD data  
✅ No `useEffect` dependency hell  
✅ No props drilling between components  
✅ Works across **multiple components automatically**  
✅ Manual toast / notification control  
✅ Backend error message preserved  
✅ Automatic rollback on failure  
✅ REST API friendly  
✅ Extremely small & fast  

---

## 👥 Who Is This For?

### Perfect for:
- React dashboard projects
- Admin panels
- School / ERP / CRM systems
- MERN stack apps
- Freelancers & agencies
- Developers tired of over-engineering

### Not meant for:
- Offline-first apps
- GraphQL heavy caching
- Real-time sync systems

---

## 🆚 Comparison With Existing Solutions

| Feature | react-smart-crud | React Query | Redux |
|------|------------------|-------------|-------|
| useState needed | ❌ No | ❌ No | ❌ No |
| useEffect needed | ❌ No | ❌ No | ❌ No |
| Prop drilling | ❌ No | ❌ No | ❌ No |
| Optimistic UI | ✅ Simple | ⚠️ Complex | ⚠️ Manual |
| Toast control | ✅ Full | ❌ Indirect | ❌ Indirect |
| Boilerplate | 🔥 Very Low | Medium | High |
| Learning curve | ⭐ Easy | ⭐⭐ Medium | ⭐⭐⭐ Hard |

---

## 📦 Installation

``` 
npm install react-smart-crud
```


Optional (for UI notifications)

```
npm install react-hot-toast
```


⚠️ **Toast library is NOT required**

You can use:

* Modal
* Alert
* Snackbar
* Custom UI
* Or nothing at all

---

## 🗂️ Recommended Folder Structure

```txt
src/
 ├─ smart-crud/
 │   ├─ config.js     # baseUrl & token config
 │   ├─ http.js       # fetch wrapper
 │   ├─ store.js      # central data store
 │   ├─ crud.js       # create / update / delete
 │   └─ index.js      # exports
```

---

## ⚙️ Configuration

### `config.js`

```js
export const config = {
  baseUrl: "",
  getToken: null,
  notify: null // ✅ toast handler
}

export function setupCrud(options = {}) {
  config.baseUrl = options.baseUrl || ""
  config.getToken = options.getToken || null
  config.notify = options.notify || null
}

```

### Why this design?

* `baseUrl` → auto applied everywhere
* `getToken` → optional, dynamic
* Works with:

  * JWT
  * Cookie-based auth
  * Public APIs

---

## 🌐 HTTP Layer (Server Error Safe)

```js
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

```

### Benefits

✔ Backend error message preserved
✔ UI controls error display
✔ No generic error forcing

---

## 🧠 Store Concept (No useState, No Props)

* One store per resource
* Shared across all components
* Subscribers auto re-render

### What you DON’T do anymore

* ❌ No `useState` for lists
* ❌ No `useEffect` for fetching
* ❌ No prop drilling
* ❌ No manual syncing

---

## ✍️ Usage Examples

### CREATE (Optimistic + Toast)

```js
 createItem(
        "users",
        {
          email: form.email,
          password: form.password,
        },
        {
          optimistic: (data) => ({
            email: data.email,
            role: "user",
          }),

          onSuccess: () => toast.success("User created"),
          onError: () => toast.error("Failed to create"),
        }
      );
```

---

### UPDATE (Optimistic Patch)

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
            clearEdit(); // ✅ Clear 
          },
          onError: (err) => toast.error(err.message),
        }
      );
```

---

### DELETE

```js
deleteItem("users", id, {
  onError: (err) => toast.error(err.message),
});
```

---

## ⚡ Optimistic UI Flow

1. UI updates instantly
2. API request is sent
3. Server success → finalize data
4. Server error → rollback
5. Subscribers re-render automatically

No refetch
No flicker
No confusion

---

## ❗ Error Handling (Real Server Message)

### Backend

```js
res.status(400).json({ message: "Invalid role" });
```

### Frontend

```js
onError: (err) => toast.error(err.message);
```

✔ User sees exact server message
✔ You control UX

---

## 🧩 Why No useEffect?

* Data already exists in store
* Subscribers handle re-render
* No dependency array bugs
* No infinite loops

---

## 🧩 Why No useState?

* CRUD data is shared
* Multiple components use same data
* Manual syncing is fragile

---

## 🧩 Why No Prop Drilling?

* Store is global per resource
* Components subscribe directly
* Clean and scalable

---

## 🚀 Best Use Cases

* Admin dashboards
* Management systems
* Internal tools
* CRUD-heavy applications
* Rapid MVPs

---

## ❤️ Philosophy

> Simple tools scale better than complex abstractions.

No magic
No hidden behavior
Just predictable CRUD

---

## 📄 License

MIT — free to use, modify, and ship.

---

## 🙌 Final Note

If you understand basic React,
you already understand **react-smart-crud**.

Happy coding 🚀