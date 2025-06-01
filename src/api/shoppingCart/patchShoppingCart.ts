import { indexShoppingCartApi } from "./indexShoppingCartApi";

interface patchShoppingCartProps {
  productId: number;
  quantity: number;
}

export default function patchShoppingCart({
  productId,
  quantity,
}: patchShoppingCartProps) {
  return indexShoppingCartApi.patch(`/cart-items/${productId}`, { quantity });
}
