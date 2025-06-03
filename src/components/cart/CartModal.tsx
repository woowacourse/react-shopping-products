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
          <Layout>
            <CartItemsContainer>
              <Divider />
              {cartItems.map((cartItem) => (
                <div key={cartItem.id}>
                  <ProductItemModalCard product={cartItem.product} />
                  <Divider />
                </div>
              ))}
            </CartItemsContainer>
            <CartTotalAmount />
            <Modal.Button
              title="닫기"
              backgroundColor="black"
              textColor="white"
              onClick={handleCloseModal}
            />
          </Layout>
        </Flex>
      </Modal.Contents>
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

const Layout = styled.div`
  max-height: 95%;
`;

const CartItemsContainer = styled.div`
  max-height: 85%;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE & Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;
