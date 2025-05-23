import { http, HttpResponse } from "msw";
import mockProducts from "./mockProducts.json";
import mockCart from "./mockCart.json";

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

      return HttpResponse.json(null);
    }
  ),
];
