import * as S from './Header.styled';
import BagIcon from '../Icon/BagIcon';
import { ResponseCartItem } from '../../api/types';

function Header({ cartItemList }: { cartItemList: ResponseCartItem[] }) {
  return (
    <S.HeaderContainer>
      <S.HeaderTitle>SHOP</S.HeaderTitle>
      <S.HeaderIconContainer>
        <BagIcon />
        {cartItemList.length > 0 && <S.CartBadge>{cartItemList.length}</S.CartBadge>}
      </S.HeaderIconContainer>
    </S.HeaderContainer>
  );
}

export default Header;
