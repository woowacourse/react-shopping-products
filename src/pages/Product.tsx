import Dropdown from "../components/common/Dropdown/Dropdown";
import PageTitle from "../components/common/PageTitle/PageTitle";
import ProductItemList from "../components/ProductItemList/ProductItemList";
import * as S from "./Product.style";

function Product() {
  return (
    <S.Container>
      <PageTitle>ParanShop 상품 목록</PageTitle>
      <Dropdown />
      <ProductItemList></ProductItemList>
    </S.Container>
  );
}

export default Product;
