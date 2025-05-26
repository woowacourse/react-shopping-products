export default function createResourceId(
  url: string,
  params?: Record<string, string | number>
): string {
  if (!params) return url;
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    queryParams.append(key, String(value));
  });
  return `${url}?${queryParams.toString()}`;
}
