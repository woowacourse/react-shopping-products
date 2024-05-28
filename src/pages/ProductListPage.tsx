import Header from "../components/Header/Header";
import ProductList from "../components/ProductList/ProductList";
import ProductListHeader from "../components/ProductListHeader/ProductListHeader";
import { ProductListPageStyle } from "./ProductListPage.style";

const ProductListPage = () => {
  return (
    <>
      <Header />
      <ProductListPageStyle>
        <ProductListHeader />
        <ProductList />
      </ProductListPageStyle>
    </>
  );
};

export default ProductListPage;
