import fetchWithErrorHandling from "./fetchWithErrorHandling";

const deleteCartItems = async (cartItemId: number) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
    },
  };

  const { newErrorMessage } = await fetchWithErrorHandling(
    `cart-items/${cartItemId}`,
    options
  );

  return { newErrorMessage };
};

export default deleteCartItems;
