import { useCartListContext } from '../../../context/CartContext';
import { Button, Container, Icon, CartStock, Title } from './Header.styles';

interface HeaderProps {
  title: string;
  onModalOpen: () => void;
}

function Header({ title, onModalOpen }: HeaderProps) {
  const { cartList } = useCartListContext();
  const totalCartProducts = cartList.length;

  return (
    <Container>
      <Title>{title}</Title>
      <Button>
        {totalCartProducts && totalCartProducts > 0 ? (
          <>
            <Icon
              src="./cart_stock.png"
              alt="장바구니 아이콘"
              onClick={onModalOpen}
            />
            <CartStock>{totalCartProducts}</CartStock>
          </>
        ) : (
          <Icon
            src="./cart_default.png"
            alt="장바구니 아이콘"
            onClick={onModalOpen}
          />
        )}
      </Button>
    </Container>
  );
}

export default Header;
