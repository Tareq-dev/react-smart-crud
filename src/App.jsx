// import UserCount from "./components/UserCount";
// import UsersPage from "./components/UsersPage";

import RegisterForm from "./pages/RegisterForm";

export default function App() {
  return (
    <>
      <div className="min-w-full flex justify-center my-14">
        <div>
          <h1 className="text-center text-amber-500 text-3xl font-bold underline">
            User CRUD Demo
          </h1>
          <RegisterForm />
          {/* <UserCount />
          <UsersPage /> */}
        </div>
      </div>
    </>
  );
}
