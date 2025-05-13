import { Button, Container, Icon, Title } from './Header.styles';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <Button>
        <Icon src="./cart_default.png" alt="장바구니 아이콘" />
      </Button>
    </Container>
  );
};

export default Header;
