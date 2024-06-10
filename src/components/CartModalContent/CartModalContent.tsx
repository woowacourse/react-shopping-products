import { removeCartItem } from "../../api/cart";
import { useCart } from "../../context/cartContext";
import { useChangeCartItemQuantity } from "../../hooks";
import { formatPrice } from "../../utils/format";
import { DeleteButton } from "../Button";
import { QuantityControls } from "../QuantityControl/QuantityControl";
import {
  StyledCartItem,
  StyledCartItemActions,
  StyledCartItemDeleteButton,
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
  const { cartItems, fetchCartItems } = useCart();
  const { incrementQuantity, decrementQuantity } = useChangeCartItemQuantity();

  const handleIncrement = async (id: number, quantity: number) => {
    await incrementQuantity({ id, quantity });
    fetchCartItems();
  };

  const handleDecrement = async (id: number, quantity: number) => {
    await decrementQuantity({ id, quantity });
    fetchCartItems();
  };

  const handleDelete = async (id: number) => {
    await removeCartItem(id);
    fetchCartItems();
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
