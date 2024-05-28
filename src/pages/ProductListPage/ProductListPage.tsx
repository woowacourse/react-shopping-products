import ProductListHeader from './components/ProductListHeader';
import ProductListSelectBar from './components/ProductListSelectBar';
import ProductListTitle from './components/ProductListTitle';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  return (
    <div>
      <ProductListHeader />
      <div className={styles.productContentContainer}>
        <ProductListTitle />
        <ProductListSelectBar />
      </div>
    </div>
  );
};

export default ProductListPage;
