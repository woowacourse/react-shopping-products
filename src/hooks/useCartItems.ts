import { deleteCartItems, getCartItems, patchCartItems, postCartItems } from "../apis/cartItem";
import { GetCartItemsResponse } from "../types/cartItem";
import { useErrorMessage } from "../contexts";
import useQuery from "./common/useQuery";
import useMutation from "./common/useMutation";

const useCartItems = () => {
  const { setErrorMessage } = useErrorMessage();

  const { data, refetch } = useQuery<GetCartItemsResponse>({
    queryKey: "/cart-items",
    fetchFn: () => getCartItems({ page: 0, size: 20 }),
  });

  const { mutate: addCart } = useMutation((id: number) => postCartItems({ productId: id, quantity: 1 }), {
    onSuccess: async () => await refetch(),
    onError: (e) => setErrorMessage(e.message),
  });

  const { mutate: updateCart } = useMutation(
    (variables: { id: number; quantity: number }) => patchCartItems(variables),
    {
      onSuccess: async () => await refetch(),
      onError: (e) => setErrorMessage(e.message),
    },
  );

  const { mutate: removeCart } = useMutation((id: number) => deleteCartItems({ id }), {
    onSuccess: async () => await refetch(),
    onError: (e) => setErrorMessage(e.message),
  });

  const handleCartItem = (type: "add" | "update" | "remove", id: number, quantity?: number) => {
    if (type === "add") return addCart(id);
    if (type === "update") return updateCart({ id, quantity: quantity! });
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
