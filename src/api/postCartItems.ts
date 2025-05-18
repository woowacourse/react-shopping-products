import { Product } from "../types/productType";
import fetchWithErrorHandling from "./fetchWithErrorHandling";

type FetchError = {
  code: number;
  message: string;
};

const postCartItems = async (
  product: Product
): Promise<{
  error: FetchError | null;
}> => {
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

  const { error } = await fetchWithErrorHandling("cart-items", options);

  return { error };
};

export default postCartItems;
