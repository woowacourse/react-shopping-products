import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
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
          {/* <S.ProductsListTitle />
          <S.ProductControlPanel>
            <CategoryFilter />
            <ProductSorter />
          </S.ProductControlPanel>
          <S.ProductGrid>
            <ProductItem />
          </S.ProductGrid>
          <ErrorToast /> */}
        </S.Wrapper>
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
