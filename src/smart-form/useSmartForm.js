import { useState } from "react";
import { setByPath, getByPath } from "./helpers";

export function useSmartForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const bind = (name) => ({
    name,
    onChange: (e) => {
      let v = e.target.value;
      if (e.target.type === "number") v = Number(v);
      if (e.target.type === "checkbox") v = e.target.checked;
      if (e.target.type === "file") v = e.target.files[0];

      setValues((p) => {
        const copy = structuredClone(p);
        setByPath(copy, name, v);
        return copy;
      });
    },
  });

  const validate = (validators = []) => {
    const errs = {};
    validators.forEach(({ name, rules }) => {
      const value = getByPath(values, name);
      for (let rule of rules) {
        const res = rule(value, values);
        if (res) {
          errs[name] = res;
          break;
        }
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit =
    (cb, validators = []) =>
    (e) => {
      e.preventDefault();
      if (validate(validators)) cb(values);
    };

  // RESET FEATURES
  const reset = () => {
    setValues({});
    setErrors({});
  };

  const resetField = (name) => {
    setValues((p) => {
      const copy = structuredClone(p);
      setByPath(copy, name, "");
      return copy;
    });
    setErrors((e) => {
      const c = { ...e };
      delete c[name];
      return c;
    });
  };

  const resetWith = (data) => {
    setValues(structuredClone(data));
    setErrors({});
  };

  const clearErrors = () => setErrors({});

  return {
    bind,
    submit,
    reset,
    resetField,
    resetWith,
    clearErrors,
    errors,
    values,
  };
}
