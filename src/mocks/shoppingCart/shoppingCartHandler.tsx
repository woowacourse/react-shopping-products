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

    let items = SHOPPING_CART_MOCK_DATA;

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
    const product = PRODUCT_MOCK_DATA.find((p) => p.id === productId);

    if (!product) {
      return HttpResponse.json({ error: "Product not found" }, { status: 400 });
    }

    const cartItem = {
      id: product.id,
      quantity,
      product: product as {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
        category: string;
        quantity: number;
      },
    };

    SHOPPING_CART_MOCK_DATA.push(cartItem);

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

    const index = SHOPPING_CART_MOCK_DATA.findIndex(
      (item) => item.product.id === id
    );
    if (index === -1) {
      return HttpResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    SHOPPING_CART_MOCK_DATA.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch(`${baseUrl}/cart-items/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const { quantity } = (await request.json()) as { quantity: number };

    if (!id || typeof quantity !== "number") {
      return HttpResponse.json(
        { error: "잘못된 요청입니다. (id 또는 quantity 누락)" },
        { status: 400 }
      );
    }

    const item = SHOPPING_CART_MOCK_DATA.find(
      (cartItem) => cartItem.product.id === id
    );

    if (!item) {
      return HttpResponse.json(
        { error: "해당 상품이 장바구니에 없습니다." },
        { status: 404 }
      );
    }

    if (quantity > item.product.quantity) {
      return HttpResponse.json(
        { error: "재고 수량을 초과하여 담을 수 없습니다." },
        { status: 409 }
      );
    }

    item.quantity = quantity;

    return HttpResponse.json(item, { status: 200 });
  }),
];
