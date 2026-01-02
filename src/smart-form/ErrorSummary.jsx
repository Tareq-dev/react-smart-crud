export default function ErrorSummary({ errors }) {
  const list = Object.values(errors);
  if (!list.length) return null;

  return (
    <div className="bg-sky-100 p-2 rounded-sm">
      <b className="text-sm">Please fix errors:</b>
      <ul>
        {list.map((e, i) => (
          <li className="text-xs text-red-600" key={i}>
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
