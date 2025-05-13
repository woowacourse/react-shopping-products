import {CartIcon, Logo, Wrapper} from './Navbar.styles';

export const Navbar = () => {
  return (
    <Wrapper>
      <Logo>SHOP</Logo>
      <CartIcon src="/cartIcon.svg"></CartIcon>
    </Wrapper>
  );
};
