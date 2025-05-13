import CustomButton from '../../../shared/ui/CustomButton';
import * as S from './ProductCard.styles';

const DUMMY_DATA = {
  image_url: 'https://picsum.photos/seed/picsum/200/300',
  product_name: '상품 이름',
  product_price: 35000,
};

export default function ProductCard() {
  return (
    <S.ProductCardContainer>
      <S.ImageSection
        src={DUMMY_DATA.image_url}
        alt={DUMMY_DATA.product_name}
      ></S.ImageSection>
      <S.ContentSection>
        <S.ProductName>{DUMMY_DATA.product_name}</S.ProductName>
        <S.ProductPrice>{DUMMY_DATA.product_price}</S.ProductPrice>
      </S.ContentSection>
      <S.ButtonSection>
        <CustomButton
          iconUrl="/addCartIcon.svg"
          title="담기"
          onClick={() => {}}
        />
      </S.ButtonSection>
    </S.ProductCardContainer>
  );
}
