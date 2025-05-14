import styled from '@emotion/styled';
import Logo from '/public/logo.svg';
import CartIcon from '/public/icon/cart.svg';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderLogoButton>
        <img src={Logo} alt="헤더 로고" onClick={() => navigate(ROUTES.PRODUCT_LIST_PAGE)} />
      </HeaderLogoButton>
      <HeaderCartButton>
        <img src={CartIcon} alt="장바구니" />
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
`;
