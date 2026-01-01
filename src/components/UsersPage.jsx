import { useState } from "react";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { useCrud } from "../smart-crud";

export default function UsersPage() {
  const crud = useCrud("stu");
  const [editingStudent, setEditingStudent] = useState();

  return (
    <div className="space-y-6">
      <UserForm
        editingStudent={editingStudent}
        clearEdit={() => setEditingStudent(null)}
        refetch={crud.refetch}
      />

      <UserList
        students={crud.data}
        loading={crud.loading}
        onEdit={setEditingStudent} refetch={crud.refetch}
      />
    </div>
  );
}
