interface fetchAPIProps {
  url: string;
  options: {
    method: string;
    body?: object;
  };
  errorMessage: string;
}

export const fetchAPI = async ({
  url,
  options,
  errorMessage,
}: fetchAPIProps) => {
  const { method, body } = options;
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!response.ok) {
    let message = errorMessage;
    const errorBody = await response.json();
    if (errorBody?.message) {
      message = errorBody.message;
    }
    throw new Error(message);
  }

  return response;
};
