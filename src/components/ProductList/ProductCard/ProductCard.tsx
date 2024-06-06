import { useContext } from 'react';
import { CartContext } from '../../../CartContext';
import { Product } from '../../../types/fetch';
import AddCartButton from './AddCartButton/AddCartButton';
import * as S from './ProductCard.styled';
import Stepper from './Stepper/RoundButtonWithImg';
import useCounter from './Stepper/useCounter';
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addProductToCart, productIdSetInCart, patchToRemoveCart } =
    useContext(CartContext);
  const { count, increase, decrease } = useCounter(0);

  const handleClickDecrease = () => {
    if (count === 1) {
      patchToRemoveCart(product.id);
      return;
    }
    // 카트아이템갯수 감소 API 필요
    decrease();
  };
  const handleClickIncrease = () => {
    // 카트 아이템 갯수 증가 API 필요
    increase();
  };
  return (
    <S.ProductCardContainer>
      <S.ProductImage src={product.imageUrl} />
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.InfoWrapper>

        <S.ButtonContainer>
          {productIdSetInCart.has(product.id) || count === 0 ? (
            <Stepper.Horizontal>
              <Stepper.MinusButton onClick={() => {}} />
              <Stepper.DisplayCounter count={count} />
              <Stepper.PlusButton onClick={() => {}} />
            </Stepper.Horizontal>
          ) : (
            <AddCartButton
              onClick={() => {
                addProductToCart(product.id);
                increase();
              }}
            />
          )}
        </S.ButtonContainer>
      </S.ContentWrapper>
    </S.ProductCardContainer>
  );
};

export default ProductCard;
