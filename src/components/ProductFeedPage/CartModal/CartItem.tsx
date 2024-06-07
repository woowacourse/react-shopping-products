import ImageWithFallback from "@src/components/common/ImageWithFallback";
import styled from "styled-components";
import { CartItem as TCartItem } from "@src/apis/cartItems";
import { formatToKRW } from "@src/utils/formatToKRW";
import { useCartItemQuantityControl } from "@server/hooks/useCartItemQuantityControl";
import { useDeleteCartItemMutation } from "@src/server/mutations/useDeleteCartItemMutation";
import Counter from "@src/components/common/Counter";

interface CartItemProps {
  cartItem: TCartItem;
}

const MIN_CART_ITEM_COUNT = 1;
const MAX_CART_ITEM_COUNT = 99;

const CartItem = ({ cartItem }: CartItemProps) => {
  const {
    product: { name, price, imageUrl },
    quantity,
  } = cartItem;

  const { increaseQuantity, decreaseQuantity } = useCartItemQuantityControl({
    productId: cartItem.product.id,
    onError: alertErrorMessage,
  });

  const { deleteCartItemMutation } = useDeleteCartItemMutation();

  const handleDeleteButtonClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteCartItemMutation(cartItem.id);
    }
  };

  return (
    <S.Container>
      <S.ItemWrapper>
        <S.Image src={imageUrl} alt={name} />
        <S.Info>
          <S.Name>{name}</S.Name>
          <S.Price>{formatToKRW(price)}</S.Price>
          <Counter
            count={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            minCount={MIN_CART_ITEM_COUNT}
            maxCount={MAX_CART_ITEM_COUNT}
          />
        </S.Info>
      </S.ItemWrapper>
      <S.DeleteButton onClick={handleDeleteButtonClick}>삭제</S.DeleteButton>
    </S.Container>
  );
};

export default CartItem;

const alertErrorMessage = (error: Error) => {
  alert(error.message);
};

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem 0 2.4rem 0;
  `,

  ItemWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 1.6rem;
  `,

  Image: styled(ImageWithFallback)`
    width: 8em;
    height: 8rem;
    object-fit: cover;
    border-radius: 0.4rem;
  `,

  Info: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,

  Name: styled.span`
    color: black;
    font-size: 1.6rem;
    font-weight: 700;
    width: 22rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  Price: styled.span`
    color: #0a0d13;
    font-size: 1.2rem;
    font-weight: 400;
  `,

  DeleteButton: styled.button`
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    padding: 0.4rem 0.9rem;
    color: #0a0d13;
    font-size: 1.2rem;
    font-weight: 400;
    height: fit-content;
    cursor: pointer;
  `,
};
