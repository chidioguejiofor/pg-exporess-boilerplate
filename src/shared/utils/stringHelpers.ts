export const toPascalCase = (word?: string) => {
  if (!word) return "";
  return word.trim().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
