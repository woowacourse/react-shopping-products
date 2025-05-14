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
import { Products } from "./types/Products";

function App() {
  const [products, setProducts] = useState<Products | null>(null);
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOptionsKey>("전체");
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionsKey>("낮은 가격 순");

  useEffect(() => {
    (async () => {
      const data = await ProductsAPI.get(selectedCategory, selectedSortOption);
      setProducts(data);
    })();
  }, [selectedCategory, selectedSortOption]);

  useEffect(() => {
    (async () => {
      const data = await CartItemsAPI.get();
      setCartItems(data);
    })();
  }, []);

  const handleCartItemToggle = async (productId: number) => {
    await CartItemsAPI.post(productId);

    const data = await CartItemsAPI.get();
    setCartItems(data);
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
                isAdd={false}
                handleCartItemToggle={() => handleCartItemToggle(id)}
              />
            ))}
          </S.ProductGrid>
          <ErrorToast errorMessage="error" />
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
