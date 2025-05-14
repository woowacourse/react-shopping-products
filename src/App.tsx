import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";
import ErrorBox from "./components/common/ErrorBox/ErrorBox";

function App() {
  return (
    <S.Global>
      <S.Wrap>
        <Header />
        <ErrorBox backgroundColor="#FFC9C9" text="에러 발생" />
        <ProductControl />
        <ProductList />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
