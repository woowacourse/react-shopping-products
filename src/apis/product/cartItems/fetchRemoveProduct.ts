import { apiRequest } from "../../ApiRequest";

type fetchRemoveProductParams = {
  params: {
    productId: number;
  };
};

const fetchRemoveProduct = async ({ params }: fetchRemoveProductParams) => {
  const { productId } = params;

  await apiRequest.delete({
    endpoint: `/cart-items/${productId}`,
  });
};

export default fetchRemoveProduct;
