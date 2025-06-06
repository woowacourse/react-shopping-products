const VALID_IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'gif', 'png', 'svg', 'webp', 'bmp'] as const;

const createImageExtensionPattern = (extensions: readonly string[]) => {
  return new RegExp(`\\.(${extensions.join('|')})$`, 'i');
};

const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;

  const imagePattern = createImageExtensionPattern(VALID_IMAGE_EXTENSIONS);

  if (url.startsWith('./') || url.startsWith('/')) {
    return imagePattern.test(url);
  }

  try {
    const parsedUrl = new URL(url);
    return imagePattern.test(parsedUrl.pathname);
  } catch {
    return false;
  }
};

export default isValidImageUrl;
