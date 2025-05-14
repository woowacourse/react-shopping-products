import { FetchProductsRequest, CartItem } from "../types/product.type";

async function getShoppingCart({
  endpoint,
}: FetchProductsRequest): Promise<CartItem[]> {
  const username = "H0ngJu";
  const password = "password";
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(
      `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default getShoppingCart;
