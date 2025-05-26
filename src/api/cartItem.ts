interface PostCartItemProps {
  productId: number;
  quantity: number;
}

export const CART_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;

export async function getCartItem({ sortBy }: { sortBy: string }) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
  };

  const params = new URLSearchParams({
    page: '0',
    size: '50',
    sort: sortBy,
  });

  return fetch(`${CART_URL}?${params.toString()}`, options).then((res) => res.json());
}

export async function postCartItem({ productId, quantity }: PostCartItemProps) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  };

  return fetch(`${CART_URL}`, options);
}

export async function deleteCartItem({ id }: { id: number }) {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
  };

  return fetch(`${CART_URL}/${id}`, options);
}

export async function putCartItem({ id, quantity }: { id: number; quantity: number }) {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
    body: JSON.stringify({
      quantity,
    }),
  };

  return fetch(`${CART_URL}/${id}`, options);
}
