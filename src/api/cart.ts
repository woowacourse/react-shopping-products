import { CartResponse } from '../types/product';
interface getCartItemProps {
  page: number;
  size: number;
  sortBy: string;
}

export const getCartItem = async ({
  page,
  size,
  sortBy,
}: getCartItemProps): Promise<CartResponse> => {
  const response = await fetch(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/cart-items?page=${page}&size=${size}&sort=${sortBy}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '장바구니 조회 중 오류가 발생했습니다.');
  }

  const data = await response.json();
  return data;
};

export const addCart = async (id: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    }
  );
  return response;
};

export const removeCart = async (id: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `장바구니 아이템 삭제를 실패했습니다.: ${response.status}`
    );
  }

  return response;
};
