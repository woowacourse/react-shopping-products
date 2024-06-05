import * as Styled from './SelectedItem.styled';

import { CartItem } from '@appTypes/product';
import Stepper from '@components/common/Stepper/Stepper';
import { formatKoreanCurrency } from '@utils/currency';

interface CartItemProps {
  cartItem: CartItem;
}

export default function SelectedItem({ cartItem }: CartItemProps) {
  return (
    <Styled.SelectedItemContainer>
      <Styled.SelectedItemContent>
        <Styled.DeleteButton>삭제</Styled.DeleteButton>
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
            handleDecreaseQuantity={() => {}}
            handleIncreaseQuantity={() => {}}
            quantity={1}
          />
        </Styled.ProductInfoBox>
      </Styled.SelectedItemContent>
    </Styled.SelectedItemContainer>
  );
}
