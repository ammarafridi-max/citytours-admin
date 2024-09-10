export function formatDate(x) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(x); // Convert string to Date object
  return date.toLocaleDateString("en-US", options);
}
