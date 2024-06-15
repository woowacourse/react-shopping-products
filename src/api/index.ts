import { RULE } from "../constants/rules";
import {
  CART_ITEMS_COUNTS_ENDPOINT,
  CART_ITEMS_ENDPOINT,
  PRODUCTS_ENDPOINT,
} from "./endpoints";
import { fetchWithAuth } from "./fetchWithAuth";

interface QueryParams {
  [key: string]:
    | undefined
    | string
    | number
    | boolean
    | (string | number | boolean)[];
}

export interface GetProductsParams {
  category?: Category;
  page?: number;
  size?: number;
  sort?: Sort;
}

const createQueryString = (params: QueryParams): string => {
  return Object.entries(params)
    .map(([key, value]) => {
      if (value === undefined) {
        return;
      }
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          value.join(",")
        )}`;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");
};

export const getProducts = async ({
  category,
  page = 0,
  size = 20,
  sort = "asc",
}: GetProductsParams = {}) => {
  const params = {
    category,
    page,
    size,
    sort: ["price", sort],
  };
  const queryString = createQueryString(params) + RULE.sortQueryByIdAsc;

  const response = await fetchWithAuth(`${PRODUCTS_ENDPOINT}?${queryString}`, {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get products item");
  }

  return data;
};

export const postProductInCart = async ({
  productId,
}: {
  productId: number;
}) => {
  const response = await fetchWithAuth(CART_ITEMS_ENDPOINT, {
    method: "POST",
    body: {
      productId,
      quantity: 1,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to post product item in cart");
  }
};

export const deleteProductInCart = async ({
  cartItemId,
}: {
  cartItemId: number;
}) => {
  const response = await fetchWithAuth(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product item in cart");
  }
};

export const getCartItemsCount = async () => {
  const response = await fetchWithAuth(CART_ITEMS_COUNTS_ENDPOINT, {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get cart items count");
  }

  return data;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await fetchWithAuth(CART_ITEMS_ENDPOINT, {
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to get cart items count");
  }

  return data.content;
};

export const updateCartItemQuantity = async ({
  cartItemId,
  quantity,
}: {
  cartItemId: number;
  quantity: number;
}): Promise<void> => {
  await fetchWithAuth(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: "PATCH",
    body: { quantity },
  });
};
