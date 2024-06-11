import * as Styled from './Navigation.styled';

const Navigation = ({ children }: React.PropsWithChildren) => {
  return (
    <Styled.NavigationContainer>
      <Styled.NavigationWrapper>
        <Styled.NavigationButton>SHOP</Styled.NavigationButton>
        {children}
      </Styled.NavigationWrapper>
    </Styled.NavigationContainer>
  );
};

export default Navigation;
