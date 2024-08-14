export function createUrl(text) {
  const url = text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[,'"?.:]/g, "");
  return url;
}
