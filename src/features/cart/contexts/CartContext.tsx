import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem } from "../../../apis/types/response";
import useFetch from "../../../shared/hooks/useFetch";
import useMutation from "../../../shared/hooks/useMutation";
import { CartItemsAPI } from "../apis/CartItemsAPI";

export interface CartContextType {
  refetch: () => Promise<void>;
  cart: {
    items: CartItem[];
    count: number;
    totalPrice: number;
  };
  product: {
    add: (productId: number) => Promise<void>;
    delete: (cartId: number) => Promise<void>;
    quantity: {
      get: (productId: number) => number;
      increase: (productId: number) => Promise<void>;
      decrease: (productId: number) => Promise<void>;
    };
  };
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { data, success, fetchData } = useFetch<CartItem[]>(() =>
    CartItemsAPI.get()
  );

  useEffect(() => {
    if (data && success) {
      setCartItems(data);
    }
  }, [data, success]);

  const refetch = useCallback(() => fetchData(), [fetchData]);

  const cartItemIds = useMemo(
    () =>
      cartItems?.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems]
  );

  const allQuantities = useMemo(
    () =>
      cartItems?.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
        quantity: productInfo.quantity,
      })) ?? [],
    [cartItems]
  );

  const quantityByProductId = useCallback(
    (productId: number) =>
      allQuantities.find((item) => item.productId === productId)?.quantity ?? 0,
    [allQuantities]
  );

  const totalPriceInCart = useMemo(
    () =>
      cartItems?.reduce((total, productInfo) => {
        const price = productInfo.product?.price ?? 0;
        const quantity = productInfo.quantity ?? 0;
        return total + price * quantity;
      }, 0) ?? 0,
    [cartItems]
  );

  const { mutate: deleteCartItem } = useMutation<number>(
    (cartId) => CartItemsAPI.delete(cartId),
    {
      successMessage: "상품이 장바구니에서 삭제되었습니다.",
      onSuccess: () => fetchData(),
    }
  );

  const { mutate: updateCartItemQuantity } = useMutation<{
    cartId: number;
    quantity: number;
  }>(({ cartId, quantity }) => CartItemsAPI.patch(cartId, quantity), {
    onSuccess: () => fetchData(),
  });

  const { mutate: addToCart } = useMutation<number>(
    (productId) => CartItemsAPI.post(productId),
    {
      successMessage: "상품이 장바구니에 추가되었습니다.",
      onSuccess: () => fetchData(),
    }
  );

  const decreaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentItem = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentItem) return;
      const quantity = quantityByProductId(currentItem.productId);

      if (quantity <= 1) {
        await deleteCartItem(currentItem.cartId);
      } else {
        await updateCartItemQuantity({
          cartId: currentItem.cartId,
          quantity: quantity - 1,
        });
      }
    },
    [cartItemIds, quantityByProductId, deleteCartItem, updateCartItemQuantity]
  );

  const increaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentItem = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentItem) return;
      const quantity = quantityByProductId(currentItem.productId);

      await updateCartItemQuantity({
        cartId: currentItem.cartId,
        quantity: quantity + 1,
      });
    },
    [cartItemIds, quantityByProductId, updateCartItemQuantity]
  );

  const addProductInCart = useCallback(
    async (productId: number) => {
      await addToCart(productId);
    },
    [addToCart]
  );

  const deleteProductInCart = useCallback(
    async (cartId: number) => {
      await deleteCartItem(cartId);
    },
    [deleteCartItem]
  );

  const contextValue = useMemo(
    () => ({
      refetch,
      cart: {
        items: cartItems,
        count: cartItems?.length ?? 0,
        totalPrice: totalPriceInCart,
      },
      product: {
        add: addProductInCart,
        delete: deleteProductInCart,
        quantity: {
          get: quantityByProductId,
          increase: increaseItemQuantity,
          decrease: decreaseItemQuantity,
        },
      },
    }),
    [
      refetch,
      cartItems,
      totalPriceInCart,
      quantityByProductId,
      decreaseItemQuantity,
      increaseItemQuantity,
      addProductInCart,
      deleteProductInCart,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
