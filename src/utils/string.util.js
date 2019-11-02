export const capitalize = string => {
  return string[0].toUpperCase() + string.slice(1);
};

export const removeSpaces = string => {
  return string.replace(/\s/g, "");
};
