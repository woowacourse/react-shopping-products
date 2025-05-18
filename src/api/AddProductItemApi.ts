import { fetcher } from "./fetcher";

async function AddProductItemApi(productId: number, quantity: number) {
  return fetcher("/cart-items", {
    method: "POST",
    body: {
      productId,
      quantity,
    },
  });
}

export default AddProductItemApi;
