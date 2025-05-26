import { Button, Container, Icon, CartStock, Title } from './Header.styles';
import { cartDefaultIcon, cartStockIcon } from "../../../assets";

interface HeaderProps {
  title: string;
  totalCartProducts: number | null;
  onClickCart?: () => void;
}

function Header({ title, totalCartProducts, onClickCart }: HeaderProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Button onClick={onClickCart}>
        {totalCartProducts && totalCartProducts > 0 ? (
          <>
            <Icon src={cartStockIcon} alt="장바구니 아이콘" />
            <CartStock>{totalCartProducts}</CartStock>
          </>
        ) : (
          <Icon src={cartDefaultIcon} alt="장바구니 아이콘" />
        )}
      </Button>
    </Container>
  );
}

export default Header;
