import * as S from "./ProductItem.styled";
import AddProductIcon from "../Icon/AddProductIcon";
import { ResponseProduct } from "../../api/types";

function ProductItem({ product }: { product: ResponseProduct }) {
  return (
    <S.ProductItemContainer>
      <S.ProductItemImage src={product.imageUrl} alt={product.name} />
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.ProductItemDetailBox>
        <S.ProductButton>
          <AddProductIcon />
          담기
        </S.ProductButton>
      </S.ProductItemBottom>
    </S.ProductItemContainer>
  );
}

export default ProductItem;
