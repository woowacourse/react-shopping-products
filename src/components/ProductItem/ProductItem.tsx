import { Product } from '../../types/Product.type';
import AddCart from '../../assets/AddCart.svg';
import Button from '../Button/Button';
import * as S from './ProductItem.style';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { name, price, imageUrl } = product;

  return (
    <S.Layout>
      <S.ImageWrapper src={imageUrl} alt={name} />
      <S.Container>
        <S.TextContainer>
          <h1>{name}</h1>
          <p>상품 설명</p>
          <p>{price}원</p>
        </S.TextContainer>
        <S.CartButtonContainer>
          <Button>
            <img src={AddCart} alt="장바구니 담기" />
            <p>담기</p>
          </Button>
        </S.CartButtonContainer>
      </S.Container>
    </S.Layout>
  );
};

export default ProductItem;
