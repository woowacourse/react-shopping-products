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
} from "./CartItem.styled";

interface CartItemProp {
  item: any;
  onDelete: (id: number) => void;
}

const CartItem = ({ item, onDelete }: CartItemProp) => {
  return (
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
          <DeleteButton onClick={() => onDelete(item.id)} />
        </StyledCartItemText>
        <QuantityControls cartItemId={item.id} quantity={item.quantity} />
      </StyledCartItemInfo>
    </StyledCartItem>
  );
};

export default CartItem;
