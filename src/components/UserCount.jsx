import { useCrud } from "../smart-crud";

export default function UserCount() {
  const users = useCrud("users");

  return (
    <div className="text-sm text-end mr-2 my-2 text-gray-600">
      Total users: <span className="font-semibold">{users.data.length}</span>
    </div>
  );
}
