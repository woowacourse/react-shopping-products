import Icon from "@/components/_common/Icon";
import TextBox from "@/components/_common/TextBox";
import * as S from "@/components/QuantityButton/CartActionButton/style";
import { usePostAddCartItemMutation } from "@/hooks/server/useCartItems";

interface CartActionButton {
  productId: number;
}

const CartActionButton = ({ productId }: CartActionButton) => {
  const addMutation = usePostAddCartItemMutation({ productId, quantity: 1 });

  const onAddToCart = () => {
    addMutation.mutate();
  };

  return (
    <S.ButtonWrapper onClick={onAddToCart}>
      <Icon kind="addCart" />
      <TextBox text="담기" type="xSmall" />
    </S.ButtonWrapper>
  );
};

export default CartActionButton;
