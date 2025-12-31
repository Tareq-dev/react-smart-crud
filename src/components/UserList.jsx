import { useCrud, deleteItem } from "../smart-crud";

export default function UserList({ onEdit }) {
  const users = useCrud("users");

  const data = users?.data || [];
  if (users.loading) return <p>Loading...</p>;
  if (users.error) return <p>{users.error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <h3 className="text-xl font-semibold p-4 border-b">User List</h3>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user, i) => (
            <tr key={i} className="border-t">
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>

              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteItem("users", user.id)}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
