import { ShoppingCart } from '@assets/svg';
import * as Styled from './Navigation.styled';

const Navigation: React.FC = () => {
  return (
    <Styled.NavigationContainer>
      <Styled.NavigationWrapper>
        <Styled.NavigationButton>SHOP</Styled.NavigationButton>
        <Styled.NavigationButton style={{ position: 'relative' }} disabled>
          <ShoppingCart />
          <Styled.Circle>{2}</Styled.Circle>
        </Styled.NavigationButton>
      </Styled.NavigationWrapper>
    </Styled.NavigationContainer>
  );
};

export default Navigation;
