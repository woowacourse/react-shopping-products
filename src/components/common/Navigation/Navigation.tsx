import { ShoppingCart } from '@assets/svg';
import * as Styled from './Navigation.styled';

interface NavigationProps extends React.PropsWithChildren {
  itemCount?: number;
}

const Navigation: React.FC<NavigationProps> = ({ itemCount = 0 }) => {
  return (
    <Styled.NavigationContainer>
      <Styled.NavigationWrapper>
        <Styled.NavigationButton>SHOP</Styled.NavigationButton>
        <Styled.NavigationButton style={{ position: 'relative' }} disabled>
          <ShoppingCart />
          {itemCount > 0 && <Styled.Circle>{itemCount}</Styled.Circle>}
        </Styled.NavigationButton>
      </Styled.NavigationWrapper>
    </Styled.NavigationContainer>
  );
};

export default Navigation;
