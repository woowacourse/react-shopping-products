import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ProductItemSkeleton from "./components/ProductItem/components/ProductItemSkeleton/ProductItemSkeleton";
import ProductItem from "./components/ProductItem/ProductItem";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import useCartItems from "./hooks/useCartItems";
import useProducts from "./hooks/useProducts";
import * as S from "./styles/Layout.styles";

const ProductsSkeleton = Array.from({ length: 6 }).map((_, index) => (
  <ProductItemSkeleton key={index} />
));

function App() {
  const {
    products,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedSortOption,
    setSelectedSortOption,
  } = useProducts();

  const {
    cartItems,
    cartItemsCount,
    quantityByProductId,
    decreaseItemQuantity,
    increaseItemQuantity,
    addProductInCart,
    deleteProductInCart,
    totalPriceInCart,
  } = useCartItems();

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper id="custom-root">
        <ShopHeader
          cartItems={cartItems}
          cartItemsCount={cartItemsCount}
          quantityByProductId={quantityByProductId}
          increaseItemQuantity={increaseItemQuantity}
          decreaseItemQuantity={decreaseItemQuantity}
          deleteProductInCart={deleteProductInCart}
          totalPriceInCart={totalPriceInCart}
        />
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
            {!isLoading
              ? products?.content.map(
                  ({ id, imageUrl, name, price, quantity }) => (
                    <ProductItem
                      key={id}
                      imageUrl={imageUrl}
                      name={name}
                      price={price}
                      currentQuantity={quantityByProductId(id)}
                      maxQuantity={quantity}
                      increaseItemQuantity={() => increaseItemQuantity(id)}
                      decreaseItemQuantity={() => decreaseItemQuantity(id)}
                      addProductInCart={() => addProductInCart(id)}
                    />
                  )
                )
              : ProductsSkeleton}
          </S.ProductGrid>
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
