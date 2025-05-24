import styled from '@emotion/styled';
import Logo from '/public/logo.svg';
import CartIcon from '/public/icon/cart.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import countDistinct from '../util/countDistinct';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Modal from './Modal';
import Button from './Button';
import useCartHandler from '../hooks/useCartHandler';
import useErrorHandler from '../hooks/useErrorHandler';
import ProductItem from './ProductItem';
import { extractCartQuantity } from '../domain/cartItem';

const Header = () => {
  const [open, setOpen] = useState(false);
  const { handleErrorMessage } = useErrorHandler();

  const { cartItems, handleIncreaseQuantity, handleDecreaseQuantity, handleRemoveCartItem } =
    useCartHandler({
      handleErrorMessage,
    });
  const cartIds = cartItems.map(({ id }) => id);
  const products = cartItems.map(({ product }) => product);

  const modalRoot = document.getElementById('root')!;

  return (
    <>
      <HeaderContainer>
        <HeaderLogoButton>
          <Link to={ROUTES.PRODUCT_LIST_PAGE}>
            <img src={Logo} alt="헤더 로고" />
          </Link>
        </HeaderLogoButton>
        <HeaderCartButton onClick={() => setOpen(true)}>
          <img src={CartIcon} alt="장바구니" />
          {cartItems.length !== 0 && <HeaderItemCount>{countDistinct(cartIds)}</HeaderItemCount>}
        </HeaderCartButton>
      </HeaderContainer>
      {open &&
        createPortal(
          <Modal open={open} onClose={() => setOpen(false)} title="장바구니">
            <ModalContent>
              {products.map((product) => {
                return (
                  <ModalProductItem>
                    <ProductItem
                      key={product.id}
                      product={product}
                      quantityInCart={extractCartQuantity(cartItems, product.id)}
                      handleIncreaseQuantity={handleIncreaseQuantity}
                      handleDecreaseQuantity={handleDecreaseQuantity}
                    />

                    <Button
                      type="button"
                      id="deleteButton"
                      name="삭제"
                      variant="smallGrey"
                      onClick={() => handleRemoveCartItem(product.id)}
                    >
                      삭제
                    </Button>
                  </ModalProductItem>
                );
              })}
            </ModalContent>
          </Modal>,
          modalRoot,
        )}
    </>
  );
};

export default Header;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--color-black);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  height: var(--height-header);
  box-sizing: border-box;
  z-index: var(--z-index-header);
`;

const HeaderLogoButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderCartButton = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
`;

const HeaderItemCount = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 500px;
  background-color: var(--color-white);
  color: var(--color-black);
  font-size: var(--font-size-body);
`;

const ModalContent = styled.ul`
  display: flex;
  flex-direction: column;
`;

const ModalProductItem = styled.li`
  display: flex;
`;
