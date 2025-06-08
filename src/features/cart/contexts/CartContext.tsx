import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { CartItem } from "../../../apis/types/response";
import { CartItemsAPI } from "../apis/CartItemsAPI";
import useToast from "../../../shared/hooks/useToast";
import { TOAST_TYPES } from "../../../shared/config/toast";

export interface CartContextType {
  cartItems: CartItem[];
  fetchData: () => Promise<void>;

  cartItemsCount: number;
  totalPriceInCart: number;

  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
  deleteProductInCart: (cartId: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { showToast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setCartItems(await CartItemsAPI.get());
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      showToast({ message, type: TOAST_TYPES.ERROR });
    }
  }, [showToast]);

  const cartItemIds = useMemo(
    () =>
      cartItems?.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems]
  );

  const cartItemsCount = cartItems?.length ?? 0;

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

  const decreaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentProductId = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentProductId) return;

      const quantity = quantityByProductId(currentProductId.productId);

      if (quantity <= 1) {
        await CartItemsAPI.delete(currentProductId.cartId);
        // if (handleError(response)) return;
        // handleSuccess(response, "상품이 장바구니에서 삭제되었습니다.");
      } else {
        await CartItemsAPI.patch(currentProductId.cartId, quantity - 1);
        // if (handleError(response)) return;
      }

      fetchData();
    },
    [cartItemIds, quantityByProductId, fetchData]
  );

  const increaseItemQuantity = useCallback(
    async (productId: number) => {
      const currentProductId = cartItemIds.find(
        (productInfo) => productInfo.productId === productId
      );

      if (!currentProductId) return;

      await CartItemsAPI.patch(
        currentProductId.cartId,
        quantityByProductId(currentProductId.productId) + 1
      );

      // if (handleError(response)) return;

      fetchData();
    },
    [fetchData, cartItemIds, quantityByProductId]
  );

  const addProductInCart = useCallback(
    async (productId: number) => {
      try {
        await CartItemsAPI.post(productId);
        fetchData();
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        showToast({ message, type: TOAST_TYPES.ERROR });
      }

      // if (handleError(response)) return;
      // handleSuccess(response, "상품이 장바구니에 추가되었습니다.");
    },
    [fetchData, showToast]
  );

  const deleteProductInCart = useCallback(
    async (cartId: number) => {
      await CartItemsAPI.delete(cartId);

      // if (handleError(response)) return;
      // handleSuccess(response, "상품이 장바구니에서 삭제되었습니다.");

      fetchData();
    },
    [fetchData]
  );

  const contextValue = useMemo(
    () => ({
      cartItems,
      fetchData,

      cartItemsCount,
      totalPriceInCart,

      quantityByProductId,
      decreaseItemQuantity,
      increaseItemQuantity,
      addProductInCart,
      deleteProductInCart,
    }),
    [
      cartItems,
      fetchData,

      cartItemsCount,
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
