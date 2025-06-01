import { indexShoppingCartApi } from "./indexShoppingCartApi";

interface postShoppingCartProps {
  productId: number;
  quantity: number;
}

export default function postShoppingCart({
  productId,
  quantity,
}: postShoppingCartProps) {
  return indexShoppingCartApi.post(`/cart-items/${productId}`, { quantity });
}
