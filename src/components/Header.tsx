import styled from '@emotion/styled';
import Logo from '/public/logo.svg';
import CartIcon from '/public/icon/cart.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import useCartContext from '../hooks/useCartContext';

const Header = () => {
  const navigate = useNavigate();
  const { cartItemCount } = useCartContext();

  return (
    <HeaderContainer>
      <HeaderLogoButton>
        <img src={Logo} alt="헤더 로고" onClick={() => navigate(ROUTES.PRODUCT_LIST_PAGE)} />
      </HeaderLogoButton>
      <HeaderCartButton>
        <img src={CartIcon} alt="장바구니" />
        {cartItemCount !== 0 && <HeaderItemCount>{cartItemCount}</HeaderItemCount>}
      </HeaderCartButton>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 100%;
  background-color: var(--color-black);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
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
