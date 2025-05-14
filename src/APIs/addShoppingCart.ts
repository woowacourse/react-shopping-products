import { ShoppingCartResponse } from "../types/product.type";

async function addShoppingCart({
  endpoint,
  requestBody,
}: ShoppingCartResponse): Promise<void> {
  const username = "H0ngJu";
  const password = "password";
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(
      `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default addShoppingCart;
