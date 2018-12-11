export const formToJson = (form: any) => {
  const data = new FormData(form);
  const object = {};

  data.forEach((value, key) => {
    if (object[key]) {
      if (Array.isArray(object[key])) {
        object[key].push(value);
      } else {
        object[key] = [object[key], value];
      }
    } else {
      object[key] = value;
    }
  });

  return object;
};