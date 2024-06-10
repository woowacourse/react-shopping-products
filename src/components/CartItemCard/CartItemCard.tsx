import Button from '../common/Button/Button';
import Divider from '../common/Divider/Divider';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';
import { CartItem } from '../../types/type';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';
import usePatchCartItem from '../../hooks/usePatchCartItem';

import * as S from './CartItemCard.style';

interface CartItemProps {
  cartItem: CartItem;
}

function CartItemCard({ cartItem }: CartItemProps) {
  const { quantity } = cartItem;

  // TODO: ProductItem과 공통 로직 별도 hook으로 분리해볼까
  const deleteCartItemMutation = useDeleteCartItem();
  const patchCartItemMutation = usePatchCartItem();

  const handleDeleteCartItem = () => {
    deleteCartItemMutation.mutate({ cartItemId: cartItem.id });
  };

  const handleIncreaseQuantity = () => {
    patchCartItemMutation.mutate({
      cartItemId: cartItem.id,
      quantity: quantity + 1,
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      deleteCartItemMutation.mutate({ cartItemId: cartItem.id });
    } else {
      patchCartItemMutation.mutate({
        cartItemId: cartItem.id,
        quantity: quantity - 1,
      });
    }
  };

  return (
    <S.CartItem>
      <Divider />
      <S.ItemBody>
        <S.ImageWrapper>
          <S.Image src={cartItem.product.imageUrl} />
        </S.ImageWrapper>
        <S.ItemDetail>
          <S.ItemHeader>
            <S.ItemNameAndCost>
              <S.ItemName>{cartItem.product.name}</S.ItemName>
              <S.ItemPrice>{`${cartItem.product.price.toLocaleString('ko-kr')}원`}</S.ItemPrice>
            </S.ItemNameAndCost>
            <Button size="s" radius="s" onClick={handleDeleteCartItem}>
              <S.ButtonText>삭제</S.ButtonText>
            </Button>
          </S.ItemHeader>
          <QuantityStepper
            quantity={quantity}
            increaseQuantity={handleIncreaseQuantity}
            decreaseQuantity={handleDecreaseQuantity}
          />
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
}

export default CartItemCard;
