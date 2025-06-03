import styled from '@emotion/styled';
import { ButtonContainer } from '../../components/Button';
import Modal from '../../components/Modal';
import ProductItem from '../../components/ProductItem';
import useErrorHandler from '../../hooks/useErrorHandler';
import { SetStateAction } from 'react';
import useCartHandler from '../../hooks/useCartHandler';
import { extractCartQuantity } from '../../domain/cartItem';

interface CartModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const CartModal = ({ open, setOpen }: CartModalProps) => {
  const { handleErrorMessage } = useErrorHandler();
  const { cartItems, handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveCartItem } =
    useCartHandler({
      handleErrorMessage,
    });
  const products = cartItems.map(({ product }) => product);

  return (
    <Modal open={open} onClose={() => setOpen(false)} title="장바구니">
      <ModalProductsWrapper>
        {products.map((product) => {
          return (
            <ModalProductItem key={product.id} data-testid="modal-product-items">
              <ProductItem
                product={product}
                quantityInCart={extractCartQuantity(cartItems, product.id)}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                modal={true}
              />

              <DeleteButton
                type="button"
                id={`delete-button-${product.id}`}
                name="삭제"
                $variant="smallWhite"
                onClick={() => handleRemoveCartItem(product.id)}
              >
                삭제
              </DeleteButton>
            </ModalProductItem>
          );
        })}
      </ModalProductsWrapper>
      <PriceContainer>
        <PriceLabel>총 결제 금액</PriceLabel>
        <Price>
          {products
            .reduce((acc, cur) => {
              return acc + cur.price * extractCartQuantity(cartItems, cur.id);
            }, 0)
            .toLocaleString()}
          원
        </Price>
      </PriceContainer>
    </Modal>
  );
};

const ModalProductsWrapper = styled.ul`
  max-height: 50%;
  overflow-y: auto;
  padding: 0 16px;
`;

const ModalProductItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  height: 100px;

  display: flex;
  justify-content: space-between;

  padding-top: 6px;
  padding-bottom: 12px;
  border-top: 1px solid var(--color-grey);
`;

const DeleteButton = styled(ButtonContainer)`
  max-width: fit-content;
  padding: 4px 8px;

  border-radius: 4px;
`;

const PriceContainer = styled.p`
  padding: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid var(--color-grey);
  color: var(--color-black);
`;

const PriceLabel = styled.span`
  font-size: var(--font-size-subtitle);
  font-weight: var(--font-weight-subtitle);
`;

const Price = styled.p`
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-title);
`;
