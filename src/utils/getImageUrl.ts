export const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith('http') || imagePath.startsWith('//')) {
    return imagePath;
  }

  const isGitHubPages =
    typeof window !== 'undefined' && window.location.hostname.includes('github.io');

  const cleanPath = imagePath.startsWith('./') ? imagePath.slice(2) : imagePath;

  if (isGitHubPages) {
    return `/react-shopping-products/${cleanPath}`;
  }

  return `/${cleanPath}`;
};
