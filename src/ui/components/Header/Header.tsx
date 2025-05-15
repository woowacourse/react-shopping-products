import { Button, Container, Icon, CartStock, Title } from './Header.styles';

interface HeaderProps {
  title: string;
  totalCartProducts: number | null;
}

function Header({ title, totalCartProducts }: HeaderProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Button>
        {totalCartProducts && totalCartProducts > 0 ? (
          <>
            <Icon src="./cart_stock.png" alt="장바구니 아이콘" />
            <CartStock>{totalCartProducts}</CartStock>
          </>
        ) : (
          <Icon src="./cart_default.png" alt="장바구니 아이콘" />
        )}
      </Button>
    </Container>
  );
}

export default Header;
