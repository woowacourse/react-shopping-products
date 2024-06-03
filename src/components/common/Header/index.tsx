import * as S from './style';

import { useContext } from 'react';

import CartButton from '../../CartButton';
import HomeButton from '../../HomeButton';
import { UseCartItemsContext } from '../../../App';

const Header = () => {
  const { cartItems } = useContext(UseCartItemsContext);

  return (
    <S.Header>
      <HomeButton onClick={() => {}} />
      <CartButton count={cartItems.length} onClick={() => {}} />
    </S.Header>
  );
};

export default Header;
