import { useFetchCartItems } from "../../hooks/useFetchCartItems";
import { useRemoveItem } from "../../hooks/useRemoveItem";
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
  const { mutate: removeItem } = useRemoveItem();
  const { cartItems, isError, isLoading } = useFetchCartItems();

  const handleDelete = async (id: number) => {
    removeItem(id);
  };

  const totalAmount = () => {
    return isError || isLoading
      ? 0
      : cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <>
      {!isError &&
        !isLoading &&
        cartItems &&
        cartItems.map((item) => (
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
              <QuantityControls cartItemId={item.id} quantity={item.quantity} />
            </StyledCartItemInfo>
          </StyledCartItem>
        ))}
      <StyledCartTotal>
        <StyledCartTotalTitle>총 결제 금액</StyledCartTotalTitle>
        <StyledCartTotalPrice>{formatPrice(totalAmount())}</StyledCartTotalPrice>
      </StyledCartTotal>
    </>
  );
};
