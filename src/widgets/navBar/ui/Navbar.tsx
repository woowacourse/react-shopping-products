import { useEffect, useState } from 'react';
import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';
import CustomModal from '../../../shared/ui/CustomModal';
import { CartProduct } from '../../../features/products/type/product';
import CartProductCard from '../../../features/cart/ui/CartProductCard';

interface NavbarProps {
  cartProducts: CartProduct[];
  cartTypeQuantity: number;
  errorMessage: string;
  setError: (error: string) => void;
}

export default function Navbar({ cartProducts, cartTypeQuantity, errorMessage, setError }: NavbarProps) {
  const [visibleError, setVisibleError] = useState(errorMessage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cartProducts.reduce((acc, cartProduct) => {
      const quantity = cartProduct.quantity ?? 0;
      return acc + cartProduct.product.price * quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartProducts]);

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
          <S.CartIconButtonContainer onClick={() => setIsModalOpen(true)}>
            <S.CartQuantity>{cartTypeQuantity}</S.CartQuantity>
            <S.CartIcon src='./cartIcon.svg' alt='cart icon' />
          </S.CartIconButtonContainer>
        </S.NavbarContainer>
        {visibleError && <ErrorToast errorMessage={visibleError} />}
      </S.NavbarWrapper>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} position='bottom'>
          <S.ModalContentContainer>
            <S.ModalContentHeader>장바구니</S.ModalContentHeader>
            <S.ModalContentBody>
              {cartProducts.length > 0 ? (
                cartProducts.map((cartProduct) => (
                  <CartProductCard key={cartProduct.id} cartProduct={cartProduct} setError={setError} />
                ))
              ) : (
                <S.ModalEmptyTitle>장바구니에 상품을 담아주세요.</S.ModalEmptyTitle>
              )}
            </S.ModalContentBody>
            <S.ModalTotalPriceContainer>
              <S.ModalTotalPriceLabel>총 결제 금액</S.ModalTotalPriceLabel>
              <S.ModalTotalPrice>{totalPrice.toLocaleString()}원</S.ModalTotalPrice>
            </S.ModalTotalPriceContainer>
          </S.ModalContentContainer>
        </CustomModal>
      )}
    </>
  );
}
