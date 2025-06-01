import { indexshoppingCartApi } from "./indexshoppingCartApi";

interface postShoppingCartProps {
  productId: number;
  quantity: number;
}

export default function postShoppingCart({
  productId,
  quantity,
}: postShoppingCartProps) {
  return indexshoppingCartApi.post(`/cart-items/${productId}`, { quantity });
}
