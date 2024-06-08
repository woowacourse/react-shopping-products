import * as S from './style';

import { useContext } from 'react';

import CartButton from '../../CartButton';
import HomeButton from '../../HomeButton';
import { UseCartItemsContext } from '../../../App';

const Header = () => {
  const { getCartItems } = useContext(UseCartItemsContext);

  return (
    <S.Header>
      <HomeButton onClick={() => {}} />
      <CartButton count={getCartItems.data ? getCartItems.data.length : 0} onClick={() => {}} />
    </S.Header>
  );
};

export default Header;
