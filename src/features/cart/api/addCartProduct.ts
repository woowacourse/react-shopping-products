export const addCartProduct = async (productId: number) => {
  const token = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: productId,
        quantity: 1,
      }),
    });
    if (!response.ok) throw new Error('Network response was not ok for postCartProduct');
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
