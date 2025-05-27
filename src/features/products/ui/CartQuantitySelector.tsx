import * as S from './CartQuantitySelector.styles';
import { useProductsWithCartContext } from '../../../shared/contexts/productsWithCart/useProductsWithCartContext';
import { useEffect } from 'react';

interface CartQuantitySelectorProps {
  productId: number;
  cartProductId: number;
  cartProductQuantity: number;
  setError: (error: string) => void;
  isProductSoldOut: boolean;
}

export default function CartQuantitySelector({
  productId,
  cartProductId,
  cartProductQuantity,
  setError,
  isProductSoldOut,
}: CartQuantitySelectorProps) {
  const { updateCart } = useProductsWithCartContext();

  useEffect(() => {
    const initializeCart = async () => {
      try {
        if (cartProductId === -1) {
          const newCart = {
            productId: productId,
            cartProductId: cartProductId,
            cartProductQuantity: 1,
          };
          await updateCart(newCart);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error initializing cart product:', error);
          setError('장바구니 초기화 중 오류가 발생했습니다.');
        }
      }
    };

    initializeCart();
  }, []);

  const handleMinusClick = async () => {
    try {
      const nextQuantity = cartProductQuantity > 1 ? cartProductQuantity - 1 : 1;
      const newCart = {
        productId: productId,
        cartProductId: cartProductId,
        cartProductQuantity: nextQuantity,
      };
      await updateCart(newCart);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating cart product:', error);
        setError('장바구니 수량 업데이트 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePlusClick = async () => {
    try {
      const newCart = {
        productId: productId,
        cartProductId: cartProductId,
        cartProductQuantity: cartProductQuantity + 1,
      };
      await updateCart(newCart);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating cart product:', error);
        setError('장바구니 수량 업데이트 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <S.CartQuantityContainer>
      <S.CartQuantitySelectorButton onClick={handleMinusClick}>-</S.CartQuantitySelectorButton>
      <S.CartQuantityNumber>{cartProductQuantity}</S.CartQuantityNumber>
      <S.CartQuantitySelectorButton data-testid='plus-button' onClick={handlePlusClick} disabled={isProductSoldOut}>
        +
      </S.CartQuantitySelectorButton>
    </S.CartQuantityContainer>
  );
}
