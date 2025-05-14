import { useEffect, useState } from "react";
import { ProductAPI } from "./apis/product";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ProductItem from "./components/ProductItem/ProductItem";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import * as S from "./styles/Layout.styles";
import { Products } from "./types";

function App() {
  const [products, setProducts] = useState<Products | null>(null);
  const [category, setCategory] = useState<string>("전체");

  useEffect(() => {
    (async () => {
      const data = await ProductAPI.get(category);
      setProducts(data);
    })();
  }, [category]);

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper>
        <ShopHeader />
        <S.Wrapper>
          <ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter category={category} setCategory={setCategory} />
            <ProductSorter />
          </S.ProductControlPanel>
          <S.ProductGrid>
            {products?.content
              .slice(0, 20)
              .map(({ id, imageUrl, name, price }) => (
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
