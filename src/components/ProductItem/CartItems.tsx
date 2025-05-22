import styled from "@emotion/styled";
import { CartItem } from "../../types/productType";
import QuantityAdjuster from "./QuantityAdjuster";
import CartActionButton from "./button/CartActionButton";

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "./nullImage.png";
};

const CartItems = ({ cart }: { cart: CartItem[] }) => {
  return (
    <>
      {cart.map((cart) => (
        <CartItemContainer key={cart.product.name}>
          <CartItemImage
            src={cart.product.imageUrl}
            alt={cart.product.name}
            onError={handleImageError}
          />
          <CartItemDescription>
            <CartItemNameText>{cart.product.name}</CartItemNameText>
            <PriceText>{cart.product.price.toLocaleString()}원</PriceText>
            <QuantityAdjuster count={cart.quantity} />
          </CartItemDescription>
          <DeleteButtonContainer>
            <CartActionButton variant="remove" onClick={() => {}} />
          </DeleteButtonContainer>
        </CartItemContainer>
      ))}

      <TotalAmountContainer>
        <TotalAmountText>총 결제 금액</TotalAmountText>
        <TotalAmount>95,000</TotalAmount>
      </TotalAmountContainer>
    </>
  );
};

const CartItemContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const CartItemImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 10px;
  object-fit: cover;
`;

const CartItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TotalAmountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalAmountText = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const CartItemNameText = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const PriceText = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

const TotalAmount = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const DeleteButtonContainer = styled.div`
  margin-left: auto;
`;

export default CartItems;
