import { http, HttpResponse } from "msw";
import { cartItemsMockData } from "./cartItemsMockData";
import { productsMockData } from "../productsData/productsMockData";
import { ProductItemType } from "@/apis/products/product.type";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const CART_ITEMS_URL = `${BASE_URL}/cart-items`;

interface AddCartItemsBody {
  productId: number;
  quantity: number;
}
let cartItemSequence = 1;

export const cartItemsHandlers = [
  http.get(CART_ITEMS_URL, () => {
    return HttpResponse.json(cartItemsMockData, { status: 200 });
  }),
  http.post<never, AddCartItemsBody>(CART_ITEMS_URL, async ({ request }) => {
    const { productId, quantity } = await request.json();
    const product = productsMockData.content.find(
      ({ id }) => id === productId
    ) as ProductItemType;

    cartItemsMockData.content.push({
      id: cartItemSequence++,
      quantity,
      product,
    });
    return HttpResponse.json({
      status: 201,
      message: "장바구니에 상품을 담았습니다.",
    });
  }),
  http.delete(`${CART_ITEMS_URL}/:id`, ({ params }) => {
    const cartItemId = params.id;
    const cartItemIndex = cartItemsMockData.content.findIndex(
      ({ id }) => id === Number(cartItemId)
    );

    cartItemsMockData.content.splice(cartItemIndex, 1);
    return HttpResponse.json({
      status: 204,
      message: "장바구니에서 상품을 제거했습니다.",
    });
  }),
];
