import { koMoneyFormat } from '@/utils/koMoneyFormat';
import { AdjustQuantityButton } from '../../common/adjustQuantityButton/AdjustQuantityButton';
import * as Styled from './CartItem.styled';
import { CartItemInfo, CartItemInfoProduct } from '@/types/cartItem';

interface CartItemProp {
  cartItemProduct: CartItemInfoProduct;
  cartId: number;

  matchCartItem: (productId: number) => CartItemInfo | undefined;
  handleDeleteCartItem: (cartId: number) => void;
  handleAdjustQuantity: (quantity: number, cartItemId: number) => void;
}

const CartItem = ({
  cartItemProduct,
  cartId,
  handleDeleteCartItem,
  handleAdjustQuantity,
  matchCartItem,
}: CartItemProp) => {
  const { id: productId, imageUrl: img, name: productName, price: productPrice } = cartItemProduct;
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
              <AdjustQuantityButton
                productId={productId}
                handleAdjustQuantity={handleAdjustQuantity}
                matchCartItem={matchCartItem}
              />
            </Styled.CartButtonBox>
          </Styled.ProductItemInfo>
          <Styled.DeleteButton
            onClick={() => {
              handleDeleteCartItem(cartId);
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
