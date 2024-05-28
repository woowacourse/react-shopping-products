import ErrorToast from "../components/ErrorToast/ErrorToast";
import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";
import ProductListHeader from "../components/ProductListHeader/ProductListHeader";
import * as PLP from "./ProductListPage.style";

const ProductListPage = () => {
  return (
    <>
      <PLP.Top>
        <Header />
        <ErrorToast />
      </PLP.Top>

      <PLP.Body>
        <ProductListHeader />
        <ProductList />
      </PLP.Body>
    </>
  );
};

export default ProductListPage;
