import { http, HttpResponse } from "msw";
import { SHOPPING_CART_MOCK_DATA } from "./shoppingCartMockData";
import { PRODUCT_MOCK_DATA } from "../product/ProductMockData";

interface CartRequestBody {
  productId: number;
  quantity: number;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export const shoppingCartHandler = [
  http.get(`${baseUrl}/cart-items`, async ({ request }) => {
    const url = new URL(request.url);
    const idOption = url.searchParams.get("id");
    const quantityOption = url.searchParams.get("quantity");

    let items = SHOPPING_CART_MOCK_DATA.content;

    if (idOption !== null) {
      items = items.filter(({ id }) => id === Number(idOption));
    }
    if (quantityOption !== null) {
      items = items.filter(
        ({ quantity }) => quantity === Number(quantityOption)
      );
    }

    return HttpResponse.json({
      ...SHOPPING_CART_MOCK_DATA,
      content: items,
    });
  }),

  http.post(`${baseUrl}/cart-items`, async ({ request }) => {
    const { productId, quantity } = (await request.json()) as CartRequestBody;
    const product = PRODUCT_MOCK_DATA.content.find((p) => p.id === productId);

    if (!product) {
      return HttpResponse.json({ error: "Product not found" }, { status: 400 });
    }

    const cartItem = {
      id: product.id,
      quantity,
      product,
    };

    SHOPPING_CART_MOCK_DATA.content.push(cartItem);

    return HttpResponse.json(cartItem);
  }),

  http.delete(`${baseUrl}/cart-items/:id`, async ({ params }) => {
    const id = Number(params.id);

    if (!id) {
      return HttpResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const index = SHOPPING_CART_MOCK_DATA.content.findIndex(
      (item) => item.id === id
    );
    if (index === -1) {
      return HttpResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    SHOPPING_CART_MOCK_DATA.content.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
