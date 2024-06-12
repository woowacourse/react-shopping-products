import { useContext } from 'react';
import { CartContext } from '../../../CartContext';
import noImageUrl from '../../../assets/NoProductImage.png';
import { Product } from '../../../types/fetch';
import Stepper from '../../common/Stepper/Stepper';
import useCartStepper from '../../common/Stepper/useCartStepper';
import AddCartButton from './AddCartButton/AddCartButton';
import * as S from './ProductCard.styled';
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addProductToCart, cartItems } = useContext(CartContext);

  const cartItem = cartItems?.find((item) => item.product.id === product.id);

  const { handleClickDecrease, handleClickIncrease } = useCartStepper(cartItem);
  ('https://');
  const imageUrl = product.imageUrl.startsWith('https://') ? product.imageUrl : noImageUrl;
  return (
    <S.ProductCardContainer>
      <S.ProductImage src={imageUrl} />
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.InfoWrapper>

        <S.ButtonContainer>
          {cartItem ? (
            <Stepper.Horizontal>
              <Stepper.MinusButton onClick={handleClickDecrease} />
              <Stepper.DisplayCounter count={cartItem.quantity} />
              <Stepper.PlusButton onClick={handleClickIncrease} />
            </Stepper.Horizontal>
          ) : (
            <AddCartButton onClick={() => addProductToCart(product.id)} />
          )}
        </S.ButtonContainer>
      </S.ContentWrapper>
    </S.ProductCardContainer>
  );
};

export default ProductCard;
