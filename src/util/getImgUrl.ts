export const getImageUrl = (url: string) => {
  return url.startsWith('http') || url.startsWith('/');
};
