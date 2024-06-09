import { PropsWithChildren } from 'react';
import { Modal } from 'river-modal-component';
import { formatPriceToKoreanWon } from '@/utils/index';
import { useFetchCartItems, useTotalPrice } from '@/hooks/index';
import {
  CartItemListContainer,
  TotalPriceContainer,
} from './CartItemsModal.style';
import { CartItemCard, Button, FallbackCart } from '@/components/index';
import { useTheme } from '@emotion/react';

const CartItemsModal: React.FC<PropsWithChildren> = () => {
  const { cartItemList, isLoading, isError } = useFetchCartItems();
  const { totalPrice } = useTotalPrice();
  const { colors } = useTheme();

  return (
    <Modal.Content
      modalPosition="bottom"
      closeButtonPosition="bottom"
      size="small"
    >
      <Modal.Header containClose={false} title="장바구니" />
      <Modal.Body>
        {isError && (
          <FallbackCart message="장바구니 목록을 불러오는데 예기치 않은 오류가 생겼습니다." />
        )}
        {!isLoading &&
          !isError &&
          (cartItemList.length !== 0 ? (
            <>
              <CartItemListContainer>
                {cartItemList.map((cartItem, index) => (
                  <CartItemCard
                    key={`${cartItem.id}${index}`}
                    cartItem={cartItem}
                  />
                ))}
              </CartItemListContainer>
              <TotalPriceContainer>
                <p>총 결제 가격</p>
                <p>{formatPriceToKoreanWon(totalPrice)}</p>
              </TotalPriceContainer>
            </>
          ) : (
            <FallbackCart message="장바구니가 텅- 비었습니다." />
          ))}
      </Modal.Body>
      <Modal.Footer align="center">
        <Modal.Close>
          <Button
            color={colors.white}
            backgroundColor={colors.darkGray}
            hasBorderRadius
            borderColor={colors.border}
            width="400px"
            height="44px"
          >
            닫기
          </Button>
        </Modal.Close>
      </Modal.Footer>
    </Modal.Content>
  );
};

export default CartItemsModal;
