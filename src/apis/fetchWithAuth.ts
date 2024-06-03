import { generateBasicToken } from "../util/auth";

const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;
const token = generateBasicToken(USER_ID, USER_PASSWORD);

async function fetchWithAuth(url: string, method: string, body?: any) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to ${method} data`);
  }

  return response;
}

export default fetchWithAuth;
