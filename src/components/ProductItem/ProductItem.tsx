import * as S from './ProductItem.styled';
import AddProductIcon from '../Icon/AddProductIcon';
function ProductItem() {
  return (
    <S.ProductItemContainer>
      <S.ProductItemImage src='https://cdn.jsdelivr.net/gh/bunju20/bunju-blog-images@main/images/CleanShot%202025-05-14%20at%2011.08.33%402x.webp' alt='' />
      <S.ProductItemBottom>
        <S.ProductItemDetailBox>
          <S.ProductName>상품이름</S.ProductName>
          <S.ProductPrice>35,000원</S.ProductPrice>
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
