import { useEffect, useState } from "react";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import Header from "./components/Header/Header";
import ProductItem from "./components/ProductItem/ProductItem";
import ProductsListTitle from "./components/ProductsListTitle/ProductsListTitle";
import ProductSorter from "./components/ProductSorter/ProductSorter";
import * as S from "./styles/Layout.styles";
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
        <Header />
        <S.Wrapper>
          <ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter />
            <ProductSorter />
          </S.ProductControlPanel>
          <S.ProductGrid>
            <ProductItem />
          </S.ProductGrid>
          {/* <ErrorToast /> */}
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
