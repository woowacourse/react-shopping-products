import { css } from '@emotion/react';
import { Button, Modal, type ModalProps } from '@sebin0580/modal';

import { Flex } from '@/shared/components/Flex';
import { Text } from '@/shared/components/Text';
import { useData } from '@/shared/context/useData';

import { CartItemDetail } from './CartItemDetail';

import { CartListContainer } from '../container/CartListContainer';

export const AddBottomSheet = ({
  isOpen,
  onClose,
  title,
}: Pick<ModalProps, 'isOpen' | 'onClose' | 'title'>) => {
  const { cartData } = useData();
  const totalPrice = cartData.data?.reduce((acc, item) => {
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
        {cartData.data?.map((cartItem) => <CartItemDetail key={cartItem.id} {...cartItem} />)}
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
        <Text type="Heading">{totalPrice?.toLocaleString()}원</Text>
      </Flex>
      <Button size="lg" onClick={onClose} width="100%">
        닫기
      </Button>
    </Modal>
  );
};
