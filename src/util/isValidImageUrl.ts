export const isValidImageUrl = (url: string) => {
  if (url === null) return false;
  return url.startsWith('http') || url.startsWith('/');
};
