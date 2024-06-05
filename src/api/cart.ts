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

export async function getCartItems(): Promise<Cart[]> {
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: createHeaders(),
  });

  if (!response.ok) {
    throw new Error("장바구니를 불러오는데 실패했습니다.");
  }

  const data = await response.json();
  return data.content;
}

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

export async function removeCartItem(productId: number): Promise<void> {
  const response = await fetch(`${API_URL}/cart-items/${productId}`, {
    method: "DELETE",
    headers: createHeaders(),
  });

  if (!response.ok) {
    console.log("실패");
    throw new Error(CART_ERROR_MESSAGES.REMOVE_ITEM_FAILURE);
  }
}
