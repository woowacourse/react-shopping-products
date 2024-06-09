import * as S from './style';

import Divider from '../Divider/Divider';
import AdjustButtonContainer from '../AdjustButtonContainer';

import { CartItem } from '../../types/cart';
import RemoveButton from '../RemoveButton';

interface ShoppingCartItemProps {
  cartItem: CartItem;
}

const ShoppingCartItem = ({ cartItem }: ShoppingCartItemProps) => {
  return (
    <S.ShoppingCartItem>
      <Divider />
      <S.ItemInfoContainer>
        <S.ItemImg src={cartItem.product.imageUrl} alt={cartItem.product.name + '상품 사진'} />
        <S.ItemInfo>
          <S.ItemDetailsContainer>
            <S.ItemDetails>
              <S.ItemName>{cartItem.product.name}</S.ItemName>
              <S.ItemPrice>{`${cartItem.product.price.toLocaleString('ko-kr')}원`}</S.ItemPrice>
            </S.ItemDetails>
            <RemoveButton cartItem={cartItem} />
          </S.ItemDetailsContainer>
          <AdjustButtonContainer cartItem={cartItem} />
        </S.ItemInfo>
      </S.ItemInfoContainer>
    </S.ShoppingCartItem>
  );
};

export default ShoppingCartItem;
