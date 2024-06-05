import * as Styled from './SelectedItem.styled';

import { CartItem } from '@appTypes/product';
import Stepper from '@components/common/Stepper/Stepper';
import { formatKoreanCurrency } from '@utils/currency';

interface CartItemProps {
  cartItem: CartItem;
  deleteItem: (id: number) => void;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
}

export default function SelectedItem({
  cartItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
}: CartItemProps) {
  return (
    <Styled.SelectedItemContainer>
      <Styled.SelectedItemContent>
        <Styled.DeleteButton onClick={() => deleteItem(cartItem.id)}>
          삭제
        </Styled.DeleteButton>
        <Styled.ProductImageBox
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
        />
        <Styled.ProductInfoBox>
          <Styled.ProductName>{cartItem.product.name}</Styled.ProductName>
          <Styled.ProductPrice>
            {formatKoreanCurrency(cartItem.product.price)}
          </Styled.ProductPrice>
          <Stepper
            handleDecreaseQuantity={() => decreaseItemQuantity(cartItem.id)}
            handleIncreaseQuantity={() => increaseItemQuantity(cartItem.id)}
            quantity={cartItem.quantity}
          />
        </Styled.ProductInfoBox>
      </Styled.SelectedItemContent>
    </Styled.SelectedItemContainer>
  );
}
