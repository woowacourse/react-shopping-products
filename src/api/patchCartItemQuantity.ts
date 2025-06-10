import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { FetchError } from "../types/\bfetchType";
import getHeaders from "./getHeader";

const patchCartItemQuantity = async (
  id: number,
  quantity: number
): Promise<{
  error: FetchError | null;
}> => {
  const body = JSON.stringify({
    quantity: quantity,
  });
  const { error } = await fetchWithErrorHandling(`cart-items/${id}`, {
    method: "PATCH",
    headers: getHeaders(),
    body,
  });

  return { error };
};

export default patchCartItemQuantity;
