import { apiRequest } from "../ApiRequest";

type fetchUpdateCartItemQuantityParams = {
  params: {
    id: string;
    quantity: number;
  };
};

const fetchUpdateCartItemQuantity = async ({
  params,
}: fetchUpdateCartItemQuantityParams) => {
  const { id, quantity } = params;

  await apiRequest.PATCH({
    endpoint: `/cart-items/${id}`,
    searchParams: { quantity },
  });
};

export default fetchUpdateCartItemQuantity;
