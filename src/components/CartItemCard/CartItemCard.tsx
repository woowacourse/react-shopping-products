import * as S from './CartItemCard.style';
import Button from '../common/Button/Button';
import Divider from '../common/Divider/Divider';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';
import { CartItem } from '../../types/type';
import useAddCartItem from '../../hooks/useAddCartItem';
import useDeleteCartItem from '../../hooks/useDeleteCartItem';
import usePatchCartItem from '../../hooks/usePatchCartItem';

interface CartItemProps {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: CartItemProps) => {
  const quantity = cartItem.quantity;

  // TODO: ProductItem과 공통 로직 별도 hook으로 분리해볼까
  const deleteCartItemMustation = useDeleteCartItem();
  const patchCartItemMutation = usePatchCartItem();

  const handleDeleteCartItem = () => {
    deleteCartItemMustation.mutate({ cartItemId: cartItem.id });
  };

  const handleIncreaseQuantity = () => {
    patchCartItemMutation.mutate({
      cartItemId: cartItem.id,
      quantity: quantity + 1,
    });
  };

  const handleDecreaseQuantity = () => {
    if (quantity === 1) {
      deleteCartItemMustation.mutate({ cartItemId: cartItem.id });
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
        <S.ImageWraper>
          <S.Image src="1" />
        </S.ImageWraper>
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
            quantity={3}
            increaseQuantity={handleIncreaseQuantity}
            decreaseQuantity={handleDecreaseQuantity}
          />
        </S.ItemDetail>
      </S.ItemBody>
    </S.CartItem>
  );
};

export default CartItemCard;
