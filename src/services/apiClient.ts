interface ApiClientProps {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  body?: any;
}

const apiClient = async ({ method, url, body }: ApiClientProps) => {
  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-type': 'application/json' },
  });

  return response.json();
};

export default apiClient;
