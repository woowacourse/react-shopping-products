import { generateToken } from "./auth";

const USER_ID = import.meta.env.VITE_API_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_API_USER_PASSWORD;

interface Props {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  url: string;
  headers?: RequestInit["headers"];
  body?: RequestInit["body"];
  errorMessage: string;
}

export const fetchWithToken = async ({
  url,
  headers,
  method = "GET",
  body,
  errorMessage,
}: Props) => {
  const token = generateToken(USER_ID, USER_PASSWORD);

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: token,
      ...headers,
    },
    body,
  });

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  if (method !== "GET") {
    return response;
  }

  const data = await response.json();
  return data;
};
