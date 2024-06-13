import Counter from "../../../Counter/Counter";
import * as CI from "./CartItem.style";
import useCartItemQuery from "../../../../hooks/useCartItemMutation";

interface CartItemProps {
  cartItem: CartItem;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const {
    handleDecreaseQuantityButtonClick,
    handleIncreaseQuantityButtonClick,
    handleRemoveItemButtonClick,
  } = useCartItemQuery();

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
          <Counter
            count={cartItem.quantity}
            decrease={() => handleDecreaseQuantityButtonClick(cartItem)}
            increase={() => handleIncreaseQuantityButtonClick(cartItem)}
          />
        </CI.ItemDetails>
      </CI.ItemInfoSection>
      <div>
        <CI.RemoveButton onClick={() => handleRemoveItemButtonClick(cartItem)}>
          삭제
        </CI.RemoveButton>
      </div>
    </CI.CartItem>
  );
};

export default CartItem;
