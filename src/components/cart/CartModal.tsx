import styled from '@emotion/styled';
import Flex from '../commons/Flex';
import Modal from '../Modal';
import ProductItemModalCard from '../ProductItem/ProductItemModalCard';
import CartTotalAmount from './CartTotalAmount';
import useCartItems from '../../hooks/useCartItems';

type CartModalProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const CartModal = ({ isModalOpen, handleCloseModal }: CartModalProps) => {
  const { cartItems } = useCartItems();
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      position="bottom"
      size="small"
    >
      <Modal.Title title="장바구니"></Modal.Title>
      <Modal.Contents>
        <Flex flexDirection="column">
          <Divider />
          {cartItems.map((cartItem) => (
            <>
              <ProductItemModalCard
                key={cartItem.id}
                product={cartItem.product}
              />
              <Divider />
            </>
          ))}
          <CartTotalAmount />
        </Flex>
      </Modal.Contents>
      <Modal.Button
        title="닫기"
        backgroundColor="black"
        textColor="white"
        onClick={handleCloseModal}
      />
    </Modal>
  );
};

export default CartModal;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 16px 0;
`;
