import { Suspense, lazy, useState } from 'react';

import IntersectionArea from '../../common/IntersectionArea';
import CartItemSkeleton from '../CartItem/CartItemSkeleton';

import type { CartItem as CartItemType } from '../../../types';

import * as S from './style';

interface CartListProps {
  cartItems: CartItemType[];
}

// TODO: skeleton을 사용하기 위해 lazy를 사용하는 게 자연스러운가..? lazy 필요해서 도입 -> skeleton 사용이 맞지 않나?
const LazyCartItem = lazy(() => import('../CartItem'));

export default function CartList({ cartItems }: CartListProps) {
  const [showOverflowIndicator, setOverflowIndicator] = useState(true);

  const hideOverflowIndicator = () => {
    setOverflowIndicator(false);
  };

  return (
    <S.CartItemsContainer>
      {cartItems.map((cartItem, index) => {
        const isLastCartItem = index === cartItems.length - 1;

        return isLastCartItem ? (
          <IntersectionArea
            key={`cart-item-${cartItem.id}`}
            onImpression={hideOverflowIndicator}
            threshold={0.8}
          >
            <Suspense fallback={<CartItemSkeleton />}>
              <LazyCartItem cartItem={cartItem} />
            </Suspense>
          </IntersectionArea>
        ) : (
          <Suspense
            key={`cart-item-${cartItem.id}`}
            fallback={<CartItemSkeleton />}
          >
            <LazyCartItem cartItem={cartItem} />
          </Suspense>
        );
      })}

      {showOverflowIndicator && (
        <S.OverflowIndicator hidden={!showOverflowIndicator}>
          스크롤 내려서 더보기
        </S.OverflowIndicator>
      )}
    </S.CartItemsContainer>
  );
}
