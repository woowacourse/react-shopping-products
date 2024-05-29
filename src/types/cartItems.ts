export interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
  quantity: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isValidCartItemRequestBody(value: any): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (typeof value.productId !== "number") {
    return false;
  }
  if (typeof value.quantity !== "number") {
    return false;
  }
  return true;
}
