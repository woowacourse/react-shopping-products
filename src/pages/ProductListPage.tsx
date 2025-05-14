import ErrorToast from "../components/ErrorToast";
import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import { useProductsContext } from "../contexts/useProductsContext";

const ProductListPage = () => {
  const { products, isError } = useProductsContext();

  return (
    <>
      {isError && <ErrorToast />}
      <ProductListToolBar />
      <ProductCardList products={products} />
    </>
  );
};

export default ProductListPage;
