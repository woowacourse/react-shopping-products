import QuantityButton from '@_components/common/Buttons/QuantityButton';
import Divider from '@_components/common/Divider';
import Button from '@_components/common/Buttons';

import { CartItem as CartItemType } from '@_types/cartItem';

import * as S from './style';

interface CartItemProps {
  cartItemInfo: CartItemType;
}

function CartItem({ cartItemInfo }: CartItemProps) {
  return (
    <S.Wrapper>
      <Divider />
      <S.Container>
        <S.Image src={cartItemInfo.product.imageUrl} />
        <S.Information>
          <S.NameAndPrice>
            <S.Name>{cartItemInfo.product.name}</S.Name>
            <S.Price>{cartItemInfo.product.price.toLocaleString() + '원'}</S.Price>
          </S.NameAndPrice>
          <S.QuantityController>
            <QuantityButton type={cartItemInfo.quantity === 1 ? 'canDelete' : 'minus'} />
            <div>{cartItemInfo.quantity}</div>
            <QuantityButton type='plus' />
          </S.QuantityController>
          <S.DeleteButtonBox>
            <Button width='40px' height='24px'>
              삭제
            </Button>
          </S.DeleteButtonBox>
        </S.Information>
      </S.Container>
    </S.Wrapper>
  );
}

export default CartItem;
