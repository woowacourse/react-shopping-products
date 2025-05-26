import { fetcher } from "./fetcher";

async function addProductItemApi(productId: number, quantity: number) {
  return fetcher("/cart-items", {
    method: "POST",
    body: {
      productId,
      quantity,
    },
  });
}

export default addProductItemApi;
