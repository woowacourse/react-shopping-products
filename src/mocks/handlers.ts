import { http, HttpResponse } from "msw";
import mockProducts from "./mockProducts.json";
import { CartItem } from "../types/response.types";

const mockCart: { content: CartItem[] } = {
  content: [],
};

export const handlers = [
  http.get(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products",
    () => {
      return HttpResponse.json(mockProducts);
    }
  ),
  http.get(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products/{id}",
    () => {
      return HttpResponse.json(mockProducts);
    }
  ),
  http.get(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items",
    () => {
      return HttpResponse.json(mockCart);
    }
  ),
  http.post(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items",
    async ({ request }) => {
      const { productId, quantity } = (await request.json()) as {
        productId: number;
        quantity: number;
      };
      const product = mockProducts.content.find((p) => p.id === productId);
      if (product) {
        mockCart.content.push({
          id: mockCart.content.length + 1,
          quantity,
          product,
        });
      }
      console.log(mockCart);

      return HttpResponse.json(null);
    }
  ),
  http.delete(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items/:id",
    ({ params }) => {
      mockCart.content = mockCart.content.filter(
        (item) => item.id !== Number(params.id)
      );
      return HttpResponse.json(null);
    }
  ),
  http.patch(
    "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items/:id",
    async ({ request, params }) => {
      const cartItemId = Number(params.id);
      const { quantity } = (await request.json()) as { quantity: number };

      const item = mockCart.content.find((item) => item.id === cartItemId);
      console.log(mockCart);
      if (item) {
        item.quantity = quantity;
        return HttpResponse.json(item);
      }

      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
  ),
];
