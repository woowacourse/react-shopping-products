import ProductListHeader from './components/ProductListHeader';
import ProductListTitle from './components/ProductListTitle';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  return (
    <div>
      <ProductListHeader />
      <div className={styles.productContentContainer}>
        <ProductListTitle />
      </div>
    </div>
  );
};

export default ProductListPage;
