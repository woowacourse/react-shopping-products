import { useEffect, useState } from "react";
import { ProductAPI } from "./apis/product";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ProductItem from "./components/ProductItem/ProductItem";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import * as S from "./styles/Layout.styles";
import { Products } from "./types";
import { SortOptionKey } from "./constants";

function App() {
  const [products, setProducts] = useState<Products | null>(null);
  const [category, setCategory] = useState<string>("전체");
  const [selectedSortOption, setSelectedSortOption] =
    useState<SortOptionKey>("낮은 가격 순");

  useEffect(() => {
    (async () => {
      const data = await ProductAPI.get(category, selectedSortOption);
      setProducts(data);
    })();
  }, [category, selectedSortOption]);

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper>
        <ShopHeader />
        <S.Wrapper>
          <ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter category={category} setCategory={setCategory} />
            <ProductSorter
              selectedSortOption={selectedSortOption}
              setSelectedSortOption={setSelectedSortOption}
            />
          </S.ProductControlPanel>
          <S.ProductGrid>
            {products?.content.map(({ id, imageUrl, name, price }) => (
              <div key={id}>
                <ProductItem imageUrl={imageUrl} name={name} price={price} />
              </div>
            ))}
          </S.ProductGrid>
          {/* <ErrorToast /> */}
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
