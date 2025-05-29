import { shoppingCartApi } from "./indexShoppingCart";

interface postShoppingCartProps {
  productId: number;
  quantity: number;
}

export default function postShoppingCart({
  productId,
  quantity,
}: postShoppingCartProps) {
  return shoppingCartApi.post(`/cart-items/${productId}`, { quantity });
}
