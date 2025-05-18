import fetchWithErrorHandling from "./fetchWithErrorHandling";

type FetchError = {
  code: number;
  message: string;
};

const deleteCartItems = async (
  cartItemId: number
): Promise<{
  error: FetchError | null;
}> => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
    },
  };

  const { error } = await fetchWithErrorHandling(
    `cart-items/${cartItemId}`,
    options
  );

  return { error };
};

export default deleteCartItems;
