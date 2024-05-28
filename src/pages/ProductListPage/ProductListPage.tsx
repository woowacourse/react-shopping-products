import { useState } from 'react';
import ProductItemList from './components/ProductItemList';
import ProductListHeader from './components/ProductListHeader';
import ProductListSelectBar from './components/ProductListSelectBar';
import ProductListTitle from './components/ProductListTitle';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  const [cartItemCount, setCartItemCount] = useState(1);
  return (
    <div>
      <ProductListHeader cartItemCount={cartItemCount} />
      <div className={styles.productContentContainer}>
        <ProductListTitle />
        <ProductListSelectBar />
        <ProductItemList />
      </div>
    </div>
  );
};

export default ProductListPage;
