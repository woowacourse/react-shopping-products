import { useEffect, useState } from 'react';
import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';
import { useTempCartContext } from '../../../features/cart/contexts/useTempCartContext';
import { useProductsWithCartContext } from '../../../shared/contexts/productsWithCart/useProductsWithCartContext';
import CustomModal from '../../../shared/ui/CustomModal';

interface NavbarProps {
  cartTypeQuantity: number;
  errorMessage: string;
  setErrors: (error: string) => void;
}

export default function Navbar({ cartTypeQuantity, errorMessage, setErrors }: NavbarProps) {
  const [visibleError, setVisibleError] = useState(errorMessage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { tempCart } = useTempCartContext();
  const { updateCart } = useProductsWithCartContext();

  const handleCartUpdate = async () => {
    setIsModalOpen(true);

    try {
      const updateTasks = tempCart.map((cartProduct) => {
        const newCart = {
          productId: cartProduct.productId,
          cartProductId: cartProduct.cartProductId,
          cartProductQuantity: cartProduct.cartProductQuantity,
        };
        return updateCart(newCart);
      });

      await Promise.all(updateTasks);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating cart:', error);
        setErrors('장바구니 업데이트 중 오류가 발생했습니다.');
        setIsModalOpen(false);
      }
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setVisibleError(errorMessage);
      const timer = setTimeout(() => {
        setVisibleError('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <>
      <S.NavbarWrapper>
        <S.NavbarContainer>
          <S.Logo>SHOP</S.Logo>
          <S.CartIconButtonContainer onClick={handleCartUpdate}>
            <S.CartQuantity>{cartTypeQuantity}</S.CartQuantity>
            <S.CartIcon src='./cartIcon.svg' alt='cart icon' />
          </S.CartIconButtonContainer>
        </S.NavbarContainer>
        {visibleError && <ErrorToast errorMessage={visibleError} />}
      </S.NavbarWrapper>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} position='bottom'>
          <div>
            <h2>장바구니 업데이트 중...</h2>
          </div>
        </CustomModal>
      )}
    </>
  );
}
