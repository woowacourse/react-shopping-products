import { CustomModal } from 'woowacourse-todari-components';
import ContentRow from '../common/ContentRow/ContentRow';
import useCartItemList from '../../hooks/useCartItemList';
import CartItemList from '../CartItemList/CartItemList';

interface CartItemModalProps {
  isOpened: boolean;
  onClose: () => void;
}

const CartItemModal = ({ isOpened, onClose }: CartItemModalProps) => {
  const {
    data: cartItemListData,
    error: cartItemListError,
    isFetching: isCartItemListFetching,
  } = useCartItemList();

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
      <ContentRow title="총 결제 금액" content="95,000원" />
    </CustomModal>
  );
};

export default CartItemModal;
