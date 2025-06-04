const safeFetch = async (endPoint: string, options?: RequestInit) => {
  const url = `${import.meta.env.VITE_BASE_URL}${endPoint}`;
  const defaultHeaders = {
    Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options?.headers,
    },
  });

  const status = response.status;

  if (!response.ok) {
    throw new Error(`${status}`);
  }

  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    return { status, data };
  }

  return { status, data: null };
};

export default safeFetch;
