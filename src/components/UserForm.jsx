import { useEffect, useState } from "react";
import { createItem, updateItem } from "../smart-crud";
import toast from "react-hot-toast";

export default function StudentForm({ editingStudent, clearEdit, refetch }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    class: "",
    phone: "",
    roll: "",
    gender: "",
  });
  // 🟢 Edit mode হলে form fill হবে
  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name || "",
        email: editingStudent.email || "",
        class: editingStudent.class || "",
        phone: editingStudent.phone || "",
        roll: editingStudent.roll || "",
        gender: editingStudent.gender || "",
      });
    } else {
      resetForm();
    }
  }, [editingStudent]);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      class: "",
      phone: "",
      roll: "",
      gender: "",
    });
  };

  function submit(e) {
    e.preventDefault();

    const { name, email, class: cls, phone, roll, gender } = form;

    // 🔴 Simple validation
    if (!name || !email || !cls || !phone || !roll || !gender) {
      return toast.error("All fields are required");
    }

    if (editingStudent) {
      // 🔵 UPDATE
      updateItem(
        "stu",
        editingStudent.id,
        {
          name,
          email,
          class: Number(cls),
          phone,
          roll: Number(roll),
          gender,
        },
        {
          onSuccess: () => {
            toast.success("Student updated");
            refetch();
            clearEdit();
          },
          onError: (err) => toast.error(err.message),
        }
      );
    } else {
      // 🟢 CREATE
      createItem(
        "stu",
        {
          name,
          email,
          class: Number(cls),
          phone,
          roll: Number(roll),
          gender,
        },
        {
          onSuccess: () => {
            toast.success("Student added ✔");
            refetch();
          },
          onError: () => toast.error("Failed to add student"),
        }
      );
    }

    resetForm();
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <h3 className="text-xl font-semibold p-4 border-b">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h3>

      <form onSubmit={submit}>
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left">Name</th>
              <th className="px-3 py-2 text-left">Email</th>
              <th className="px-3 py-2 text-left">Class</th>
              <th className="px-3 py-2 text-left">Roll</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Gender</th>
              <th className="px-3 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              {/* Name */}
              <td className="px-1 py-2">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Name"
                />
              </td>

              {/* Email */}
              <td className="px-1 py-2">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Email"
                />
              </td>

              {/* Class */}
              <td className="px-1 py-2">
                <input
                  type="number"
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Class"
                />
              </td>

              {/* Roll */}
              <td className="px-1 py-2">
                <input
                  type="number"
                  value={form.roll}
                  onChange={(e) => setForm({ ...form, roll: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Roll"
                />
              </td>

              {/* Phone */}
              <td className="px-1 py-2">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Phone"
                />
              </td>

              {/* Gender */}
              <td className="px-1 py-2">
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </td>

              {/* Actions */}
              <td className="px-3 py-2 text-center space-x-2">
                {editingStudent && (
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
                  {editingStudent ? "Update" : "Add"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
