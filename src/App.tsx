import { useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ShopHeader from "./components/ShopHeader/ShopHeader";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import * as S from "./styles/Layout.styles";
import ProductItem from "./components/ProductItem/ProductItem";
import { Products } from "./types";

function App() {
  const [products, setProducts] = useState<Products | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}products`
      );
      const data = await response.json();
      setProducts(data);
    })();
  }, []);

  return (
    <S.LayoutContainer>
      <S.LayoutWrapper>
        <ShopHeader />
        <S.Wrapper>
          <ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter />
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
