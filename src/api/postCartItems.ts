import { Product } from "../types/productType";
import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { FetchError } from "../types/\bfetchType";
import getHeaders from "./getHeader";

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
    headers: getHeaders(),
    body,
  };

  const { error } = await fetchWithErrorHandling("cart-items", options);

  return { error };
};

export default postCartItems;
