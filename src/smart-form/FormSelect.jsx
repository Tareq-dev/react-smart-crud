export default function FormSelect({ form, name, children }) {
  return (
    <>
      <select {...form.bind(name)}>{children}</select>
      {form.errors[name] && <p>{form.errors[name]}</p>}
    </>
  );
}
