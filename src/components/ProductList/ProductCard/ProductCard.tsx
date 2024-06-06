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
  const { addProductToCart, patchToRemoveCart } = useContext(CartContext);
  const counterState = useCounter(0);

  const newCounterState = Object.assign(counterState, {
    increase: () => {
      addProductToCart(product.id);
      counterState.increase();
    },
    decrease: () => {
      if (counterState.counter == 1) {
        patchToRemoveCart(product.id);
      }
      counterState.decrease();
    },
  });

  return (
    <S.ProductCardContainer>
      <S.ProductImage src={product.imageUrl} />
      <S.ContentWrapper>
        <S.InfoWrapper>
          <S.ProductName>{product.name}</S.ProductName>
          <S.ProductPrice>{product.price.toLocaleString()}원</S.ProductPrice>
        </S.InfoWrapper>

        <S.ButtonContainer>
          {counterState.counter > 0 ? (
            <Stepper counterState={newCounterState}>
              <Stepper.Layout.Horizontal>
                <Stepper.MinusButton />
                <Stepper.DisplayCounter />
                <Stepper.PlusButton />
              </Stepper.Layout.Horizontal>
            </Stepper>
          ) : (
            <AddCartButton
              onClick={() => {
                addProductToCart(product.id);
                counterState.increase();
              }}
            />
          )}
        </S.ButtonContainer>
      </S.ContentWrapper>
    </S.ProductCardContainer>
  );
};

export default ProductCard;
