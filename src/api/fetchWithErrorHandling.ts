const fetchWithErrorHandling = async (
  endPoint: string,
  options?: RequestInit
) => {
  const url = `${import.meta.env.VITE_BASE_URL}${endPoint}`;
  const response = await fetch(url, {
    ...options,
  });

  let status = null;
  let data = null;

  if (!response.ok) {
    status = response.status;
  } else if (response.headers.get('Content-Type') === 'application/json') {
    data = await response.json();
  }

  return { status, data };
};

export default fetchWithErrorHandling;
