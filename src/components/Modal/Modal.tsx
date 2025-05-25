import { Modal as ModalComponent } from 'oa-modal-components';
import * as S from '../../styles/Modal';
import ModalProductItem from './ModalProductItem';
import { useFetchCartItems } from '../../hooks/useFetchCartItems';

const Modal = () => {
  const { data: cartProductsIds } = useFetchCartItems();
  const totalPrice = cartProductsIds.reduce((acc, product) => acc + product.price, 0);

  return (
    <ModalComponent
      modalPosition="bottom"
      closeType="bottom"
      colorType="black"
      titleText="장바구니"
    >
      <S.ModalContainer>
        {cartProductsIds.map((product) => (
          <ModalProductItem
            key={product.productId}
            id={product.productId}
            cartId={product.cartId}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
        <S.ModalTotalPriceContainer>
          <S.ModalBr />
          <S.ModalTotalPriceContentContainer>
            <S.ModalTotalPriceTitleText>총 주문 금액</S.ModalTotalPriceTitleText>
            <S.ModalTotalPriceText>{totalPrice.toLocaleString()}원</S.ModalTotalPriceText>
          </S.ModalTotalPriceContentContainer>
        </S.ModalTotalPriceContainer>
      </S.ModalContainer>
    </ModalComponent>
  );
};

export default Modal;
