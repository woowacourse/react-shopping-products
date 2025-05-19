type Method = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface ApiClientProps {
  endPoint: string;
  headers?: Record<string, string>;
  body?: string;
}

export const apiClient = {
  get: async ({endPoint, headers}: ApiClientProps) =>
    (await requestApi('GET', endPoint, headers)).json(),
  post: ({endPoint, headers, body}: ApiClientProps) =>
    requestApi('POST', endPoint, headers, body),
  delete: ({endPoint, headers}: ApiClientProps) =>
    requestApi('DELETE', endPoint, headers),
};

const requestApi = async (
  method: Method,
  endPoint: string,
  headers?: Record<string, string>,
  body?: string
) => {
  const token = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}${endPoint}`,
      {
        method: method,
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body,
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
