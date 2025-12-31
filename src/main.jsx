import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import toast, { Toaster } from "react-hot-toast";
import { setupCrud } from "./smart-crud";
import "./index.css";

// Toastless
// setupCrud({
//   baseUrl: "https://api.example.com"
// })

setupCrud({
  baseUrl: "http://localhost:8000/v1/api/",
  getToken: () => localStorage.getItem("token"),

  notify: (type, message) => {
    if (type === "success") toast.success(message);
    if (type === "error") toast.error(message);
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Toaster />
  </>
);
