import ProductItemList from './components/ProductItemList';
import ProductListHeader from './components/ProductListHeader';
import ProductListSelectBar from './components/ProductListSelectBar';
import ProductListTitle from './components/ProductListTitle';
import styles from './ProductListPage.module.css';
import useProducts from '../../hooks/useProducts';
import { useState } from 'react';
import { CartItemsModal } from './components/CartItemsModal';

const ProductListPage = () => {
  const {
    products,
    cartItems,
    setPage,
    hasMore,
    isLoading,
    cartItemCount,
    handleSelectBarCondition,
  } = useProducts();
  const [cartItemsModalOpen, setCartItemsModalOpen] = useState(false);

  return (
    <div>
      <ProductListHeader
        cartItemCount={cartItemCount}
        cartItemsModalOpen={() => setCartItemsModalOpen(true)}
      />
      <div className={styles.productContentContainer}>
        <ProductListTitle />
        <ProductListSelectBar handleSelectBarCondition={handleSelectBarCondition} />
        <ProductItemList
          products={products}
          cartItems={cartItems}
          setPage={setPage}
          hasMore={hasMore}
          isLoading={isLoading}
        />
      </div>
      <CartItemsModal
        isOpen={cartItemsModalOpen}
        cartItemsModalClose={() => setCartItemsModalOpen(false)}
      />
    </div>
  );
};

export default ProductListPage;
