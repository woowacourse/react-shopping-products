import { indexshoppingCartApi } from "./indexshoppingCartApi";

interface patchShoppingCartProps {
  productId: number;
  quantity: number;
}

export default function patchShoppingCart({
  productId,
  quantity,
}: patchShoppingCartProps) {
  return indexshoppingCartApi.patch(`/cart-items/${productId}`, { quantity });
}
