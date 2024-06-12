import { formatPrice } from "../../utils/format";
import { DeleteButton } from "../Button";
import { QuantityControls } from "../QuantityControl/QuantityControl";
import * as S from "./CartItem.styled";

interface CartItemProp {
  item: any;
  onDelete: (id: number) => void;
}

const CartItem = ({ item, onDelete }: CartItemProp) => {
  return (
    <S.StyledCartItem key={item.id}>
      <S.StyledCartItemImageContainer>
        <S.StyledCartItemImage src={item.product.imageUrl} alt={item.product.name} />
      </S.StyledCartItemImageContainer>
      <S.StyledCartItemInfo>
        <S.StyledCartItemText>
          <S.StyledCartItemTextWrapper>
            <S.StyledCartItemName>{item.product.name}</S.StyledCartItemName>
            <S.StyledCartItemPrice>{formatPrice(item.product.price)}</S.StyledCartItemPrice>
          </S.StyledCartItemTextWrapper>
          <DeleteButton onClick={() => onDelete(item.id)} />
        </S.StyledCartItemText>
        <QuantityControls cartItemId={item.id} quantity={item.quantity} />
      </S.StyledCartItemInfo>
    </S.StyledCartItem>
  );
};

export default CartItem;
