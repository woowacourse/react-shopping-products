export const getCartProduct = async () => {
  const token = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/cart-items?page=0&size=20`,
      {
        headers: {
          Authorization: `Basic ${token}`,
          'Content-Type': 'application/json',
        },
      }
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
