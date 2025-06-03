import { useState, useMemo, useEffect, useContext } from "react";
import { ResponseProduct, ResponseCartItem } from "../api/types";
import getCartItemList from "../api/cartItemListApi";
import addProductItemApi from "../api/addProductItemApi";
import removeProductItemApi from "../api/removeProductItemApi";
import updateCartItemApi from "../api/updateCartItemApi";
import { CART_MAX_COUNT } from "../constants/constants";
import { useDataFetch } from "./useDataFetch";
import { useDataContextReadOnly } from "../context/DataContext"; // 읽기 전용 사용
import { CartContext } from "../context/CartContext";

export const useCart = () => {
  const { getData } = useDataContextReadOnly();

  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("useCart must be used within a CartProvider");
  }
  const { cartItems, setCartItems } = cartContext;

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

  useEffect(() => {
    if (cartItemList) {
      setCartItems(cartItemList);
    }
  }, [cartItemList, setCartItems]);

  const cartItemListErrorMessage = error || "";

  const handleCartErrorMessage = (message: string) => {
    setCartActionErrorMessage(message);
  };

  const getCartQuantityForProduct = (productId: number): number => {
    if (!cartItems) return 0;
    const cartItem = cartItems.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartItemIdForProduct = (productId: number): number | null => {
    if (!cartItems) return null;
    const cartItem = cartItems.find((item) => item.product.id === productId);
    return cartItem ? cartItem.id : null;
  };

  const updateCartItemOptimistically = (
    productId: number,
    newQuantity: number
  ) => {
    if (!cartItems) return;

    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId
    );

    let updatedCartItems: ResponseCartItem[];

    if (existingItemIndex >= 0) {
      if (newQuantity <= 0) {
        updatedCartItems = cartItems.filter(
          (_, index) => index !== existingItemIndex
        );
      } else {
        updatedCartItems = [...cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: newQuantity,
        };
      }
    } else if (newQuantity > 0) {
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
        updatedCartItems = [...cartItems, newCartItem];
      } else {
        return;
      }
    } else {
      return;
    }

    setCartItems(updatedCartItems);
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
        if ((cartItems?.length || 0) >= CART_MAX_COUNT) {
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
      const cartItem = cartItems?.find((item) => item.id === cartItemId);
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

  return {
    cartItemList: cartItems || [],
    cartItemListLoading,
    cartItemListErrorMessage,
    cartActionErrorMessage,
    setCartActionErrorMessage,

    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
    handleRemoveFromCart,

    getCartQuantityForProduct,
    getCartItemIdForProduct,
  };
};
