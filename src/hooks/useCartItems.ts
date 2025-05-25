import { deleteCartItems, getCartItems, patchCartItems, postCartItems } from "../apis/cartItem";
import { GetCartItemsResponse } from "../types/cartItem";
import { useErrorMessage, useLoading } from "../contexts";
import useQuery from "./useQuery";

const useCartItems = () => {
  const { setErrorMessage } = useErrorMessage();
  const { startMutating, endMutating } = useLoading();

  const { data, refetch } = useQuery<GetCartItemsResponse>({
    queryKey: "/cart-items",
    fetchFn: () => getCartItems({ page: 0, size: 20 }),
  });

  const addCart = async (id: number) => {
    startMutating();
    try {
      await postCartItems({ quantity: 1, productId: id });
      await refetch();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      endMutating();
    }
  };

  const updateCart = async (id: number, quantity: number) => {
    startMutating();
    try {
      await patchCartItems({ id, quantity });
      await refetch();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      endMutating();
    }
  };

  const removeCart = async (id: number) => {
    startMutating();
    try {
      await deleteCartItems({ id });
      await refetch();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      endMutating();
    }
  };

  const handleCartItem = (type: "add" | "update" | "remove", id: number, quantity?: number) => {
    if (type === "add") return addCart(id);
    if (type === "update") return updateCart(id, quantity!);
    return removeCart(id);
  };

  // productId : {cartItemId: , quantity: }
  const cartItemsByProductId = Object.fromEntries(
    (data?.content || []).map((item) => [item.product.id, { cartItemId: item.id, quantity: item.quantity }]),
  );

  const totalPrice = data?.content.reduce((acc, cartItem) => {
    return (acc += cartItem.quantity * cartItem.product.price);
  }, 0);

  return {
    cartItems: data?.content,
    cartItemTotalPrice: totalPrice,
    handleCartItem,
    cartItemsByProductId,
  };
};

export default useCartItems;
