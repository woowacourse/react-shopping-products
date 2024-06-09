import { CustomModal } from 'woowacourse-todari-components';

import ContentRow from '../common/ContentRow/ContentRow';
import useCartItemList from '../../hooks/useCartItemList';
import CartItemList from '../CartItemList/CartItemList';

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

  const price = cartItemListData?.content.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

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
      <CartItemList cartItemList={cartItemListData?.content ?? []} />
      <ContentRow
        title="총 결제 금액"
        content={`${price?.toLocaleString('ko-kr')}원`}
      />
    </CustomModal>
  );
}

export default CartItemModal;
