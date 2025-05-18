const isValidImageUrl = (url: string): boolean => {
  const pattern = /\.(jpeg|jpg|gif|png|svg|webp|bmp)$/i;
  try {
    const parsed = new URL(url);
    return pattern.test(parsed.pathname);
  } catch {
    return false;
  }
};

export default isValidImageUrl;
