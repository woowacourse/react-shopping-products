interface CreateFetchUrlProps {
  endpoint: string;
  params?: Record<string, string | undefined>;
}

export default function createFetchUrl({ endpoint, params }: CreateFetchUrlProps): URL {
  const fetchUrl = new URL(endpoint);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) fetchUrl.searchParams.append(key, value);
    });
  }

  return fetchUrl;
}
