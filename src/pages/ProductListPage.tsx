import ErrorToast from '../components/ErrorToast';
import ProductCardList from '../components/ProductCardList';
import ProductListToolBar from '../components/ProductListToolBar';
import OrbitSpinner from '../components/OrbitSpinner/index';
import { useProducts } from '../hooks/useProducts';
// import { useShoppingCart } from '../hooks/useShoppingCart';

const ProductListPage = () => {
  const products = useProducts();
  // const shoppingCart = useShoppingCart();

  return (
    <>
      {products.error && <ErrorToast message={products.error} />}
      {/* {shoppingCart.error && <ErrorToast message={shoppingCart.error} />} */}
      <ProductListToolBar />
      {products.loading ? (
        <OrbitSpinner />
      ) : (
        <ProductCardList products={products.data} />
      )}
    </>
  );
};

export default ProductListPage;
