import Icon from "@/components/_common/Icon";
import TextBox from "@/components/_common/TextBox";
import * as S from "@/components/CartActionButton/style";
import { usePostAddCartItemMutation } from "@/hooks/server/useCartItems";

interface CartActionButton {
  productId: number;
}

const CartActionButton = ({ productId }: CartActionButton) => {
  const iconKind = "addCart";
  const buttonText = "담기";

  const addMutation = usePostAddCartItemMutation({ productId, quantity: 1 });

  const onAddToCart = () => {
    addMutation.mutate();
  };

  return (
    <S.ButtonWrapper onClick={onAddToCart}>
      <Icon kind={iconKind} />
      <TextBox text={buttonText} type="xSmall" />
    </S.ButtonWrapper>
  );
};

export default CartActionButton;
