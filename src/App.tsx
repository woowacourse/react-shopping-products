import Header from './components/Header/Header';
import * as S from './App.styled';

function App() {
  return (
    <S.Global>
      <S.Wrap>
        <Header />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
