export interface CartItemInfo {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export interface AddCartItemParameter {
  productId: number;
  quantity?: number;
}

export interface UpdateCartItemQuantityParameter {
  cartId: number;
  quantity: number;
}
