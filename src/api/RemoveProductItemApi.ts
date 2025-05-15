import { API_ERROR_MESSAGES } from "./constants/errorMessages";

async function RemoveProductItemApi(productId: number) {
  const API_URL = import.meta.env.VITE_BASE_URL || "";
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };
  const response = await fetch(`${API_URL}/cart-items/${productId}`, options);
  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status]);
  }
  return response;
}

export default RemoveProductItemApi;
