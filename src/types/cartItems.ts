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
export function isCartItem(value: any): value is CartItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (typeof value.id !== "number") {
    return false;
  }
  if (
    typeof value.product !== "object" ||
    value.product === null ||
    typeof value.product.id !== "number" ||
    typeof value.product.name !== "string" ||
    typeof value.product.price !== "number" ||
    typeof value.product.imageUrl !== "string" ||
    typeof value.product.category !== "string"
  ) {
    return false;
  }
  if (typeof value.quantity !== "number") {
    return false;
  }
  return true;
}
