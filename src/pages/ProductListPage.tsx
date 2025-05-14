import ErrorToast from "../components/ErrorToast";
import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import { useProductsContext } from "../contexts/useProductsContext";
import { useShoppingCartContext } from "../contexts/useShoppingCartContext";
import OrbitSpinner from "../components/OrbitSpinner";

const ProductListPage = () => {
  const { products, productsError, isProductsLoading } = useProductsContext();
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
      {isProductsLoading ? (
        <OrbitSpinner />
      ) : (
        <ProductCardList products={products} />
      )}
    </>
  );
};

export default ProductListPage;
