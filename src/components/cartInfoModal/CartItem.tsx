import { koMoneyFormat } from '@/utils/koMoneyFormat';
import { AdjustQuantityButton } from '../common/adjustQuantityButton/AdjustQuantityButton';
import * as Styled from './CartItem.styled';

interface CartItemProp {
  productId: number;
  cartId: number;
  img: string;
  productName: string;
  productPrice: number;
  deleteCartItem: (cartId: number) => void;
}
const CartItem = ({
  cartId,
  deleteCartItem,
  productId,
  img,
  productName,
  productPrice,
}: CartItemProp) => {
  return (
    <Styled.CartItem>
      <Styled.Divider />
      <Styled.CartItemContainer>
        <Styled.ItemImg src={img} alt={productName} />
        <Styled.ProductItemBox>
          <Styled.ProductItemInfo>
            <Styled.ProductName>{productName}</Styled.ProductName>
            <Styled.ProductPrice>{koMoneyFormat(productPrice)}</Styled.ProductPrice>
            <Styled.CartButtonBox>
              <AdjustQuantityButton productId={productId} />
            </Styled.CartButtonBox>
          </Styled.ProductItemInfo>
          <Styled.DeleteButton
            onClick={() => {
              deleteCartItem(cartId);
            }}
          >
            삭제
          </Styled.DeleteButton>
        </Styled.ProductItemBox>
      </Styled.CartItemContainer>
    </Styled.CartItem>
  );
};

export default CartItem;
