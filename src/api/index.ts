import { MAX_CART_ITEMS_COUNTS } from '../constants';
import { CategoryType, SortType } from '../type';
import { CartItems } from '../type/CartItem';
import { ProductItem } from '../type/ProductItem';
import ENDPOINT from './endpoints';

const USERNAME = import.meta.env.VITE_USER_ID;
const PASSWORD = import.meta.env.VITE_USER_PASSWORD;
function generateBasicToken(userId: string, userPassword: string): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}

const HEADERS = {
  Authorization: generateBasicToken(USERNAME, PASSWORD),
  'Content-Type': 'application/json',
};

function createURLWithParams(
  baseURL: string,
  params: Record<string, string[] | string | number | undefined>,
) {
  const url = new URL(baseURL);
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });
  return url;
}
export async function fetchProducts(
  page: number,
  limit: number,
  category: CategoryType,
  sorting: SortType,
): Promise<{ data: ProductItem[]; last: boolean }> {
  const sortArray = sorting.split('_');
  const url = createURLWithParams(ENDPOINT.PRODUCTS, {
    category: category === 'all' ? undefined : category,
    page,
    size: limit,
    sort: sortArray,
  });
  const response = await fetch(url, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return { data: data.content, last: data.last };
}

export const addCartItem = async (itemId: number, itemQuantity: number) => {
  const response = await fetch(ENDPOINT.CART_ITEMS, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      productId: itemId,
      quantity: itemQuantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }
};

export async function fetchCartItemQuantity(
  cartItemId: number,
  quantity: number,
): Promise<void> {
  const response = await fetch(`${ENDPOINT.CART_ITEMS}/${cartItemId}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({ quantity: quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart item quantity');
  }
}

export const deleteCartItem = async (cartItemId: number) => {
  const response = await fetch(`${ENDPOINT.CART_ITEMS}/${cartItemId}`, {
    method: 'DELETE',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }
};

export const findCartItemIdByProductId = async (productId: number) => {
  const response = await fetchItems();
  const cartItem = response.find((cartItem) => {
    if (cartItem.product.id === productId) {
      return cartItem.id;
    }
  });
  return cartItem && cartItem.id;
};

export const fetchShoppingCartQuantity = async () => {
  const response = await fetch(ENDPOINT.CART_ITEMS_COUNT, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }

  const data = await response.json();

  return data.quantity;
};

export async function fetchItems(): Promise<CartItems[]> {
  const url = createURLWithParams(ENDPOINT.CART_ITEMS, {
    size: MAX_CART_ITEMS_COUNTS,
  });
  const response = await fetch(url, {
    method: 'GET',
    headers: HEADERS,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Items');
  }

  const data = await response.json();
  return data.content;
}
