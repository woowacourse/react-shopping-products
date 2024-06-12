import * as S from './style';

import CartButton from '../../CartButton';
import HomeButton from '../../HomeButton';
import useCartItems from '../../../hooks/useCartItems';

interface HeaderProps {
  handleCartButtonOnClick: () => void;
}

const Header = ({ handleCartButtonOnClick }: HeaderProps) => {
  const { getCartItems } = useCartItems();

  return (
    <S.Header>
      <HomeButton onClick={() => {}} />
      <CartButton
        count={getCartItems.data ? getCartItems.data.length : 0}
        onClick={handleCartButtonOnClick}
      />
    </S.Header>
  );
};

export default Header;
