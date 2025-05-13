import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";

function App() {
  return (
    <S.Global>
      <S.Wrap>
        <Header />
        <ProductControl />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
