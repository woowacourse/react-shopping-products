import { Modal } from '@hanuuny/react-modal';
import CartItem from '../CartItem/CartItem';
import { Cart } from '../../types/Cart.type';
import EmptyCart from '../../assets/EmptyCart.png';
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
        <S.Title>장바구니</S.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          <S.CartItemList>
            {cartItems.map((cartItem) => (
              <CartItem cartItem={cartItem} />
            ))}
          </S.CartItemList>
        ) : (
          <S.EmptyCartContainer>
            <img src={EmptyCart} alt="빈 상품 목록" />
            <p>
              표시할 상품이 없습니다.
              <br />
              장바구니에 상품을 추가해 주세요.
            </p>
          </S.EmptyCartContainer>
        )}
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
