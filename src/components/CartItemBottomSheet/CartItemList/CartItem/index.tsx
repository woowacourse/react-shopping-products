import * as S from "./CartItem.styled";
import { type SyntheticEvent } from "react";
import defaultImage from "@/assets/images/planet-error.png";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import CartItemQuantityButton from "@/components/Product/Content/List/Item/CardItemButton/Quantity";
import useMutation from "@/hooks/useMutation";
import { deleteCartItem } from "@/apis/cartItems/deleteCartItem";
import useToast from "@/hooks/useToast";
import { useCartItemContext } from "@/contexts/CartItemProvider";

interface CartItemProps extends CartItemType {}

function CartItem({ id, quantity, product }: CartItemProps) {
  const { imageUrl, name, price } = product;
  const { mutate: removeFromCartMutate, isLoading } = useMutation(() =>
    deleteCartItem(id)
  );
  const { refetchCartItems } = useCartItemContext();
  const { addToast } = useToast();

  const removeCartItem = () => {
    removeFromCartMutate(undefined, {
      onSuccess: () => {
        refetchCartItems();
      },
      onError: (error) => {
        addToast({
          type: "error",
          message: error.message,
        });
      },
    });
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultImage;
  };

  return (
    <S.CartItem>
      <S.CartItemImage src={imageUrl} alt={name} onError={handleImageError} />
      <S.CartItemContent>
        <S.CartItemInfo>
          <S.CartItemName>{name}</S.CartItemName>
          <S.CartItemPrice>{price}원</S.CartItemPrice>
        </S.CartItemInfo>
        <CartItemQuantityButton cartItemId={id} quantity={quantity} />
        <S.RemoveCartItemButton
          type="button"
          onClick={removeCartItem}
          disabled={isLoading}
        >
          삭제
        </S.RemoveCartItemButton>
      </S.CartItemContent>
    </S.CartItem>
  );
}

export default CartItem;
