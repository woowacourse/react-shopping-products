import { FetchCartItemsResult } from "../../types/FetchCartItemsResult";
import { apiRequest } from "../ApiRequest";

type fetchCartItemsParams = {
  params?: {
    page: string;
    size: string;
  };
};

const fetchCartItems = async ({
  params = { page: "0", size: "50" },
}: fetchCartItemsParams) => {
  const data = await apiRequest.GET<FetchCartItemsResult>({
    endpoint: "/cart-items",
    searchParams: params,
    useToken: true,
  });

  return data;
};

export default fetchCartItems;
