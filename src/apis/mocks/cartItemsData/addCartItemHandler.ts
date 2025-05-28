import { ProductItemType } from "@/apis/products/product.type";
import { ApiRequestHandler } from "../handler.type";
import { cartItemsMockData } from "./cartItemsMockData";
import { productsMockData } from "../productsData/productsMockData";
import { HttpResponse } from "msw";
import { AddCartItems } from "@/apis/cartItems/cartItem.type";

let cartItemSequence = 1;

export const addCartItemHandler = async ({ request }: ApiRequestHandler) => {
  const { productId, quantity } = (await request.json()) as AddCartItems;
  const product = productsMockData.content.find(
    ({ id }) => id === productId
  ) as ProductItemType;

  cartItemsMockData.content.push({
    id: cartItemSequence++,
    quantity,
    product,
  });
  return HttpResponse.json(
    {
      message: "장바구니에 상품을 담았습니다.",
    },
    { status: 201 }
  );
};
