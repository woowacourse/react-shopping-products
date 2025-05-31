import { Modal } from "hoyychoi-modal-component";
import CartItemCard from "./CartItemCard";
import QuantitySelector from "../common/QuantitySelector";
import { css } from "@emotion/react";
import Text from "../common/Text";
import Button from "../common/Button/Button";
import { useCartModal } from "../../contexts/CartModalContext";
import useCartItems from "../../hooks/useCartItems";

const CartModal = () => {
  const { isCartModalOpen, handleCartModalClose } = useCartModal();
  const { cartItems, cartItemTotalPrice, handleCartItem } = useCartItems();

  return (
    <Modal show={isCartModalOpen} onHide={handleCartModalClose}>
      <Modal.BackDrop />
      <Modal.Container gap={24} position="bottom">
        <Modal.Header>
          <Modal.Title>장바구니</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div css={CartItemListStyle}>
            {cartItems?.map((cartItem) => {
              const { id, product, quantity } = cartItem;
              return (
                <CartItemCard key={id}>
                  <CartItemCard.Image src={product.imageUrl} alt={product.name} />
                  <CartItemCard.Content>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "3px" }}>
                        <CartItemCard.Title text={product.name} />
                        <CartItemCard.Price price={product.price} />
                      </div>
                      <Button text="삭제" variant="secondary" size="sm" onClick={() => handleCartItem("remove", id)} />
                    </div>
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={() => handleCartItem("update", id, quantity + 1)}
                      onDecrease={() => handleCartItem("update", id, quantity - 1)}
                    />
                  </CartItemCard.Content>
                </CartItemCard>
              );
            })}
          </div>
          <div css={totalPriceStyle}>
            <Text variant="title-2">총 결제 금액</Text>
            <Text variant="title-1">{cartItemTotalPrice?.toLocaleString()}원</Text>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Trigger>
            <Button text="닫기" variant="primary" size="full" />
          </Modal.Trigger>
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
};

export default CartModal;

const CartItemListStyle = css`
  max-height: 250px;
  overflow-y: scroll;
`;

const totalPriceStyle = css`
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px 0 0;
  display: flex;
  justify-content: space-between;
`;
