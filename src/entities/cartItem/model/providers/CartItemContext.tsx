import {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isApiError } from "../../../../shared/api/apiClient";
import { TOAST_TYPES } from "../../../../shared/config/toast";
import useToast from "../../../../shared/hooks/useToast";
import { CartItemsAPI } from "../../api/cartItems";
import { CartItems } from "../types/response";

export interface CartItemContextType {
  cartItems: CartItems | null;
  cartItemsCount: number;
  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
  deleteProductInCart: (cartId: number) => Promise<void>;
  totalPriceInCart: number;
}

export const CartItemContext = createContext<CartItemContextType | null>(null);

export const CartItemProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const { showToast } = useToast();

  const fetchCartItems = async () => {
    const response = await CartItemsAPI.get();

    if (isApiError(response)) {
      showToast({
        message: response.error,
        type: TOAST_TYPES.ERROR,
      });
      return;
    }

    setCartItems(response as CartItems);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const cartItemIds = useMemo(
    () =>
      cartItems?.content.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems?.content]
  );

  const cartItemsCount = cartItems?.content.length ?? 0;
  const allQuantities =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    })) ?? [];

  const quantityByProductId = (productId: number) =>
    allQuantities.find((item) => item.productId === productId)?.quantity ?? 0;

  const totalPriceInCart =
    cartItems?.content.reduce((total, productInfo) => {
      const price = productInfo.product?.price ?? 0;
      const quantity = productInfo.quantity ?? 0;
      return total + price * quantity;
    }, 0) ?? 0;

  const decreaseItemQuantity = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (!currentProductId) return;

    const quantity = quantityByProductId(currentProductId.productId);

    if (quantity <= 1) await CartItemsAPI.delete(currentProductId.cartId);
    else await CartItemsAPI.patch(currentProductId.cartId, quantity - 1);

    await fetchCartItems();
  };

  const increaseItemQuantity = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (!currentProductId) return;
    await CartItemsAPI.patch(
      currentProductId.cartId,
      quantityByProductId(currentProductId.productId) + 1
    );

    await fetchCartItems();
  };

  const addProductInCart = async (productId: number) => {
    await CartItemsAPI.post(productId);
    await fetchCartItems();
  };

  const deleteProductInCart = async (cartId: number) => {
    await CartItemsAPI.delete(cartId);
    await fetchCartItems();
  };

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        cartItemsCount,
        quantityByProductId,
        decreaseItemQuantity,
        increaseItemQuantity,
        addProductInCart,
        deleteProductInCart,
        totalPriceInCart,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
