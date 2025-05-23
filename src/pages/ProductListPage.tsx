import ErrorToast from '../components/ErrorToast';
import ProductCardList from '../components/ProductCardList';
import ProductListToolBar from '../components/ProductListToolBar';
import { useProductsContext } from '../contexts/useProductsContext';
import { useShoppingCartContext } from '../contexts/useShoppingCartContext';
import OrbitSpinner from '../components/OrbitSpinner/index';

const ProductListPage = () => {
  const products = useProductsContext();
  const shoppingCart = useShoppingCartContext();

  return (
    <>
      {products.error.is && <ErrorToast message={products.error.message} />}
      {shoppingCart.error.is && (
        <ErrorToast message={shoppingCart.error.message} />
      )}
      <ProductListToolBar />
      {products.loading ? (
        <OrbitSpinner />
      ) : (
        <ProductCardList products={products.items} />
      )}
    </>
  );
};

export default ProductListPage;
