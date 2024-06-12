import { generateBasicToken } from "@/utils/auth";
import { USERNAME, PASSWORD, API_URL } from "@/constants/api";

export const fetchGet = async (url: string) => {
  const token = generateBasicToken(USERNAME, PASSWORD);
  const response = await fetch(`${API_URL}/${url}`, {
    method: "GET",
    headers: { Authorization: token, "Content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to get API");
  }
  const data = await response.json();
  return data;
};

export const fetchPost = async (url: string, body: Record<string, unknown>) => {
  const token = generateBasicToken(USERNAME, PASSWORD);
  const response = await fetch(`${API_URL}/${url}`, {
    method: "POST",
    headers: { Authorization: token, "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to post API");
  }

  const data = await response.json();
  return data;
};

export const fetchPatch = async (url: string, body: Record<string, unknown>) => {
  const token = generateBasicToken(USERNAME, PASSWORD);
  const response = await fetch(`${API_URL}/${url}`, {
    method: "PATCH",
    headers: { Authorization: token, "Content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to patch API");
  }

  const data = await response.json();
  return data;
};

export const fetchDelete = async (url: string) => {
  const token = generateBasicToken(USERNAME, PASSWORD);
  const response = await fetch(`${API_URL}/${url}`, {
    method: "DELETE",
    headers: { Authorization: token, "Content-type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to delete API");
  }

  const data = await response.json();
  return data;
};
