export const PRODUCT_ENDPOINT = {
  PRODUCT_LIST: '/products',
};

export const CART_ITEM_ENDPOINT = {
  CART_LIST: '/cart-items',
  cartItemId: (id: number) => `/cart-items/${id}`,
};
