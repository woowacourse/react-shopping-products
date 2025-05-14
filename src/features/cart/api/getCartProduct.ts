export const getCartProduct = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/cart-items`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok for getCartProduct');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
