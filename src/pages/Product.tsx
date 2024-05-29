
import PageTitle from "../components/common/PageTitle/PageTitle";
import DropdownContainer from "../components/DropdownContainer/DropdownContainer";
import ProductItemList from "../components/ProductItemList/ProductItemList";
import * as S from "./Product.style";

function Product() {
  return (
    <S.Container>
      <PageTitle>ParanShop 상품 목록</PageTitle>
      <DropdownContainer />
      <ProductItemList></ProductItemList>
    </S.Container>
  );
}

export default Product;
