import Counter from "../../../Counter/Counter";
import * as CI from "./CartItem.style";

interface CartItemProps {
  cartItem: CartItem;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  return (
    <CI.CartItem>
      <CI.ItemInfoSection>
        <CI.ItemImage
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
        />
        <CI.ItemDetails>
          <CI.ItemName>{cartItem.product.name}</CI.ItemName>
          <CI.ItemPrice>
            {cartItem.product.price.toLocaleString()}원
          </CI.ItemPrice>
          <Counter count={1} decrease={() => {}} increase={() => {}} />
        </CI.ItemDetails>
      </CI.ItemInfoSection>
      <CI.ItemButtonSection>
        <CI.RemoveButton>삭제</CI.RemoveButton>
      </CI.ItemButtonSection>
    </CI.CartItem>
  );
};

export default CartItem;
