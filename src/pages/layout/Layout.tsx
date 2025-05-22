import * as S from './Layout.styles';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import { CartProvider } from '../../context/CartContext';
import { useState } from 'react';
import { ErrorMessageProvider } from '../../context/ErrorMessageContext';
import useCartItems from '../../hooks/useCartItems';
import Modal from '../../components/common/modal/Modal';
import CartItem from '../../components/cartItem/CartItem';
import Button from '../../components/common/button/Button';

const Layout = () => {
  // TODO : 에러메세지 context가 아닌 일반 상태로 관리
  const [errorMessage, setErrorMessage] = useState('');
  const handleErrorMessage = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const { cartItems, handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems } =
    useCartItems({
      handleErrorMessage,
    });

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const handleCartModalOpen = () => {
    setIsCartModalOpen(true);
  };
  const handleCartModalClose = () => {
    setIsCartModalOpen(false);
  };

  return (
    <ErrorMessageProvider errorMessage={errorMessage} handleErrorMessage={handleErrorMessage}>
      <CartProvider
        cartItems={cartItems}
        handleAddCartItems={handleAddCartItems}
        handleRemoveCartItems={handleRemoveCartItems}
        handleUpdateCartItems={handleUpdateCartItems}
      >
        <S.LayoutContainer>
          <Header onCartModalOpen={handleCartModalOpen} />
          <Outlet />

          {isCartModalOpen && (
            <Modal isOpen={isCartModalOpen} onClose={handleCartModalClose} title="장바구니">
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem.product.id}
                  cartItem={cartItem}
                  handleAddCartItems={handleAddCartItems}
                  handleRemoveCartItems={handleRemoveCartItems}
                  handleUpdateCartItems={handleUpdateCartItems}
                />
              ))}
              <Button
                variant="largeBlack"
                name="닫기"
                onClick={handleCartModalClose}
                type="button"
                id="close"
              >
                닫기
              </Button>
            </Modal>
          )}
        </S.LayoutContainer>
      </CartProvider>
    </ErrorMessageProvider>
  );
};

export default Layout;
