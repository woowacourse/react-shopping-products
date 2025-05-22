import { apiRequest } from "../ApiRequest";

type fetchRemoveProductParams = {
  params: {
    productId: number;
  };
};

const fetchRemoveProduct = async ({ params }: fetchRemoveProductParams) => {
  await apiRequest.DELETE({
    endpoint: "/cart-items/",
    searchParams: params,
  });
};

export default fetchRemoveProduct;
