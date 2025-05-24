import { http, HttpResponse } from "msw";
import MOCKING_CART_ITEMS_DATA from "../data/cartItems.json";
import MOCKING_PRODUCT_DATA from "../data/products.json";
import { Content, GetCartItemsResponse } from "../../types/cartItem";

const products = { ...MOCKING_PRODUCT_DATA };
const cartItems: GetCartItemsResponse = { ...MOCKING_CART_ITEMS_DATA }; // 초기 데이터 복사

const getCartItems = http.get(`http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items`, () => {
  return HttpResponse.json(cartItems);
});

const postCartItems = http.post(
  `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items`,
  async ({ request }) => {
    const newCartItem = (await request.json()) as { productId: number; quantity: number };

    const maxId = cartItems.content.length > 0 ? Math.max(...cartItems.content.map((item) => item.id)) : 0;

    const newCartItemData: Content = {
      id: maxId + 1,
      quantity: newCartItem.quantity,
      product: products.content.find((product) => product.id === newCartItem.productId)!,
    };

    cartItems.content.push(newCartItemData);
    return HttpResponse.json({ message: "Post" }, { status: 200 });
  },
);
const patchCartItems = http.patch(
  `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items/:id`,
  async ({ params, request }) => {
    const cartItemId = Number(params.id);
    const { quantity } = (await request.json()) as { quantity: number };

    cartItems.content = cartItems.content.reduce((acc, item) => {
      if (item.id === cartItemId) {
        if (quantity !== 0) {
          acc.push({ ...item, quantity });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as Content[]);

    return HttpResponse.json({ message: "Patch" }, { status: 200 });
  },
);

const deleteCartItems = http.delete(
  `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items/:id`,
  async ({ params }) => {
    const cartItemId = Number(params.id);
    cartItems.content = cartItems.content.filter((item) => item.id !== cartItemId);

    return HttpResponse.json({ message: "Delete" }, { status: 200 });
  },
);

export default [getCartItems, postCartItems, patchCartItems, deleteCartItems];
