import { useEffect, useState } from "react";
import { createItem, updateItem } from "../smart-crud";
import toast from "react-hot-toast";

export default function UserForm({ editingUser, clearEdit }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  // 🟢 edit mode হলে form fill হবে
  useEffect(() => {
    if (editingUser) {
      setForm({
        email: editingUser.email || "",
        password: "",
        role: editingUser.role || "",
      });
    } else {
      setForm({
        email: "",
        password: "",
        role: "",
      });
    }
  }, [editingUser]);

  function submit(e) {
    e.preventDefault();
    if (!form.email.trim()) return;

    if (editingUser) {
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
            clearEdit(); // ✅ success এ
          },
          onError: (err) => toast.error(err.message),
        }
      );
    } else {
      // ✅ CREATE → email + password
      if (!form.password.trim()) return;

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
    }

    setForm({ email: "", password: "", role: "" });
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <h3 className="text-xl font-semibold p-4 border-b">
        {editingUser ? "Edit User" : "Add User"}
      </h3>

      <form onSubmit={submit}>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">
                {editingUser ? "Role" : "Password"}
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              {/* Email */}
              <td className="px-4 py-2">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className="w-full border rounded px-2 py-1"
                  required
                />
              </td>

              {/* Role OR Password */}
              <td className="px-4 py-2">
                {editingUser ? (
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="role (admin / user)"
                    className="w-full border rounded px-2 py-1"
                  />
                ) : (
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="password"
                    className="w-full border rounded px-2 py-1"
                    required
                  />
                )}
              </td>

              {/* Actions */}
              <td className="px-4 py-2 text-center space-x-2">
                {editingUser && (
                  <button
                    type="button"
                    onClick={clearEdit}
                    className="px-3 py-1 text-xs border rounded"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="px-3 py-1 text-xs bg-black text-white rounded"
                >
                  {editingUser ? "Update" : "Add"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
