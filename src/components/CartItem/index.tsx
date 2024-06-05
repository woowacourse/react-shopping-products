// import CheckBox from "../../_common/CheckBox/CheckBox.tsx";
// import MinusButton from "@/assets/minus-button.svg?react";
// import PlusButton from "@/assets/plus-button.svg?react";
import { CartItems } from "@/types/products.ts";
import * as S from "@/components/CartItem/style.ts";
// import { formatToWon } from "@/utils/stringHelper.ts";
// import useSelectedItems from "@/hooks/cart/useSelectedItems.ts";
// import useCartItems from "@/hooks/cart/useCartItems.ts";
import TextBox from "@/components/_common/TextBox/index.tsx";
import QuantityUpdateButton from "@/components/QuantityUpdateButton/index.tsx";
import useHandleCartItem from "@/hooks/useHandleCartItem.ts";

const formatToWon = (price: number) => {
  return price.toLocaleString();
};

const CartItem = ({ item }: { item: CartItems }) => {
  const { product } = item;
  const { name, imageUrl, price, id } = product;
  const { getQuantityInCart, convertProductIdToCartId } = useHandleCartItem();

  const quantity = getQuantityInCart(id);

  const cartId = convertProductIdToCartId(id);

  // const { isItemSelected, onDeleteFromSelectedItems, onAddToSelectedItems } = useSelectedItems();

  // const { deleteCartItem } = useCartItems();

  // const onClickRemoveItem = async () => {
  //   deleteCartItem(item.id);
  // };

  // const onClickCheckBox = () => {
  //   isItemSelected(item.id) ? onDeleteFromSelectedItems(item.id) : onAddToSelectedItems(item.id);
  // };

  return (
    <S.ItemWrapper>
      <S.ItemInfoBox>
        <S.ItemImgBox $imageUrl={imageUrl} />
        <S.ItemInfoTextBox>
          <S.FlexBox>
            <TextBox type="xSmall" text={name} />
            <TextBox type="xLarge" text={formatToWon(price)} />
          </S.FlexBox>
          <QuantityUpdateButton quantity={quantity} cartId={cartId!} />
        </S.ItemInfoTextBox>
      </S.ItemInfoBox>
    </S.ItemWrapper>
  );
};

export default CartItem;
