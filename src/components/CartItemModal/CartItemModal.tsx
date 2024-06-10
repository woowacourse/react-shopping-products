import { CustomModal } from 'woowacourse-todari-components';
import { useEffect } from 'react';

import ContentRow from '../common/ContentRow/ContentRow';
import useCartItemList from '../../hooks/useCartItemList';
import CartItemList from '../CartItemList/CartItemList';
import EmptyCartFallback from '../EmptyCartFallback/EmptyCartFallback';
import { useToast } from '../../store/ToastProvider';
import Spinner from '../common/Spinner/Spinner';

import * as S from './CartItemModal.style';

interface CartItemModalProps {
  isOpened: boolean;
  onClose: () => void;
}

function CartItemModal({ isOpened, onClose }: CartItemModalProps) {
  const {
    data: cartItemListData,
    error: cartItemListError,
    isFetching: isCartItemListFetching,
  } = useCartItemList();

  const { addToast } = useToast();

  useEffect(() => {
    if (cartItemListError) {
      addToast(cartItemListError.message);
    }
  }, [cartItemListError]);

  const price = cartItemListData?.content.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  const renderContent = () => {
    if (isCartItemListFetching && !cartItemListData) {
      return <Spinner height="100%" />;
    }

    if (cartItemListData?.content.length === 0) {
      return <EmptyCartFallback />;
    }

    if (cartItemListData) {
      return (
        <>
          <CartItemList cartItemList={cartItemListData.content} />
          <ContentRow
            title="총 결제 금액"
            content={`${price?.toLocaleString('ko-kr') ?? 0}원`}
          />
        </>
      );
    }

    return null;
  };

  return (
    <CustomModal
      isOpened={isOpened}
      onClose={onClose}
      modalPosition="bottom"
      title="장바구니"
      primaryButton={{
        size: 'medium',
        text: '닫기',
        onClick: onClose,
      }}
    >
      <S.ModalContent>{renderContent()}</S.ModalContent>
    </CustomModal>
  );
}

export default CartItemModal;
