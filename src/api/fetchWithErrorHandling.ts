const fetchWithErrorHandling = async (
  endPoint: string,
  options?: RequestInit
) => {
  const url = `${import.meta.env.VITE_BASE_URL}${endPoint}`;
  const response = await fetch(url, {
    ...options,
  });

  const status = response.status;

  if (!response.ok) {
    return { status, data: null };
  }

  const contentType = response.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    const data = await response.json();
    return { status, data };
  }

  return { status, data: null };
};

export default fetchWithErrorHandling;
