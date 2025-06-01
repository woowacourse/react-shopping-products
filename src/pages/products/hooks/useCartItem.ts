import { ProductApi } from "@/apis";
import { useCartItemsQuery } from "@/modules/CartItemQuery/useCartItemsQuery";
import { useDeleteCartItemMutation } from "@/modules/CartItemQuery/useDeleteCartItemMutation";
import { usePatchCartItemMutation } from "@/modules/CartItemQuery/usePatchCartItemMutation";
import { usePostCartItemMutation } from "@/modules/CartItemQuery/usePostCartItemMutation";
import { useQuery } from "@/modules/Query";
import {
  optimisticDecreaseCartItem,
  optimisticDeleteCartItem,
  optimisticIncreaseCartItem,
} from "@/utils/cartItemOptimisticUpdate";

export default function useCartItem() {
  const { data: products, status: productsStatus } = useQuery({
    queryFn: ProductApi.getAllProducts,
    queryKey: "products",
  });

  const { data: cartItems, status: cartItemsStatus, refetch: refetchCartItems } = useCartItemsQuery();

  const { mutate: mutatePostCartItem, status: postCartItemStatus } = usePostCartItemMutation();
  const { mutate: mutatePatchCartItem, status: patchCartItemStatus } = usePatchCartItemMutation();
  const { mutate: mutateDeleteCartItem, status: deleteCartItemStatus } = useDeleteCartItemMutation();

  const increaseCartItem = async (productId: number) => {
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    const product = products?.content.find((item) => item.id === productId);
    if (!product) return;

    if (!cartItem) {
      await mutatePostCartItem({ productId });
      await refetchCartItems();
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity + 1,
        },
        {
          onMutate: (queryClient) => optimisticIncreaseCartItem(queryClient, productId),
        },
      );
    }
  };

  const decreaseCartItem = async (productId: number) => {
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    if (!cartItem) return;
    optimisticDecreaseCartItem;

    if (cartItem.quantity === 1) {
      await mutateDeleteCartItem(
        { cartItemId: cartItem.id },
        {
          onMutate: (queryClient) => optimisticDeleteCartItem(queryClient, cartItem.id),
        },
      );
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity - 1,
        },
        {
          onMutate: (queryClient) => optimisticDecreaseCartItem(queryClient, productId),
        },
      );
    }
  };

  const deleteCartItem = async (cartItemId: number) => {
    await mutateDeleteCartItem(
      { cartItemId },
      {
        onMutate: (queryClient) => optimisticDeleteCartItem(queryClient, cartItemId),
      },
    );
  };

  return {
    increaseCartItem,
    decreaseCartItem,
    deleteCartItem,
    productsStatus,
    cartItemsStatus,
    products,
    cartItems,
    postCartItemStatus,
    patchCartItemStatus,
    deleteCartItemStatus,
  };
}
