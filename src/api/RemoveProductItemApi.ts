import { fetcher } from "./fetcher";

async function RemoveProductItemApi(productId: number) {
  return fetcher(`/cart-items/${productId}`, {
    method: "DELETE",
  });
}

export default RemoveProductItemApi;
