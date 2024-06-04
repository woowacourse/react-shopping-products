const fetchWithErrorHandling = async <T>(
  fetchFn: () => Promise<Response>,
  errorMessage: string,
): Promise<T extends void ? void : T> => {
  const response = await fetchFn();

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  if (response.headers.get('Content-Type')?.includes('application/json')) {
    return await response.json();
  }

  return undefined as T extends void ? void : T;
};

export default fetchWithErrorHandling;
