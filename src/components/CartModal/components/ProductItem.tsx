import QuantitySelector from "../../@common/QuantitySelector/QuantitySelector";
import * as S from "./ProductItem.styles";

const ProductItem = () => {
  return (
    <S.ProductItem>
      <S.ProductImage $url="" />
      <S.ProductWrapper>
        <S.ProductInfo>
          <S.ProductName>상품 이름</S.ProductName>
          <S.ProductPrice>35,000원</S.ProductPrice>
          <QuantitySelector
            quantity={3}
            onIncrease={() => {}}
            onDecrease={() => {}}
          />
        </S.ProductInfo>
        <S.DeleteButton>삭제</S.DeleteButton>
      </S.ProductWrapper>
    </S.ProductItem>
  );
};

export default ProductItem;
