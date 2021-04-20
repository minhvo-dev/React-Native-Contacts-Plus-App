export const sanitizeString = (str) => {
  if (str) return str.trim();
  return str;
};

export const formatPhoneNumber = (str) => {
  const re = /^(\d{0,3})(\d{3})(\d{3})(\d{4})$/;
  if (re.test(str)) {
    const matches = str.toString().match(re);
    return `${matches[1] ? `+${matches[1]} ` : ""}(${matches[2]}) ${matches[3]}-${matches[4]}`;
  }
  return str;
};