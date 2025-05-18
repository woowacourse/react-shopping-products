import styled from '@emotion/styled';
import CartIconButton from './CartIconButton';

const Header = ({ cartItemCount }: { cartItemCount: number }) => {
  return (
    <HeaderContainer>
      <h1>SHOP</h1>
      <CartIconButton cartItemCount={cartItemCount} />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  width: 500px;
  min-height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: black;
  color: white;
  box-sizing: border-box;
  font-weight: 800;
`;
