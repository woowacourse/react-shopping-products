export const getCartProduct = async ({ page = 0, size = 20 }) => {
  const token = import.meta.env.VITE_API_KEY;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/cart-items?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`장바구니 상품 조회 실패: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
