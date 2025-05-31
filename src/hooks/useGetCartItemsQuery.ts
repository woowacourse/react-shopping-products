import { getCartItems } from "@/apis/cartItems/getCartItems";
import useData from "./useData";
import { CartItemType } from "@/types/cartItem";

const useGetCartItemsQuery = () => {
  return useData<CartItemType[]>({
    fetchFn: getCartItems,
    name: "cartItemData",
  });
};

export default useGetCartItemsQuery;
