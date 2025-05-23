import { DeleteCartItemsParams, PatchCartItemsParams } from "@/apis/CartItemApi";

import { CartItemApi, ProductApi } from "@/apis";

import { PostCartItemsParams } from "@/apis/CartItemApi";
import { useError } from "@/context";
import { useMutation, useQuery } from "@/modules";
import { GetCartItemsResponse } from "@/types";

export default function useCartItem() {
  const { showError } = useError();

  const { data: products, status: productsStatus } = useQuery({
    queryFn: ProductApi.getAllProducts,
    queryKey: "products",
  });

  const {
    data: cartItems,
    status: cartItemsStatus,
    refetch: refetchCartItems,
  } = useQuery({
    queryFn: CartItemApi.getCartItems,
    queryKey: "cartItems",
  });

  const { mutate: mutatePostCartItem } = useMutation<PostCartItemsParams, void, GetCartItemsResponse>({
    mutationFn: CartItemApi.postCartItems,
    queryKey: "cartItems",
  });
  const { mutate: mutatePatchCartItem } = useMutation<PatchCartItemsParams, void, GetCartItemsResponse>({
    mutationFn: CartItemApi.patchCartItems,
    queryKey: "cartItems",
  });
  const { mutate: mutateDeleteCartItem } = useMutation<DeleteCartItemsParams, void, GetCartItemsResponse>({
    mutationFn: CartItemApi.deleteCartItems,
    queryKey: "cartItems",
  });

  const increaseCartItem = async (productId: number) => {
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    const product = products?.content.find((item) => item.id === productId);
    if (!product) return;

    const stock = product.stock;

    if (stock < (cartItem?.quantity ?? 0) + 1) {
      showError("재고가 부족합니다.");
      return;
    }

    if (!cartItem) {
      await mutatePostCartItem({ productId });
      await refetchCartItems();
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity + 1,
        },
        (prev) => {
          const currentCartItemIndex = prev.content.findIndex((item) => item.product.id === productId);

          const newCartContent = [...prev.content];
          newCartContent[currentCartItemIndex] = {
            ...newCartContent[currentCartItemIndex],
            quantity: cartItem.quantity + 1,
          };

          return { ...prev, content: newCartContent };
        },
      );
    }
  };

  const decreaseCartItem = async (productId: number) => {
    const cartItem = cartItems?.content.find((item) => item.product.id === productId);

    if (!cartItem) return;

    if (!cartItem || cartItem.quantity === 1) {
      await mutateDeleteCartItem({ cartItemId: cartItem.id }, (prev) => {
        const newCartContent = [...prev.content];
        return {
          ...prev,
          content: newCartContent.filter((item) => item.product.id !== productId),
        };
      });
    } else {
      await mutatePatchCartItem(
        {
          cartItemId: cartItem.id,
          quantity: cartItem.quantity - 1,
        },
        (prev) => {
          const currentCartItemIndex = prev.content.findIndex((item) => item.product.id === productId);

          const newCartContent = [...prev.content];
          newCartContent[currentCartItemIndex] = {
            ...newCartContent[currentCartItemIndex],
            quantity: cartItem.quantity - 1,
          };

          return { ...prev, content: newCartContent };
        },
      );
    }
  };

  return {
    increaseCartItem,
    decreaseCartItem,
    productsStatus,
    cartItemsStatus,
    products,
    cartItems,
  };
}
