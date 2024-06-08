import styled from 'styled-components';
import { Button, Splitter } from '../common';
import useMutateCartItems from '../../hooks/useCartItems/useMutateCartItems';
import { CartItem } from '../../types/CartItem.type';
import { formatCurrency } from '../../utils/formatCurrency';
import MinusIcon from '../../assets/MinusIcon.svg';
import PlusIcon from '../../assets/PlusIcon.svg';

interface CartItemProps {
  cartItem: CartItem;
}

const CartItemInfo = ({ cartItem }: CartItemProps) => {
  const { handleDeleteCartItem, handleCartItemQuantity } = useMutateCartItems();

  return (
    <CartItemWrapper>
      <Splitter />

      <ProductInfo>
        <ProductImage src={cartItem.product.imageUrl} alt={cartItem.product.name} />
        <ProductDetails>
          <Header>
            <ProductName>{cartItem.product.name}</ProductName>
            <Button variant="secondary" size="medium" onClick={() => handleDeleteCartItem(cartItem.id)}>
              삭제
            </Button>
          </Header>

          <ProductPrice>{formatCurrency(cartItem.product.price)}</ProductPrice>

          <CartItemQuantityControls>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleCartItemQuantity(cartItem.id, Math.max(cartItem.quantity - 1, 1))}
            >
              <img src={MinusIcon} alt="장바구니 1개 제거" />
            </Button>
            <p>{cartItem.quantity}</p>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleCartItemQuantity(cartItem.id, cartItem.quantity + 1)}
            >
              <img src={PlusIcon} alt="장바구니 1개 추가" />
            </Button>
          </CartItemQuantityControls>
        </ProductDetails>
      </ProductInfo>
    </CartItemWrapper>
  );
};

export default CartItemInfo;

const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.md};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const ProductPrice = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const CartItemQuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;
