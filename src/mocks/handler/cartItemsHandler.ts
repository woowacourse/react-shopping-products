import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import { HttpResponse, http } from "msw";
import cartItems from "@/mocks/mockResponse/cart-items.json";
import products from "@/mocks/mockResponse/products.json";
import { PostCartItemParams } from "@/apis/cartItem";

const cartItemsData = cartItems;

export const cartItemsHandler = [
  http.get(SERVER_URL.apiUrl + END_POINT.cartItems, () => {
    return HttpResponse.json(cartItems, { status: 200 });
  }),

  http.post(SERVER_URL.apiUrl + END_POINT.cartItems, async ({ request }) => {
    const newProduct = (await request.json()) as PostCartItemParams;

    if (!newProduct) return new HttpResponse("바디가 없습니다.", { status: 404 });
    const targetProduct = products.content.find((product) => product.id === newProduct.productId);

    if (!targetProduct) return new HttpResponse("아이디가 잘못된 아이디입니다.", { status: 404 });

    const newId = Date.now() + products.content.length;
    const cartId = Math.floor(newId);

    cartItemsData.content = [
      ...cartItemsData.content,
      {
        id: cartId,
        quantity: newProduct.quantity,
        product: targetProduct,
      },
    ];
    return HttpResponse.json(null, { status: 201 });
  }),

  http.delete(SERVER_URL.apiUrl + END_POINT.cartItems + "/:id", ({ params }) => {
    const { id } = params;

    const targetIndex = cartItemsData.content.findIndex((item) => item.id === Number(id));
    if (!targetIndex) return new HttpResponse(null, { status: 404 });

    cartItemsData.content.splice(targetIndex, 1);
    return HttpResponse.json(null, { status: 201 });
  }),
];
