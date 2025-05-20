import { useEffect, useState } from 'react';
import ErrorToast from '../../../shared/ui/ErrorToast';
import * as S from './Navbar.styles';
import { useTempCartContext } from '../../../features/cart/contexts/useTempCartContext';
import { useProductsWithCartContext } from '../../../shared/contexts/productsWithCart/useProductsWithCartContext';
import CustomModal from '../../../shared/ui/CustomModal';
import { CartProduct } from '../../../features/products/type/product';
import CartProductCard from '../../../features/cart/ui/CartProductCard';

interface NavbarProps {
  cartProducts: CartProduct[];
  cartTypeQuantity: number;
  errorMessage: string;
  setErrors: (error: string) => void;
}

export default function Navbar({ cartProducts, cartTypeQuantity, errorMessage, setErrors }: NavbarProps) {
  const [visibleError, setVisibleError] = useState(errorMessage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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
          <S.CartIconButtonContainer onClick={handleCartUpdate}>
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
                cartProducts.map((cartProduct) => <CartProductCard key={cartProduct.id} cartProduct={cartProduct} />)
              ) : (
                <div>장바구니에 상품을 담아주세요.</div>
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
