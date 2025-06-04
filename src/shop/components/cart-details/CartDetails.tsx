'use client';

import styled from '@emotion/styled';
import {
  deleteCartItem,
  getShoppingCartData,
  patchCartItem,
} from '../../../api/cart';
import Counter from '../../../components/common/Counter';
import Image from '../../../components/common/Image';
import { useAPIDataContext } from '../../../context/APIDataProvider';
import { useToastContext } from '../../../context/ToastProvider';

export default function CartDetails({
  onCloseClick,
}: {
  onCloseClick: () => void;
}) {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });

  const { showToast } = useToastContext();

  const isCartEmpty = !cartListData || cartListData.length === 0;

  const handlePlusQuantity = async (cartId: string) => {
    try {
      if (!cartListData) return;
      const cart = cartListData.find((cart) => cart.id === cartId);
      if (!cart) throw new Error('장바구니에 해당 아이템이 없습니다.');
      await patchCartItem(cartId, cart.quantity + 1);
      await cartRefetch();
    } catch (e) {
      showToast('장바구니에 추가하는 데 실패했습니다.', 'error');
    }
  };

  const handleMinusQuantity = async (cartId: string) => {
    try {
      if (!cartListData || cartListData.length >= 50) return;
      const cart = cartListData.find((cart) => cart.id === cartId);
      if (!cart) throw new Error('장바구니에 해당 아이템이 없습니다.');
      await patchCartItem(cartId, cart.quantity - 1);
      await cartRefetch();
    } catch (e) {
      showToast('장바구니에서 뺴는 데 실패했습니다.', 'error');
    }
  };

  if (!cartListData) {
    return <div>장바구니를 불러오는 중...</div>;
  }

  const removeItem = async (id: string) => {
    await deleteCartItem(id);
    await cartRefetch();
  };

  const totalAmount = cartListData.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}원`;
  };

  return (
    <Container>
      <ItemList>
        {isCartEmpty ? (
          <EmptyCartBox>
            <EmptyCartImage src="./assets/icons/DeleteCart.svg" />
            <EmptyCartText>장바구니에 담긴 상품이 없습니다.</EmptyCartText>
          </EmptyCartBox>
        ) : (
          cartListData?.map((cart) => (
            <ItemContainer key={cart.id}>
              <Image
                width="80px"
                height="80px"
                imageSource={cart.product.imageUrl}
                altText={`${cart.product.name} 상품 이미지`}
                isSoldOut={cart.product.quantity === 0}
              />

              <ProductInfo aria-label="상품 정보" role="cart-product-info">
                <ProductName>{cart.product.name}</ProductName>
                <ProductPrice>{formatPrice(cart.product.price)}</ProductPrice>
                <Counter
                  canBeZero={false}
                  count={cart.quantity}
                  maxCount={cart.product.quantity}
                  onPlusClick={() => handlePlusQuantity(cart.id)}
                  onMinusClick={() => handleMinusQuantity(cart.id)}
                  autoFocus
                />
              </ProductInfo>

              <DeleteButton onClick={() => removeItem(cart.id)}>
                삭제
              </DeleteButton>
            </ItemContainer>
          ))
        )}
      </ItemList>

      <TotalSection>
        <TotalLabel>총 결제 금액</TotalLabel>
        <TotalAmount aria-label={`총 결제 금액은 ${totalAmount}원 입니다`}>
          {formatPrice(totalAmount)}
        </TotalAmount>
      </TotalSection>

      <CheckoutButton onClick={onCloseClick} autoFocus={isCartEmpty}>
        닫기
      </CheckoutButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 480px;
`;

const ItemList = styled.div`
  max-height: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  overflow-y: auto;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.p`
  ${({ theme }) => theme.body1}
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.body2}
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fff;
  color: #666;
  ${({ theme }) => theme.body2}
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-top: 1px solid #f0f0f0;
  margin-bottom: 24px;
`;

const TotalLabel = styled.span`
  ${({ theme }) => theme.subheading}
`;

const TotalAmount = styled.span`
  ${({ theme }) => theme.subheading}
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  ${({ theme }) => theme.title}
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const EmptyCartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 120px;
  text-align: center;
  padding: 32px;
`;

const EmptyCartImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  opacity: 0.3;
`;

const EmptyCartText = styled.p`
  width: 100%;
  color: grey;
  ${({ theme }) => theme.body2}
`;
