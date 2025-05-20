interface fetchAPIProps {
  url: string;
  options: {
    method: string;
    body?: object;
  };
}

export const fetchAPI = async ({ url, options }: fetchAPIProps) => {
  const { method, body } = options;
  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  return response;
};
