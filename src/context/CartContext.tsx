import React, { createContext, useContext, useState, useMemo } from "react";
import { ResponseProduct, ResponseCartItem } from "../api/types";
import getCartItemList from "../api/cartItemListApi";
import addProductItemApi from "../api/addProductItemApi";
import removeProductItemApi from "../api/removeProductItemApi";
import updateCartItemApi from "../api/updateCartItemApi";
import { CART_MAX_COUNT } from "../constants/constants";
import { useDataFetch } from "../hooks/useDataFetch";
import { useDataContext } from "./DataContext";

interface CartContextValue {
  cartItemList: ResponseCartItem[];
  cartItemListLoading: boolean;
  cartItemListErrorMessage: string;
  cartActionErrorMessage: string;

  handleIncreaseQuantity: (productId: number) => Promise<void>;
  handleDecreaseQuantity: (productId: number) => Promise<void>;
  handleAddToCart: (productId: number, quantity: number) => Promise<void>;
  handleRemoveFromCart: (cartItemId: number) => Promise<void>;

  getCartQuantityForProduct: (productId: number) => number;
  getCartItemIdForProduct: (productId: number) => number | null;
  setCartActionErrorMessage: (message: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const { setData, getData } = useDataContext();
  const [isUpdatingCart, setIsUpdatingCart] = useState<Record<number, boolean>>(
    {}
  );
  const [cartActionErrorMessage, setCartActionErrorMessage] =
    useState<string>("");

  const cartFetcher = useMemo(() => {
    return () => getCartItemList({});
  }, []);

  const {
    data: cartItemList,
    loading: cartItemListLoading,
    error,
  } = useDataFetch<ResponseCartItem[]>("cartItems", cartFetcher, {
    deps: [],
  });

  const cartItemListErrorMessage = error || "";

  const handleCartErrorMessage = (message: string) => {
    setCartActionErrorMessage(message);
  };

  const getCartQuantityForProduct = (productId: number): number => {
    if (!cartItemList) return 0;
    const cartItem = cartItemList.find(
      (item: ResponseCartItem) => item.product.id === productId
    );
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartItemIdForProduct = (productId: number): number | null => {
    if (!cartItemList) return null;
    const cartItem = cartItemList.find(
      (item: ResponseCartItem) => item.product.id === productId
    );
    return cartItem ? cartItem.id : null;
  };

  const updateCartItemOptimistically = (
    productId: number,
    newQuantity: number
  ) => {
    if (!cartItemList) return;

    const existingItemIndex = cartItemList.findIndex(
      (item: ResponseCartItem) => item.product.id === productId
    );

    let updatedCartItems: ResponseCartItem[];

    if (existingItemIndex >= 0) {
      if (newQuantity <= 0) {
        updatedCartItems = cartItemList.filter(
          (_: ResponseCartItem, index: number) => index !== existingItemIndex
        );
      } else {
        updatedCartItems = [...cartItemList];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: newQuantity,
        };
      }
    } else if (newQuantity > 0) {
      // DataContext에서 products 데이터 가져오기
      const productsState = getData<ResponseProduct>("products");
      const productList = productsState?.data || [];

      const product = productList.find((p) => p.id === productId);
      if (product) {
        const newCartItem: ResponseCartItem = {
          id: productId,
          quantity: newQuantity,
          product: {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            quantity: product.quantity,
          },
        };
        updatedCartItems = [...cartItemList, newCartItem];
      } else {
        return;
      }
    } else {
      return;
    }

    setData("cartItems", updatedCartItems);
  };

  const handleIncreaseQuantity = async (productId: number) => {
    if (isUpdatingCart[productId]) return;

    try {
      setIsUpdatingCart((prev) => ({ ...prev, [productId]: true }));
      setCartActionErrorMessage("");

      const currentQuantity = getCartQuantityForProduct(productId);
      const cartItemId = getCartItemIdForProduct(productId);
      const newQuantity = currentQuantity + 1;

      updateCartItemOptimistically(productId, newQuantity);

      if (currentQuantity === 0) {
        if ((cartItemList?.length || 0) >= CART_MAX_COUNT) {
          updateCartItemOptimistically(productId, currentQuantity);
          handleCartErrorMessage(
            `장바구니에는 최대 ${CART_MAX_COUNT}개의 상품만 담을 수 있습니다.`
          );
          return;
        }
        await addProductItemApi(productId, 1);
      } else {
        if (cartItemId) {
          await updateCartItemApi(cartItemId, newQuantity);
        }
      }
    } catch (error) {
      const currentQuantity = getCartQuantityForProduct(productId);
      updateCartItemOptimistically(productId, currentQuantity - 1);

      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    } finally {
      setIsUpdatingCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleDecreaseQuantity = async (productId: number) => {
    if (isUpdatingCart[productId]) return;

    try {
      setIsUpdatingCart((prev) => ({ ...prev, [productId]: true }));
      setCartActionErrorMessage("");

      const currentQuantity = getCartQuantityForProduct(productId);
      const cartItemId = getCartItemIdForProduct(productId);
      const newQuantity = currentQuantity - 1;

      updateCartItemOptimistically(productId, newQuantity);

      if (currentQuantity <= 1) {
        if (cartItemId) {
          await removeProductItemApi(cartItemId);
        }
      } else {
        if (cartItemId) {
          await updateCartItemApi(cartItemId, newQuantity);
        }
      }
    } catch (error) {
      const currentQuantity = getCartQuantityForProduct(productId);
      updateCartItemOptimistically(productId, currentQuantity + 1);

      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    } finally {
      setIsUpdatingCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const handleAddToCart = async (productId: number, quantity: number) => {
    try {
      setCartActionErrorMessage("");
      await addProductItemApi(productId, quantity);
    } catch (error) {
      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    }
  };

  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      setCartActionErrorMessage("");
      const cartItem = cartItemList?.find(
        (item: ResponseCartItem) => item.id === cartItemId
      );
      if (cartItem) {
        updateCartItemOptimistically(cartItem.product.id, 0);
      }

      await removeProductItemApi(cartItemId);
    } catch (error) {
      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    }
  };

  const value: CartContextValue = {
    cartItemList: cartItemList || [],
    cartItemListLoading,
    cartItemListErrorMessage,
    cartActionErrorMessage,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
    handleRemoveFromCart,
    getCartQuantityForProduct,
    getCartItemIdForProduct,
    setCartActionErrorMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
