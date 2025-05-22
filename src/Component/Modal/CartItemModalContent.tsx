import { Modal } from '.';
import styled from '@emotion/styled';
import ProductListItem from '../Product/ProductListItem';
import { CartItemTypes } from '../../types/CartItemType';

interface CartItemModalContentProps {
  cartItems: CartItemTypes[];
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  updateErrorMessage: (errorMessage: string) => void;
  checkMax: () => boolean;
}

export default function CartItemModalContent({
  cartItems,
  updateCartItems,
  getMatchCartItem,
  updateErrorMessage,
  checkMax,
}: CartItemModalContentProps) {
  const totalPrice = cartItems.reduce(
    (a, b) => a + b.product.price * b.quantity,
    0
  );

  return (
    <Modal.Container>
      <Modal.Overlay />
      <Modal.Content position="bottom">
        <Modal.Title>장바구니</Modal.Title>
        <Modal.Body>
          <StyledUl>
            {cartItems.map((item) => (
              <StyledLi>
                <DeleteButton>삭제</DeleteButton>
                <ProductListItem
                  {...item.product}
                  isRow={true}
                  getMatchCartItem={getMatchCartItem}
                  updateCartItems={updateCartItems}
                  checkMax={checkMax}
                  updateErrorMessage={updateErrorMessage}
                />
              </StyledLi>
            ))}
          </StyledUl>
          <PriceTextWrapper>
            <PriceInfoText>총 결제 금액</PriceInfoText>
            <TotalPriceText>{totalPrice.toLocaleString('ko')}원</TotalPriceText>
          </PriceTextWrapper>
        </Modal.Body>
        <Modal.CancelButton />
      </Modal.Content>
    </Modal.Container>
  );
}

const PriceTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
`;

const PriceInfoText = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

const TotalPriceText = styled.span`
  font-weight: 700;
  font-size: 24px;
`;

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  max-height: 70vh;
  overflow-y: auto;
`;

const StyledLi = styled.li`
  padding: 16px 0px;
  box-sizing: border-box;
  border-top: 1px solid #0000001a;

  &:last-child {
    border-bottom: 1px solid #0000001a;
  }
`;

const DeleteButton = styled.button`
  float: right;
  border: 1px solid #0000001a;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
`;
