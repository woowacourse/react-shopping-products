import PageTitle from "../components/common/PageTitle/PageTitle";
import ProductItemSection from "../components/ProductItemSection/ProductItemSection";
import * as S from "./Product.style";

function Product() {
  return (
    <S.Container>
      <PageTitle>ParanShop 상품 목록</PageTitle>
      <ProductItemSection />
    </S.Container>
  );
}

export default Product;
