export default function validateProductImageUrl(urlString: string) {
  return (
    urlString.length !== 0 && (urlString.startsWith("https://") || urlString.startsWith("http://"))
  );
}
