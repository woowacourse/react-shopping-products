import { CART_ERROR_MESSAGES } from "../constants/errorMessage";
import { generateBasicToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_USER_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

const createHeaders = () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  return {
    "Content-Type": "application/json",
    Authorization: token,
  };
};

export async function addCartItem(productId: number): Promise<void> {
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "POST",
    headers: createHeaders(),
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    throw new Error(CART_ERROR_MESSAGES.ADD_ITEM_FAILURE);
  }
}

export async function removeCartItem(cartItemId: number): Promise<void> {
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: "DELETE",
    headers: createHeaders(),
  });

  if (!response.ok) {
    throw new Error(CART_ERROR_MESSAGES.REMOVE_ITEM_FAILURE);
  }
}

export async function getCartCounts(): Promise<number> {
  const response = await fetch(`${API_URL}/cart-items/counts`, {
    method: "GET",
    headers: createHeaders(),
  });

  if (!response.ok) {
    throw new Error(CART_ERROR_MESSAGES.GET_COUNTS_FAILURE);
  }

  const data = await response.json();
  return data.quantity;
}
