import ProductCardList from "../components/ProductCardList";
import ProductListToolBar from "../components/ProductListToolBar";
import { useProductsContext } from "../contexts/useProductsContext";

const ProductListPage = () => {
  const { products } = useProductsContext();

  return (
    <>
      <ProductListToolBar />
      <ProductCardList products={products} />
    </>
  );
};

export default ProductListPage;
