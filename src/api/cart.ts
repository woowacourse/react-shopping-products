import { baseAPI } from './baseAPI';
import { APIResponse } from './type';
import { convertResponseToProduct, Product, ProductContent } from './products';

export type CartResponse = APIResponse<CartContent>;

export interface Cart {
  id: string;
  quantity: number;
  product: Product;
}

export interface CartContent {
  id: number;
  quantity: number;
  product: ProductContent;
}

export const convertResponseToCart = ({
  id,
  quantity,
  product,
}: CartContent): Cart => ({
  id: id.toString(),
  quantity,
  product: convertResponseToProduct(product),
});

export async function getShoppingCartData() {
  const params = new URLSearchParams();
  params.set('page', '0');
  params.set('size', '50');
  const basePath = `/cart-items?${params.toString()}`;

  const data = await baseAPI<CartResponse>({
    method: 'GET',
    path: basePath,
  });

  const results = data?.content.map((cart) => convertResponseToCart(cart));
  return results ?? [];
}

export async function postCartItem(id: string) {
  return baseAPI({
    method: 'POST',
    path: `/cart-items`,
    body: {
      productId: Number(id),
      quantity: 1,
    },
  });
}

export async function patchCartItem(cartId: string, quantity: number) {
  const cartList = await getShoppingCartData();
  const cart = cartList.find((item) => item.id === cartId);
  if (!cart) {
    throw new Error('장바구니에 해당 아이템이 없습니다.');
  }
  const maxQuantity = cart.product.quantity;
  if (quantity < 1 || quantity > maxQuantity) {
    throw new Error(`재고와 수량이 맞지 않습니다. 현재 재고: ${maxQuantity}`);
  }

  return baseAPI({
    method: 'PATCH',
    path: `/cart-items/${cartId}`,
    body: {
      quantity,
    },
  });
}

export async function deleteCartItem(cartId: string) {
  await baseAPI({
    method: 'DELETE',
    path: `/cart-items/${cartId}`,
  });
}
