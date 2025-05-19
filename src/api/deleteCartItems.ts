import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { FetchError } from "../types/\bfetchType";
import getHeaders from "./getHeader";

const deleteCartItems = async (
  cartItemId: number
): Promise<{
  error: FetchError | null;
}> => {
  const options = {
    method: "DELETE",
    headers: getHeaders(),
  };

  const { error } = await fetchWithErrorHandling(
    `cart-items/${cartItemId}`,
    options
  );

  return { error };
};

export default deleteCartItems;
