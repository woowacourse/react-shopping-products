import { ShopButton } from '../Button';
import { CartButton } from '../Button/CartButton';
import { StyledHeader } from './Header.styled';

export const Header = () => {
  return (
    <StyledHeader>
      <ShopButton onClick={() => {}} />
      <CartButton onClick={() => {}} />
    </StyledHeader>
  );
};
