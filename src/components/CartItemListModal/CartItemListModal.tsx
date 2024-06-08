import useCartItemList from '@/hooks/cartItem/useCartItemList';
import { Modal } from '@pakxe/react-simple-modal';
import CartItem from '../CartItem/CartItem';
import { PriceTable } from '../PriceTable/PriceTable';
import Divider from '../common/Divider/Divider';

type CartItemListModalProps = {
  isOpen: boolean;
  close: () => void;
};

const CartItemListModal = ({ isOpen, close }: CartItemListModalProps) => {
  const { data, getTotalPrice } = useCartItemList();

  return (
    <Modal isOpen={isOpen} close={close} position="bottom" style={{ color: 'black' }}>
      <Modal.Header>
        <Modal.Title>장바구니</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: 'black', maxHeight: '300px', scrollbarWidth: 'none' }}>
        {data?.map((cartItem) => <CartItem {...cartItem} />)}
      </Modal.Body>
      <Modal.Footer>
        <Divider />
        <PriceTable.Row name="총 결제 금액" price={getTotalPrice() ?? 0} />
        <Modal.Button fullWidth text="닫기" onClick={close} />
      </Modal.Footer>
    </Modal>
  );
};

export default CartItemListModal;
