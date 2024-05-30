import PageTitle from "../components/common/PageTitle/PageTitle";
import ProductItemSection from "../components/ProductItemSection/ProductItemSection";
import * as S from "./Product.style";
interface ProductProps {
  onError: (error: string) => void;
}

function Product({ onError }: ProductProps) {
  return (
    <S.Container>
      <PageTitle>ParanShop 상품 목록</PageTitle>
      <ProductItemSection onError={onError} />
    </S.Container>
  );
}

export default Product;
