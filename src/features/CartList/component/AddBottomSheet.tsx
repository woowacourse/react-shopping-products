import { css } from '@emotion/react';
import { Button, Modal, type ModalProps } from '@sebin0580/modal';

import { CartItem } from '@/features/ProductList/types/Cart';
import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';

import { CartItemDetail } from './CartItemDetail';

import { CartListContainer } from '../container/CartListContainer';

type AddBottomSheetProps = {
  cartData: CartItem[];
  onUpdateCartItemQuantity: (id: number, quantity: number) => void;
  onDeleteCartItem: (id: number) => void;
} & Pick<ModalProps, 'isOpen' | 'onClose' | 'title'>;

export const AddBottomSheet = ({
  cartData,
  onDeleteCartItem,
  isOpen,
  onClose,
  title,
  onUpdateCartItemQuantity,
}: AddBottomSheetProps) => {
  const totalPrice = cartData.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return (
    <Modal
      position="bottom"
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      maxWidth="420px"
      showCloseButton={false}
      content="bottom"
    >
      <CartListContainer>
        {cartData.map((cartItem) => (
          <CartItemDetail
            id={cartItem.id}
            key={cartItem.id}
            name={cartItem.product.name}
            price={cartItem.product.price}
            quantity={cartItem.quantity}
            imageUrl={cartItem.product.imageUrl}
            onUpdateCartItemQuantity={() => onUpdateCartItemQuantity}
            onDeleteCartItem={() => onDeleteCartItem(cartItem.id)}
          />
        ))}
      </CartListContainer>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap="0"
        margin="10px 0"
        padding="10px 0"
        css={css`
          border-top: 1px solid #e5e5e5;
        `}
      >
        <Text type="Body">총 결제 금액</Text>
        <Text type="Heading">{totalPrice.toLocaleString()}원</Text>
      </Flex>
      <Button size="lg" onClick={onClose} width="100%">
        닫기
      </Button>
    </Modal>
  );
};
