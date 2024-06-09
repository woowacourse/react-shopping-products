import { Skeleton } from '../../common/Skeleton/style';

import * as S from './style';

export default function CartItemSkeleton() {
  return (
    <S.CartItemWrapper>
      <S.CartItemContainer>
        <Skeleton style={{ width: '80px', height: '80px' }} />

        <S.CartItemInfo>
          <>
            <Skeleton
              style={{ width: '100px', height: '26px', marginBottom: '4px' }}
            />
            <Skeleton style={{ width: '50px', height: '15px' }} />
          </>

          <Skeleton
            style={{ width: '80px', height: '24px', marginTop: '8px' }}
          />
        </S.CartItemInfo>
      </S.CartItemContainer>

      <Skeleton style={{ width: '40px', height: '24px' }} />
    </S.CartItemWrapper>
  );
}
