import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";
import ErrorBox from "./components/common/ErrorBox/ErrorBox";
import getProductList from "./api/ProductListApi";
import getCartItemList from "./api/CartItemListApi";
import LoadingIcon from "./components/Icon/LoadingIcon";
import { useEffect, useState } from "react";
import { ResponseCartItem, ResponseProduct } from "./api/types";
import AddProductItemApi from "./api/AddProductItemApi";
import { CART_MAX_COUNT } from "./constants/constants";
import RemoveProductItemApi from "./api/RemoveProductItemApi";
import UpdateCartItemApi from "./api/UpdateCartItemApi";

function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [productListLoading, setProductListLoading] = useState(true);
  const [productListErrorMessage, setProductListErrorMessage] = useState("");

  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [cartItemListLoading, setCartItemListLoading] = useState(true);
  const [cartItemListErrorMessage, setCartItemListErrorMessage] = useState("");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [isUpdatingCart, setIsUpdatingCart] = useState<Record<number, boolean>>(
    {}
  );

  const handleProductErrorMessage = (message: string) => {
    setProductListErrorMessage("");
    setTimeout(() => {
      setProductListErrorMessage(message);
    }, 10);
  };

  const handleCartErrorMessage = (message: string) => {
    setCartItemListErrorMessage("");
    setTimeout(() => {
      setCartItemListErrorMessage(message);
    }, 10);
  };

  const refreshCartItemList = async () => {
    try {
      const rawCartItemList = await getCartItemList({});
      setCartItemList(rawCartItemList);
    } catch (error) {
      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    }
  };

  const getCartQuantityForProduct = (productId: number): number => {
    const cartItem = cartItemList.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartItemIdForProduct = (productId: number): number | null => {
    const cartItem = cartItemList.find((item) => item.product.id === productId);
    return cartItem ? cartItem.id : null;
  };

  const updateCartItemOptimistically = (
    productId: number,
    newQuantity: number
  ) => {
    setCartItemList((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => item.product.id === productId
      );

      if (existingItemIndex >= 0) {
        if (newQuantity <= 0) {
          return prev.filter((_, index) => index !== existingItemIndex);
        } else {
          const updatedItems = [...prev];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: newQuantity,
          };
          return updatedItems;
        }
      } else if (newQuantity > 0) {
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
          return [...prev, newCartItem];
        }
      }
      return prev;
    });
  };

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const rawProductList = await getProductList({
          category: category,
          sort: sort,
        });
        setProductList(rawProductList);
      } catch (error) {
        if (error instanceof Error) {
          handleProductErrorMessage(error.message);
        }
      } finally {
        setProductListLoading(false);
      }
    };
    fetchProductList();
  }, [category, sort]);

  useEffect(() => {
    const fetchCartItemList = async () => {
      try {
        const rawCartItemList = await getCartItemList({});
        setCartItemList(rawCartItemList);
      } catch (error) {
        if (error instanceof Error) {
          handleCartErrorMessage(error.message);
        }
      } finally {
        setCartItemListLoading(false);
      }
    };
    fetchCartItemList();
  }, []);

  const isLoading = productListLoading || cartItemListLoading;

  const handleIncreaseQuantity = async (productId: number) => {
    if (isUpdatingCart[productId]) return;

    try {
      setIsUpdatingCart((prev) => ({ ...prev, [productId]: true }));

      const currentQuantity = getCartQuantityForProduct(productId);
      const cartItemId = getCartItemIdForProduct(productId);
      const newQuantity = currentQuantity + 1;

      updateCartItemOptimistically(productId, newQuantity);

      if (currentQuantity === 0) {
        if (cartItemList.length >= CART_MAX_COUNT) {
          updateCartItemOptimistically(productId, currentQuantity);
          handleCartErrorMessage(
            `장바구니에는 최대 ${CART_MAX_COUNT}개의 상품만 담을 수 있습니다.`
          );
          return;
        }
        await AddProductItemApi(productId, 1);
      } else {
        if (cartItemId) {
          await UpdateCartItemApi(cartItemId, newQuantity);
        }
      }

      await refreshCartItemList();
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

      const currentQuantity = getCartQuantityForProduct(productId);
      const cartItemId = getCartItemIdForProduct(productId);
      const newQuantity = currentQuantity - 1;

      updateCartItemOptimistically(productId, newQuantity);

      if (currentQuantity <= 1) {
        if (cartItemId) {
          await RemoveProductItemApi(cartItemId);
        }
      } else {
        if (cartItemId) {
          await UpdateCartItemApi(cartItemId, newQuantity);
        }
      }

      await refreshCartItemList();
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

  async function handleAddToCard(productId: number) {
    await handleIncreaseQuantity(productId);
  }

  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      const cartItem = cartItemList.find((item) => item.id === cartItemId);
      if (cartItem) {
        updateCartItemOptimistically(cartItem.product.id, 0);
      }

      await RemoveProductItemApi(cartItemId);
      await refreshCartItemList();
    } catch (error) {
      await refreshCartItemList();

      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    }
  };

  return (
    <S.AppContainer>
      <S.Wrap>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <Header cartItemList={cartItemList} />
            <S.MiddleContainer>
              <ProductControl setCategory={setCategory} setSort={setSort} />
              <ProductList
                productList={productList}
                cartItemList={cartItemList}
                onAddToCart={handleAddToCard}
                onRemoveFromCart={handleRemoveFromCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                getCartQuantityForProduct={getCartQuantityForProduct}
                setErrorMessage={handleProductErrorMessage}
              />
            </S.MiddleContainer>
          </>
        )}
        <ErrorBox text={productListErrorMessage} backgroundColor="#FFC9C9" />
        <ErrorBox text={cartItemListErrorMessage} backgroundColor="#FFC9C9" />
      </S.Wrap>
    </S.AppContainer>
  );
}

export default App;
