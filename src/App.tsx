import { useEffect, useState } from "react";
import { CartItemsAPI } from "./apis/cartItems";
import { ProductsAPI } from "./apis/products";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ErrorToast from "./components/ErrorToast/ErrorToast";
import ProductItem from "./components/ProductItem/ProductItem";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import { CategoryOptionsKey, SortOptionsKey } from "./constants";
import * as S from "./styles/Layout.styles";
import { CartItems } from "./types/cartItems";
import { Products } from "./types/products";
import { isErrorResponse } from "./utils/typeGuard";

function App() {
  const [products, setProducts] = useState<Products | null>(null);
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOptionsKey>("전체");
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionsKey>("낮은 가격 순");

  useEffect(() => {
    (async () => {
      const response = await ProductsAPI.get(
        selectedCategory,
        selectedSortOption
      );

      if (isErrorResponse(response)) {
        setErrorMessage(response.error);
        return;
      }

      setProducts(response as Products);
    })();
  }, [selectedCategory, selectedSortOption]);

  useEffect(() => {
    (async () => {
      const response = await CartItemsAPI.get();

      if (isErrorResponse(response)) {
        setErrorMessage(response.error);
        return;
      }

      setCartItems(response as CartItems);
    })();
  }, []);

  const cartItemIds =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
    })) ?? [];

  const handleCartItemToggle = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (currentProductId) {
      await CartItemsAPI.delete(currentProductId.cartId);
    } else {
      await CartItemsAPI.post(productId);
    }

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper>
        <ShopHeader cartItemCount={cartItems?.content.length ?? 0} />
        <S.Wrapper>
          <ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <ProductSorter
              selectedSortOption={selectedSortOption}
              setSelectedSortOption={setSelectedSortOption}
            />
          </S.ProductControlPanel>
          <S.ProductGrid>
            {products?.content.map(({ id, imageUrl, name, price }) => (
              <ProductItem
                key={id}
                imageUrl={imageUrl}
                name={name}
                price={price}
                isAdd={cartItemIds.some(
                  (productInfo) => productInfo.productId === id
                )}
                handleCartItemToggle={() => handleCartItemToggle(id)}
              />
            ))}
          </S.ProductGrid>
          {!!errorMessage && <ErrorToast errorMessage={errorMessage} />}
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
