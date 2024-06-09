import { useContext } from 'react';
import { CartContext } from '../../../CartContext';
import { Product } from '../../../types/fetch';
import AddCartButton from './AddCartButton/AddCartButton';
import * as S from './ProductCard.styled';
import Stepper from './Stepper/Stepper';
import useCartStepper from './Stepper/useCartStepper';
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    addProductToCart,
    cartItems,
    deleteToRemoveCart,
    patchCartItemQuantity,
  } = useContext(CartContext);

  const cartItem = cartItems?.filter(
    (item) => item.product.id === product.id,
  )[0];

  const { handleClickDecrease, handleClickIncrease } = useCartStepper(cartItem);

  return (
    <S.ProductCardContainer>
      <S.ProductImage src={product.imageUrl} />
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
            <AddCartButton
              onClick={() => {
                addProductToCart(product.id);
              }}
            />
          )}
        </S.ButtonContainer>
      </S.ContentWrapper>
    </S.ProductCardContainer>
  );
};

export default ProductCard;
