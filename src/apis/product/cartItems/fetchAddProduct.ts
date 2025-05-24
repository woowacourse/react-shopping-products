import { apiRequest } from "../../ApiRequest";

type fetchAddProductParams = {
  params: {
    productId: number;
    quantity: string;
  };
};

const fetchAddProduct = async ({ params }: fetchAddProductParams) => {
  await apiRequest.POST({
    endpoint: "/cart-items",
    searchParams: params,
  });
};

export default fetchAddProduct;
