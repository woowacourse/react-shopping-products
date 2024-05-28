import { generateBasicToken } from "../util/auth";
import { CART_ITEMS_ENDPOINT } from "./config";

const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const USER_ID = import.meta.env.VITE_USER_ID;
const token = generateBasicToken(USER_ID, USER_PASSWORD);

export async function fetchCartItemList() {
  const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart item list");
  }

  const data = await response.json();
  return data;
}

export async function addCartItem(productId: number, quantity: number) {
  const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error("Failed to add cart item");
  }
}

export async function deleteCartItem(productId: number) {
  const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete cart item");
  }
}
