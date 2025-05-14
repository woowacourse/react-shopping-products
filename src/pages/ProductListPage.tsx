import ErrorToast from "../components/ErrorToast";
import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import { useProductsContext } from "../contexts/useProductsContext";
import { useShoppingCartContext } from "../contexts/useShoppingCartContext";

const ProductListPage = () => {
  const { products, productsError } = useProductsContext();
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
      <ProductCardList products={products} />
    </>
  );
};

export default ProductListPage;
