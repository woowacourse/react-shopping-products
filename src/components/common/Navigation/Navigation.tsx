import * as Styled from './Navigation.styled';

import { ShoppingCartSvg } from '@assets/svg';

interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount?: number;
  onCartClick: () => void;
}

function Navigation({ itemCount = 0, onCartClick }: NavigationProps) {
  return (
    <Styled.NavigationContainer>
      <Styled.NavigationWrapper>
        <Styled.NavigationButton>SHOP</Styled.NavigationButton>
        <Styled.NavigationButton
          onClick={onCartClick}
          style={{ position: 'relative' }}
        >
          <ShoppingCartSvg />
          {itemCount > 0 && <Styled.Circle>{itemCount}</Styled.Circle>}
        </Styled.NavigationButton>
      </Styled.NavigationWrapper>
    </Styled.NavigationContainer>
  );
}

export default Navigation;
