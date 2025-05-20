import ErrorToast from '../components/ErrorToast';
import ProductCardList from '../components/ProductCardList';
import ProductListToolBar from '../components/ProductListToolBar';
import { useProductsContext } from '../contexts/useProductsContext';
import { useShoppingCartContext } from '../contexts/useShoppingCartContext';
import OrbitSpinner from '../components/OrbitSpinner/index';

const ProductListPage = () => {
  const { products, productsError, isProductsLoading } = useProductsContext();
  const { shoppingCartError } = useShoppingCartContext();

  return (
    <>
      {productsError.is && <ErrorToast message={productsError.message} />}
      {shoppingCartError.is && (
        <ErrorToast message={shoppingCartError.message} />
      )}
      <ProductListToolBar />
      {isProductsLoading ? (
        <OrbitSpinner />
      ) : (
        <ProductCardList products={products} />
      )}
    </>
  );
};

export default ProductListPage;
