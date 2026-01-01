import toast from "react-hot-toast";
import { deleteItem } from "../smart-crud";

export default function StudentList({ students, loading, refetch, onEdit }) {
  const data = students.slice(-5);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <h3 className="text-xl font-semibold p-4 border-b">Student List</h3>

      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left">Name</th>
            <th className="px-3 py-2 text-left">Email</th>
            <th className="px-3 py-2 text-left">Class</th>
            <th className="px-3 py-2 text-left">Roll</th>
            <th className="px-3 py-2 text-left">Phone</th>
            <th className="px-3 py-2 text-left">Gender</th>
            <th className="px-3 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((student, i) => (
            <tr key={i} className="border-t">
              <td className="px-3 py-2">{student.name}</td>
              <td className="px-3 py-2">{student.email}</td>
              <td className="px-3 py-2">{student.class}</td>
              <td className="px-3 py-2">{student.roll}</td>
              <td className="px-3 py-2">{student.phone}</td>
              <td className="px-3 py-2">{student.gender}</td>

              <td className="px-3 py-2 text-center space-x-2">
                <button
                  onClick={() => onEdit(student)}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteItem("stu", student.id, {
                      onSuccess: () => {
                        toast.success("Student deleted");
                        refetch(); 
                      },
                    })
                  }
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
