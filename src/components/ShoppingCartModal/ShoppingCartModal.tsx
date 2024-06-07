import { Modal } from '@hanuuny/react-modal';
import CartItem from '../CartItem/CartItem';
import { Cart } from '../../types/Cart.type';
import * as S from './ShoppingCartModal.style';

interface ShoppingCartModalProps {
  cartItems: Cart[];
  isOpen: boolean;
  close: () => void;
}

const ShoppingCartModal = ({ cartItems, isOpen, close }: ShoppingCartModalProps) => {
  const totalPrice = cartItems.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);

  return (
    <Modal isOpen={isOpen} close={close} position="bottom">
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <S.CartItemList>
          {cartItems.map((cartItem) => (
            <CartItem cartItem={cartItem} />
          ))}
        </S.CartItemList>
      </Modal.Body>
      <S.PriceContainer>
        <S.PriceTitle>총 결제 금액</S.PriceTitle>
        <S.PriceValue>{totalPrice.toLocaleString()}원</S.PriceValue>
      </S.PriceContainer>
      <Modal.Footer direction="column">
        <Modal.Button text="닫기" onClick={close} />
      </Modal.Footer>
    </Modal>
  );
};

export default ShoppingCartModal;
