import * as styles from './App.style';
import HomeHeader from './components/Header/HomeHeader';
import ProductList from './components/Product/ProductList/ProductList';

function App() {
  return (
    <div css={styles.bodyCss}>
      <div css={styles.headerHeight} />
      <HomeHeader />
      <ProductList />
    </div>
  );
}

export default App;
