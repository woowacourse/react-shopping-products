import * as S from './Header.styled';
import BagIcon from '../Icon/BagIcon';
import ModalItem from '../ModalItem/ModalItem';
import { useCartItemList } from '../../pages/productListPage/context/useCartContext';
import { Modal } from '@seo_dev/react-modal';
import { useState } from 'react';

function Header() {
  const { cartItemList } = useCartItemList();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <S.HeaderContainer>
      <S.HeaderTitle>SHOP</S.HeaderTitle>
      <S.HeaderIconContainer onClick={() => setIsOpen((prev) => !prev)}>
        <BagIcon />
        {cartItemList.length > 0 && <S.CartBadge data-testid='cart-count'>{cartItemList.length}</S.CartBadge>}
      </S.HeaderIconContainer>
      {isOpen && (
        <Modal onClose={close}>
          <Modal.BackDrop />
          <S.StyledModalContent position='bottom'>
            <S.StyledModalTitle>장바구니</S.StyledModalTitle>
            <S.StyledModalContainer>
              {cartItemList.length === 0 ? (
                <S.NoCartProductText>장바구니에 담긴 상품이 없습니다.</S.NoCartProductText>
              ) : (
                <ul>
                  {cartItemList.map((item) => {
                    const { imageUrl, name, price, id } = item.product;
                    return <ModalItem key={id} itemId={id} imageUrl={imageUrl} name={name} price={price} />;
                  })}
                </ul>
              )}
              <S.productPriceContainer>
                <S.productPriceTitle>총 결제 금액</S.productPriceTitle>
                <S.productAllPrice>
                  {`${cartItemList
                    .reduce((price, item) => {
                      price += item.product.price * item.quantity;
                      return price;
                    }, 0)
                    .toLocaleString()}원`}
                </S.productAllPrice>
              </S.productPriceContainer>
              <S.CloseButton>닫기</S.CloseButton>
            </S.StyledModalContainer>
          </S.StyledModalContent>
        </Modal>
      )}
    </S.HeaderContainer>
  );
}

export default Header;
