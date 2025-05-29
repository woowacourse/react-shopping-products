import { shoppingCartApi } from "./indexShoppingCart";

interface patchShoppingCartProps {
  productId: number;
  quantity: number;
}

export default function patchShoppingCart({
  productId,
  quantity,
}: patchShoppingCartProps) {
  return shoppingCartApi.patch(`/cart-items/${productId}`, { quantity });
}
