import * as S from './App.styled';
import Header from './components/Header/Header';
import ProductControl from './components/ProductControl/ProductControl';
import ProductItem from './components/ProductItem/ProductItem';

function App() {
  return (
    <S.Global>
      <S.Wrap>
        <Header />
        <ProductControl />
        <ProductItem />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
