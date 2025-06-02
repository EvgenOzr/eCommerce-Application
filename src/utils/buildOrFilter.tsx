export const buildOrFilter = (field: string, values: string[]) => {
  if (values.length === 1) {
    return `${field}:"${values[0]}"`;
  } else if (values.length > 1) {
    const joined = values.map((v) => `"${v}"`).join(",");
    return `${field}:${joined}`;
  }
  return "";
};
