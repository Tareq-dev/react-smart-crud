import { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function UsersPage() {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="space-y-6">
      <UserForm
        editingUser={editingUser}
        clearEdit={() => setEditingUser(null)}
      />

      <UserList onEdit={setEditingUser} />
    </div>
  );
}
