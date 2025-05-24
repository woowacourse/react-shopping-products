import { Modal } from "hoyychoi-modal-component";
import CartItemCard from "./CartItemCard";
import QuantitySelector from "../common/QuantitySelector";
import { css } from "@emotion/react";
import Text from "../common/Text";

interface CartModalProps {
  isCartModalOpen: boolean;
  handleCartModalClose: () => void;
}

const CartModal = ({ isCartModalOpen, handleCartModalClose }: CartModalProps) => {
  const { imageUrl, name, price, quantity } = {
    name: "에어포스1",
    price: 100000,
    imageUrl:
      "https://kream-phinf.pstatic.net/MjAyNTA1MTNfMjI5/MDAxNzQ3MTA4MjUzOTg4.106G0-WfVU8g8ziNKgKJjc1_UXvF-2IatsA-Cz5mG1og.etXRFVPYqcs5J9HAfXpaHFPFHorGnZU4Nl7k4368rfog.PNG/a_090d2310040b4f9ca922f2498ae8ae3a.png?type=l",
    quantity: 0,
  };

  return (
    <Modal show={isCartModalOpen} onHide={handleCartModalClose}>
      <Modal.BackDrop />
      <Modal.Container gap={24} position="bottom">
        <Modal.Header>
          <Modal.Title>장바구니</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "250px", overflowY: "scroll" }}>
            <CartItemCard>
              <CartItemCard.Image src={imageUrl} alt={name} />
              <CartItemCard.Content>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "3px" }}>
                    <CartItemCard.Title text={name} />
                    <CartItemCard.Price price={price} />
                  </div>
                  <button>삭제</button>
                </div>
                <QuantitySelector quantity={quantity} onIncrease={() => {}} onDecrease={() => {}} />
              </CartItemCard.Content>
            </CartItemCard>
            <CartItemCard>
              <CartItemCard.Image src={imageUrl} alt={name} />
              <CartItemCard.Content>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "3px" }}>
                    <CartItemCard.Title text={name} />
                    <CartItemCard.Price price={price} />
                  </div>
                  <button>삭제</button>
                </div>
                <QuantitySelector quantity={quantity} onIncrease={() => {}} onDecrease={() => {}} />
              </CartItemCard.Content>
            </CartItemCard>
            <CartItemCard>
              <CartItemCard.Image src={imageUrl} alt={name} />
              <CartItemCard.Content>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "3px" }}>
                    <CartItemCard.Title text={name} />
                    <CartItemCard.Price price={price} />
                  </div>
                  <button>삭제</button>
                </div>
                <QuantitySelector quantity={quantity} onIncrease={() => {}} onDecrease={() => {}} />
              </CartItemCard.Content>
            </CartItemCard>
            <CartItemCard>
              <CartItemCard.Image src={imageUrl} alt={name} />
              <CartItemCard.Content>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "3px" }}>
                    <CartItemCard.Title text={name} />
                    <CartItemCard.Price price={price} />
                  </div>
                  <button>삭제</button>
                </div>
                <QuantitySelector quantity={quantity} onIncrease={() => {}} onDecrease={() => {}} />
              </CartItemCard.Content>
            </CartItemCard>
          </div>

          <div css={totalPriceStyle}>
            <Text variant="title-2">총 결제 금액</Text>
            <Text variant="title-1">{price.toLocaleString()}원</Text>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Trigger>
            <Modal.Button style={{ width: "100%" }}>닫기</Modal.Button>
          </Modal.Trigger>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
};

export default CartModal;

const totalPriceStyle = css`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0 0;
  display: flex;
  justify-content: space-between;
`;
