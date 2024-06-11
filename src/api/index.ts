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

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(
        '⛔️ 상품 목록을 가져오는데 실패했습니다. 다시 시도해 주세요.',
      );
    }
    const data = await response.json();
    return { data: data.content, last: data.last };
  } catch (error) {
    throw new Error(
      '⛔️ 상품 목록을 가져오는데 실패했습니다. 다시 시도해 주세요.',
    );
  }
}

export const addCartItem = async (itemId: number, itemQuantity: number) => {
  try {
    const response = await fetch(ENDPOINT.CART_ITEMS, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        productId: itemId,
        quantity: itemQuantity,
      }),
    });

    if (!response.ok) {
      throw new Error('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
    }
  } catch (error) {
    throw new Error('⛔️ 상품을 담는데 실패했습니다. 다시 시도해 주세요.');
  }
};

export async function fetchCartItemQuantity(
  cartItemId: number,
  quantity: number,
): Promise<void> {
  try {
    const response = await fetch(`${ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({ quantity: quantity }),
    });

    if (!response.ok) {
      throw new Error(
        '⛔️ 상품의 수량을 변경하는데 실패했습니다. 다시 시도해 주세요.',
      );
    }
  } catch (error) {
    throw new Error(
      '⛔️ 상품의 수량을 변경하는데 실패했습니다. 다시 시도해 주세요.',
    );
  }
}

export const deleteCartItem = async (cartItemId: number) => {
  try {
    const response = await fetch(`${ENDPOINT.CART_ITEMS}/${cartItemId}`, {
      method: 'DELETE',
      headers: HEADERS,
    });

    if (!response.ok) {
      throw new Error(
        '⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.',
      );
    }
  } catch (error) {
    throw new Error('⛔️ 상품을 제거하는데 실패했습니다. 다시 시도해 주세요.');
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

export async function fetchItems(): Promise<CartItems[]> {
  const url = createURLWithParams(ENDPOINT.CART_ITEMS, {
    size: MAX_CART_ITEMS_COUNTS,
  });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: HEADERS,
    });

    if (!response.ok) {
      throw new Error(
        '⛔️ 장바구니 목록을 가져오는데 실패했습니다. 다시 시도해 주세요.',
      );
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error(
      '⛔️ 장바구니 목록을 가져오는데 실패했습니다. 다시 시도해 주세요.',
    );
  }
}
