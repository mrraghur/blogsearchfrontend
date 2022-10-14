export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const parseIfJson = (text) => {
  return isJson(text) ? JSON.parse(text) : text;
};
