import { useCallback, useContext } from 'react';
import { CartContext } from '../../../CartContext';
import { Product } from '../../../types/fetch';
import AddCartButton from './AddCartButton/AddCartButton';
import * as S from './ProductCard.styled';
import Stepper from './Stepper/RoundButtonWithImg';
import useCounter from './Stepper/useCounter';
import { patchCartQuantity } from '../../../api/carts';
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const {
    addProductToCart,
    cartItems,
    deleteToRemoveCart: patchToRemoveCart,
    patchCartItemQuantity,
  } = useContext(CartContext);

  const productIdSetInCart = new Set(cartItems?.map((item) => item.product.id));
  const cartItem = cartItems?.filter(
    (item) => item.product.id === product.id,
  )[0];
  const cartId = cartItem?.id;

  const handleClickDecrease = useCallback(() => {
    if (!cartItem) return;

    if (cartItem.quantity === 1) {
      patchToRemoveCart(product.id);
      return;
    }

    patchCartItemQuantity({
      cartId: cartItem.id,
      quantity: cartItem.quantity - 1,
    });
  }, [cartItem]);

  const handleClickIncrease = useCallback(() => {
    if (!cartItem) return;
    patchCartItemQuantity({
      cartId: cartItem.id,
      quantity: cartItem.quantity + 1,
    });
  }, [cartItem]);
  return (
    <S.ProductCardContainer>
      <S.ProductImage src={product.imageUrl} />
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.InfoWrapper>

        <S.ButtonContainer>
          {productIdSetInCart.has(product.id) && cartItem ? (
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
