import ErrorToast from "../components/ErrorToast";
import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import { useProductsContext } from "../contexts/products/useProductsContext";
import { useShoppingCartContext } from "../contexts/shoppingCart/useShoppingCartContext";
import OrbitSpinner from "../components/OrbitSpinner/index";

const ProductListPage = () => {
  const { products, productsError, isProductsLoading } = useProductsContext();
  const { isShoppingLoading } = useShoppingCartContext();
  const { shoppingCartError } = useShoppingCartContext();

  return (
    <>
      {productsError.isError && (
        <ErrorToast errorMessage={productsError.errorMessage} />
      )}
      {shoppingCartError.isError && (
        <ErrorToast errorMessage={shoppingCartError.errorMessage} />
      )}
      <ProductListToolBar />
      {isProductsLoading && isShoppingLoading ? (
        <OrbitSpinner />
      ) : (
        <ProductCardList products={products} />
      )}
    </>
  );
};

export default ProductListPage;
