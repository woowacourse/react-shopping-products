import { HttpResponse, http } from "msw";
import { ENDPOINT } from "../../constants/apis";
import { CART_ITEMS, INITIAL_CART_ITEMS, NEW_SHOES_CART_ITEM } from "../data/cart/cart-items";

const cartHandlers = [
  http.get(ENDPOINT.CART_ITEMS, () => {
    return HttpResponse.json(CART_ITEMS);
  }),

  http.post(ENDPOINT.CART_ITEMS, async () => {
    try {
      CART_ITEMS.content.push(NEW_SHOES_CART_ITEM);

      return HttpResponse.json(null, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }),

  http.patch(`${ENDPOINT.CART_ITEMS}/:productId`, async ({ request, params }) => {
    const { productId } = params;
    const { quantity } = (await request.json()) as { quantity: number };

    const updatedCartItems = [...INITIAL_CART_ITEMS].filter(
      (item) => item.product.id !== Number(productId),
    );

    if (quantity > 0) {
      const updatedItem = INITIAL_CART_ITEMS.find((item) => item.product.id === Number(productId));
      if (updatedItem) {
        updatedCartItems.push({
          ...updatedItem,
          quantity,
        });
        CART_ITEMS.content = updatedCartItems;
      }
    }

    return HttpResponse.json(null, { status: 200 });
  }),

  http.delete(`${ENDPOINT.CART_ITEMS}/:cartItemId`, ({ params }) => {
    const { cartItemId } = params;

    const targetCartItem = CART_ITEMS.content.find((item) => item.id === Number(cartItemId));

    if (targetCartItem) {
      CART_ITEMS.content = [...CART_ITEMS.content.filter((item) => item.id !== Number(cartItemId))];
    }

    return HttpResponse.json();
  }),
];

export default cartHandlers;
