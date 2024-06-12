import { Modal } from 'woowacourse-6th-react-modal-component';

import useFetchCartItems from '@/queries/cartItem/useFetchCartItems';

import BaseButton from '@/components/button/BaseButton';
import CartItemList from '@/components/cartItem/CartItemList';
import Loading from '@/components/Loading';
import Toast from '@/components/Toast';

import styled from '@emotion/styled';
import calculateTotalAmount from '@/utils/cartItem/calculateTotalAmount';
import { STYLE_THEME } from '@/styles/constants/theme';

interface Props {
  closeModal: () => void;
}

const CartSummaryModal = ({ closeModal }: Props) => {
  const { cartItems, isLoading, error } = useFetchCartItems();
  const totalAmount = calculateTotalAmount(cartItems);

  if (error) {
    return <Toast message={error.message} />;
  }

  return (
    <Modal onCloseModal={closeModal} $size="43rem" $position="bottom">
      <Modal.Header title="장바구니" />
      {isLoading ? (
        <Loading />
      ) : (
        <Modal.Content>
          <S.CartItemListContainer>
            <CartItemList cartItems={cartItems} />
          </S.CartItemListContainer>
          <S.TotalAmountWrapper>
            <S.Title>총 결제 금액 </S.Title>
            <S.TotalAmount>{totalAmount.toLocaleString()}원</S.TotalAmount>
          </S.TotalAmountWrapper>
        </Modal.Content>
      )}
      <Modal.Footer $align="center">
        <BaseButton
          type="button"
          onClick={closeModal}
          $theme="black"
          $width="100%"
          $height="44px"
        >
          닫기
        </BaseButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CartSummaryModal;

const S = {
  CartItemListContainer: styled.div`
    max-height: 35vh;
    overflow-y: auto;
  `,
  TotalAmountWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    font-weight: ${STYLE_THEME.fontWeight.bold};
    color: ${STYLE_THEME.color.black};
  `,
  Title: styled.div`
    font-size: ${STYLE_THEME.fontSize.medium};
  `,
  TotalAmount: styled.div`
    font-size: ${STYLE_THEME.fontSize.xl};
  `,
};
