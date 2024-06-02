import { token } from "./config";

export type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";

interface ResponseProps {
  url: string;
  method: HttpMethod;
  body?: BodyInit;
  errorMessage: string;
}

const response = async ({ url, method, body, errorMessage }: ResponseProps) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  if (method === "GET") {
    const data = await response.json();
    return data;
  }
};

export default response;
