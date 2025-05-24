import { Flex } from '@/components/common';
import { ProductRowCard } from '@/components/features/product';
import styled from '@emotion/styled';
import { Modal } from '@jae-o/modal-component-module';
import { useCartContext } from '../context';

function CartModal() {
  const { cartList } = useCartContext();

  const totalPrice = cartList.reduce(
    (acc, curCart) => acc + curCart.quantity * curCart.product.price,
    0
  );

  return (
    <Modal.Container
      title="장바구니"
      showCloseButton={false}
      position="bottom"
      style={{ maxHeight: 'calc(100% - 120px)', overflow: 'auto' }}
    >
      {cartList.map(({ id, quantity, product }) => (
        <Flex>
          <Separator />
          <ProductRowCard
            id={product.id}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            cartId={id}
            cartCount={quantity}
          />
        </Flex>
      ))}
      <Flex>
        <Separator />
        <TotalPriceBox>
          <TotalPriceLabel>총 결제 금액</TotalPriceLabel>
          <TotalPrice>{`${totalPrice.toLocaleString()}원`}</TotalPrice>
        </TotalPriceBox>
      </Flex>
      <Modal.CloseTrigger>
        <Modal.WideButton>닫기</Modal.WideButton>
      </Modal.CloseTrigger>
    </Modal.Container>
  );
}

const Separator = styled.div`
  width: 100%;
  border: 1px solid #0000001a;
`;

const TotalPriceBox = styled(Flex)`
  height: 42px;

  flex-direction: row;
  justify-content: space-between;
`;

const TotalPriceLabel = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

const TotalPrice = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

export default CartModal;
