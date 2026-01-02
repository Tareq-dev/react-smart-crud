import { getByPath } from "./helpers";

export default function FormInput({ form, name, validators = [], ...props }) {
  const value = getByPath(form.values, name);

  if (validators.length) {
    form._validators.push({ name, rules: validators });
  }

  return (
    <>
      <div>
        <input {...props} {...form.bind(name)} />
        {form.errors[name] && (
          <p className="text-xs pt-1 text-red-600">{form.errors[name]}</p>
        )}
      </div>
    </>
  );
}
