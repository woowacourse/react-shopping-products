'use client';

import styled from '@emotion/styled';
import { useCallback } from 'react';
import {
  deleteCartItem,
  getShoppingCartData,
  patchCartItem,
} from '../../../api/cart';
import Counter from '../../../components/common/Counter';
import { useAPIDataContext } from '../../../context/APIDataProvider';
import { showToast } from '../../../utils/toast/showToast';

export default function CartDetails() {
  const { data: cartListData, refetch: cartRefetch } = useAPIDataContext({
    fetcher: getShoppingCartData,
    name: 'cart',
  });

  const handlePlusQuantity = useCallback(
    async (cartId: string) => {
      try {
        if (!cartListData) return;
        const cart = cartListData.find((cart) => cart.id === cartId);
        if (!cart) throw new Error('장바구니에 해당 아이템이 없습니다.');
        await patchCartItem(cartId, cart.quantity + 1);
        await cartRefetch();
      } catch (e) {
        showToast('장바구니에 추가하는 데 실패했습니다.', 'error');
      }
    },
    [cartListData, cartRefetch]
  );

  const handleMinusQuantity = useCallback(
    async (cartId: string) => {
      try {
        if (!cartListData || cartListData.length >= 50) return;
        const cart = cartListData.find((cart) => cart.id === cartId);
        if (!cart) throw new Error('장바구니에 해당 아이템이 없습니다.');
        await patchCartItem(cartId, cart.quantity - 1);
        await cartRefetch();
      } catch (e) {
        showToast('장바구니에서 뺴는 데 실패했습니다.', 'error');
      }
    },
    [cartListData, cartRefetch]
  );

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
        {cartListData?.map((cart) => (
          <ItemContainer key={cart.id}>
            <ProductImage src={cart.product.imageUrl} alt={cart.product.name} />

            <ProductInfo>
              <ProductName>{cart.product.name}</ProductName>
              <ProductPrice>{formatPrice(cart.product.price)}</ProductPrice>
              <Counter
                canBeZero={false}
                count={cart.quantity}
                onPlusClick={() => handlePlusQuantity(cart.id)}
                onMinusClick={() => handleMinusQuantity(cart.id)}
              />
            </ProductInfo>

            <DeleteButton onClick={() => removeItem(cart.id)}>
              삭제
            </DeleteButton>
          </ItemContainer>
        ))}
      </ItemList>

      <TotalSection>
        <TotalLabel>총 결제 금액</TotalLabel>
        <TotalAmount>{formatPrice(totalAmount)}</TotalAmount>
      </TotalSection>

      <CheckoutButton>닫기</CheckoutButton>
    </Container>
  );
}

const Container = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 480px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
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

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #f5f5f5;
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #000;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: #000;
`;

const DeleteButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background-color: #fff;
  color: #666;
  font-size: 14px;
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
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const TotalAmount = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #000;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;
