import * as S from "./app/styles/Layout.styles";
import ProductCatalog from "./widgets/ProductCatalog/ProductCatalog";
import ShopHeader from "./widgets/ShopHeader/ShopHeader";

function App() {
  return (
    <S.LayoutContainer>
      <S.LayoutWrapper id="custom-root">
        <ShopHeader />
        <ProductCatalog />
      </S.LayoutWrapper>
    </S.LayoutContainer>
  );
}

export default App;
