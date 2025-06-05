import { useErrorMessageContext } from "../context/ErrorMessageContext";
import { getFriendlyMessage } from "../context/utils/getFriendlyMessage";

import fetchAddProduct from "../apis/product/fetchAddProduct";
import fetchRemoveProduct from "../apis/product/fetchRemoveProduct";
import fetchPatchProduct from "../apis/product/fetchPatchProduct";
import fetchCartItems from "../apis/product/fetchCartItems";

import CartItem from "../types/CartItem";
import { useResource } from "./useResource";

const useCartItemsId = () => {
  const { handleErrorMessage } = useErrorMessageContext();

  const {
    data: cartItemsId,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
  } = useResource<CartItem[]>("cartItems", async () => {
    const { content } = await fetchCartItems({
      method: "GET",
      params: { page: "0", size: "50" },
    });
    return content;
  });

  const addCartItemId = async (productId: string, quantity: number) => {
    try {
      await fetchAddProduct({
        method: "POST",
        params: { productId, quantity },
      });
      await refetch();
    } catch (error) {
      if (error instanceof Error) {
        handleErrorMessage(getFriendlyMessage(error.message));
      }
    }
  };

  const patchCartItemId = async (productId: string, quantity: number) => {
    try {
      await fetchPatchProduct({
        method: "PATCH",
        params: { productId, quantity },
      });
      await refetch();
    } catch (error) {
      if (error instanceof Error) {
        handleErrorMessage(getFriendlyMessage(error.message));
      }
    }
  };

  const removeCartItemId = async (productId: string) => {
    try {
      await fetchRemoveProduct({
        method: "DELETE",
        params: { productId },
      });
      await refetch();
    } catch (error) {
      handleErrorMessage("상품 삭제에 실패했습니다.");
    }
  };

  return {
    state: {
      isLoading,
      isFetching,
      isSuccess,
      isError,
    },
    cartItemsId,
    addCartItemId,
    patchCartItemId,
    removeCartItemId,
  };
};

export default useCartItemsId;
