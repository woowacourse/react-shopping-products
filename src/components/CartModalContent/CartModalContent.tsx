import { useCart } from "../../context/cartContext";
import { useChangeCartItemQuantity } from "../../hooks";
import { formatPrice } from "../../utils/format";
import { DeleteButton } from "../Button";
import { QuantityControls } from "../QuantityControl/QuantityControl";
import {
  StyledCartItem,
  StyledCartItemImage,
  StyledCartItemImageContainer,
  StyledCartItemInfo,
  StyledCartItemName,
  StyledCartItemPrice,
  StyledCartItemText,
  StyledCartItemTextWrapper,
  StyledCartTotal,
  StyledCartTotalPrice,
  StyledCartTotalTitle,
} from "./CartModalContent.styled";

export const CartModalContent = () => {
  const { cartItems, removeCartItem, updateCartItemQuantity } = useCart();
  const { incrementQuantity, decrementQuantity } = useChangeCartItemQuantity();

  const handleIncrement = async (id: number, quantity: number) => {
    await incrementQuantity({ id, quantity });
    updateCartItemQuantity(id, quantity + 1);
  };

  const handleDecrement = async (id: number, quantity: number) => {
    if (quantity - 1 <= 0) {
      await removeCartItem(id);
    } else {
      await decrementQuantity({ id, quantity });
      updateCartItemQuantity(id, quantity - 1);
    }
  };

  const handleDelete = async (id: number) => {
    await removeCartItem(id);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <>
      {cartItems.map((item) => (
        <StyledCartItem key={item.id}>
          <StyledCartItemImageContainer>
            <StyledCartItemImage src={item.product.imageUrl} alt={item.product.name} />
          </StyledCartItemImageContainer>
          <StyledCartItemInfo>
            <StyledCartItemText>
              <StyledCartItemTextWrapper>
                <StyledCartItemName>{item.product.name}</StyledCartItemName>
                <StyledCartItemPrice>{formatPrice(item.product.price)}</StyledCartItemPrice>
              </StyledCartItemTextWrapper>
              <DeleteButton onClick={() => handleDelete(item.id)} />
            </StyledCartItemText>
            <QuantityControls
              quantity={item.quantity}
              onIncrement={() => handleIncrement(item.id, item.quantity)}
              onDecrement={() => handleDecrement(item.id, item.quantity)}
            />
          </StyledCartItemInfo>
        </StyledCartItem>
      ))}

      <StyledCartTotal>
        <StyledCartTotalTitle>총 결제 금액</StyledCartTotalTitle>
        <StyledCartTotalPrice>{formatPrice(totalAmount)}</StyledCartTotalPrice>
      </StyledCartTotal>
    </>
  );
};
