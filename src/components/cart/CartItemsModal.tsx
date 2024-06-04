import { Modal, useModalAction } from "easy-payments-ui";

import styled from "@emotion/styled";
import COLOR_PALETTE from "../../style/colorPalette";

const Container = styled.div`
  box-sizing: border-box;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CartItemContainer = styled.div`
  display: flex;
  gap: 10px;

  padding-bottom: 24px;
  margin-top: 8px;
  border-bottom: 1px solid gray;
`;

const ProductDetailContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductImage = styled.img`
  width: 80px;
  aspect-ratio: 1/1;
`;

const ProductDetail = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;

const NamePrice = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const Price = styled.span`
  font-size: 14px;
`;

const DeleteButton = styled.button`
  padding: 4px 5px;

  font-size: 15px;
  height: 24px;
`;

const ProductControls = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 24px;
  aspect-ratio: 1/1;
  font-size: 16px;
`;

const Quantity = styled.span`
  width: 40px;
  text-align: center;
  font-size: 16px;
`;

function CartItem({ product }) {
  return (
    <CartItemContainer>
      <ProductImage src="https://via.placeholder.com/80" alt={product.name} />
      <ProductDetailContainer>
        <ProductDetail>
          <NamePrice>
            <Name>{product.name}</Name>
            <Price>{`${product.price.toLocaleString()}원`}</Price>
          </NamePrice>
          <DeleteButton
            onClick={() => {
              /*TODO: 삭제 버튼 */
            }}
          >
            삭제
          </DeleteButton>
        </ProductDetail>
        <ProductControls>
          <Button
            onClick={() => {
              /*TODO: 수량 감소 */
            }}
          >
            -
          </Button>
          <Quantity>{product.quantity}</Quantity>
          <Button
            onClick={() => {
              /*TODO: 수량 증가*/
            }}
          >
            +
          </Button>
        </ProductControls>
      </ProductDetailContainer>
    </CartItemContainer>
  );
}

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-weight: 700;
`;

const TotalLabel = styled.div`
  font-size: 16px;
`;
const TotalPrice = styled.div`
  font-size: 24px;
`;

const CartItemsModal = () => {
  const items = [
    { id: 1, name: "상품 이름", price: 35000, quantity: 2 },
    { id: 2, name: "상품 이름", price: 25000, quantity: 1 },
  ];

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const { handleClose } = useModalAction();

  return (
    <Modal title="장바구니" position="bottom" theme="light" confirmMessage="닫기" onConfirm={handleClose}>
      <Container>
        {items.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
        <Total>
          <TotalLabel>총 결제 금액</TotalLabel>
          <TotalPrice>{total.toLocaleString()}원</TotalPrice>
        </Total>
      </Container>
    </Modal>
  );
};

export default CartItemsModal;
