import AddToCart from "../../icons/AddToCart";
import LoadingDots from "../../common/LoadingDots";

import S from "./StyledComponent";
import ProductControls from "../../domain/ProductControls";
import useFindCartItem from "../../../hooks/useFindCartItem";
import useToggleCartItem from "../../../hooks/useToggleCartItem";

interface ToggleItemButtonProps {
  productId: number;
}

const ToggleItemButton = ({ productId }: ToggleItemButtonProps) => {
  const { isLoading, addToCart, addMutation } = useToggleCartItem();
  const cartItem = useFindCartItem({ productId });

  return (
    <S.ToggleItemContainer>
      {isLoading || addMutation.isPending ? (
        <LoadingDots type={"black"} />
      ) : cartItem ? (
        <ProductControls cartItem={cartItem} />
      ) : (
        <S.ToggleItemButton onClick={() => addToCart(productId)} isSelected={false}>
          <AddToCart />
          담기
        </S.ToggleItemButton>
      )}
    </S.ToggleItemContainer>
  );
};

export default ToggleItemButton;
