import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";

function App() {
  return (
    <S.Global>
      <S.Wrap>
        <Header />
        <ProductControl />
        <ProductList />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
