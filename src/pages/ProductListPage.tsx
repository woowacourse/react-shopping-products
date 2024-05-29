import ErrorToast from "../components/ErrorToast/ErrorToast";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";
import ProductListHeader from "../components/ProductListHeader/ProductListHeader";
import * as PLP from "./ProductListPage.style";
import useProducts from "../hooks/useProducts";

const ProductListPage = () => {
  const { products } = useProducts();

  return (
    <>
      <PLP.Top>
        <Header cartCount={1} />
        <ErrorToast />
      </PLP.Top>

      <PLP.Body>
        <ProductListHeader />
        <ProductList products={products} />
      </PLP.Body>
    </>
  );
};

export default ProductListPage;
