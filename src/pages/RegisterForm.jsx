import { useSmartForm } from "../smart-form/useSmartForm";
import { v } from "../smart-form/validators";
import FormInput from "../smart-form/FormInput";
import ErrorSummary from "../smart-form/ErrorSummary";

export default function RegisterForm() {
  const form = useSmartForm();
  form._validators = [];

  const onSubmit = (data) => {
    console.log("FINAL DATA", data);
    // form.reset();
  };

  return (
    <div className="flex items-center justify-centerpx-4">
      <form
        onSubmit={form.submit(onSubmit, form._validators)}
        className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl p-8 space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-sm text-gray-500 mt-1">
            Fill the form to get started
          </p>
        </div>

        {/* Errors */}
        {/* <ErrorSummary errors={form.errors} /> */}

        {/* Inputs */}
        <div className="flex flex-col gap-2">
          {/* <FormInput
            className="border px-2 rounded py-1 border-gray-300"
            form={form}
            name="name"
            placeholder="Full Name"
            validators={[v.required(), v.minLen(10)]}
          /> */}

          {/* <FormInput
            className="border px-2 rounded py-1 border-gray-300"
            form={form}
            name="age"
            type="number"
            placeholder="Age"
            validators={[v.min(18)]}
          /> */}

          {/* <FormInput
            className="border px-2 rounded py-1 border-gray-300"
            form={form}
            name="address.city"
            placeholder="City"
          /> */}

          {/* <FormInput
            className="border px-2 rounded py-1 border-gray-300"
            form={form}
            name="phone"
            placeholder="+880XXXXXXXXX"
            validators={[v.required(), v.startsWith("+880"), v.exactLen(11)]}
          /> */}

          {/* <FormInput
            className="border px-2 rounded py-1 border-gray-300"
            form={form}
            name="avatar"
            type="file"
            validators={[v.fileSize(500)]}
          /> */}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 font-medium shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
          >
            Register
          </button>

          <button
            type="button"
            onClick={form.reset}
            className="flex-1 rounded-xl border border-gray-300 text-gray-600 py-2.5 font-medium hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
