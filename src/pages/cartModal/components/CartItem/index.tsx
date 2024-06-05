// import CheckBox from "../../_common/CheckBox/CheckBox.tsx";
// import MinusButton from "@/assets/minus-button.svg?react";
// import PlusButton from "@/assets/plus-button.svg?react";
import { CartItems } from "@/types/products.ts";
import * as S from "@/pages/cartModal/components/CartItem/style";
// import { formatToWon } from "@/utils/stringHelper.ts";
// import useSelectedItems from "@/hooks/cart/useSelectedItems.ts";
// import useCartItems from "@/hooks/cart/useCartItems.ts";
import TextBox from "@/components/_common/TextBox/index.tsx";
import QuantityUpdateButton from "@/components/QuantityUpdateButton/index.tsx";
import useHandleCartItem from "@/hooks/useHandleCartItem.ts";
import Button from "@/components/_common/Button";
import { useDeleteCartItemMutation } from "@/hooks/server/useCartItems";
import { theme } from "@/styles/theme";

const formatToWon = (price: number) => {
  return price.toLocaleString();
};

const CartItem = ({ item }: { item: CartItems }) => {
  const { product } = item;
  const { name, imageUrl, price, id } = product;
  const { getQuantityInCart, convertProductIdToCartId } = useHandleCartItem();

  const quantity = getQuantityInCart(id);

  const cartId = convertProductIdToCartId(id);
  const onDeleteCartItemMutation = useDeleteCartItemMutation({ cartId: cartId! });

  const onClickDeleteCartItem = onDeleteCartItemMutation.mutate;

  return (
    <S.ItemWrapper>
      <S.ItemInfoBox>
        <S.ItemImgBox $imageUrl={imageUrl} />
        <S.ItemInfoTextBox>
          <S.FlexBox>
            <>
              <TextBox type="xSmall" text={name} />
              <TextBox type="xLarge" text={formatToWon(price)} />
            </>
            <S.DeleteButton>
              <Button
                borderType={"round"}
                disabled={false}
                backgroundColor={"white"}
                textColor="black"
                position="basic"
                borderColor={theme.COLOR["grey2"]}
                onClick={onClickDeleteCartItem}
                width={40}
                height={24}
              >
                삭제
              </Button>
            </S.DeleteButton>
          </S.FlexBox>
          <QuantityUpdateButton quantity={quantity} cartId={cartId!} />
        </S.ItemInfoTextBox>
      </S.ItemInfoBox>
    </S.ItemWrapper>
  );
};

export default CartItem;
