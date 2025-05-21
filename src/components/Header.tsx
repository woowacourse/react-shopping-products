import styled from '@emotion/styled';
import Logo from '/public/logo.svg';
import CartIcon from '/public/icon/cart.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import useCartContext from '../hooks/useCartContext';
import countDistinct from '../util/countDistinct';

const Header = () => {
  const { cartItemsIds } = useCartContext();

  return (
    <HeaderContainer>
      <HeaderLogoButton>
        <Link to={ROUTES.PRODUCT_LIST_PAGE}>
          <img src={Logo} alt="헤더 로고" />
        </Link>
      </HeaderLogoButton>
      <HeaderCartButton>
        <img src={CartIcon} alt="장바구니" />
        {cartItemsIds.length !== 0 && (
          <HeaderItemCount>{countDistinct(cartItemsIds)}</HeaderItemCount>
        )}
      </HeaderCartButton>
    </HeaderContainer>
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
