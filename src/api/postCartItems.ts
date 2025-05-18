import { Product } from "../types/productType";
import fetchWithErrorHandling from "./fetchWithErrorHandling";

const postCartItems = async (product: Product) => {
  const body = JSON.stringify({
    productId: product.id,
    quantity: 1,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
    },
    body,
  };

  const { newErrorMessage } = await fetchWithErrorHandling(
    "cart-items",
    options
  );

  return { newErrorMessage };
};

export default postCartItems;
