import { useCallback } from 'react';
import { getCartItem } from '../../../api/fetchCart';
import { useAPI } from '../../../hooks/useAPI';
import { CartItem } from '../../../types/type';
import { Button, Container, Icon, CartStock, Title } from './Header.styles';

interface HeaderProps {
  title: string;
  onModalOpen: () => void;
}

function Header({ title, onModalOpen }: HeaderProps) {
  const fetchCartItems = useCallback(() => {
    return getCartItem({ page: 0, size: 50, sortBy: 'desc' }).then(
      (res) => res.content
    );
  }, []);

  const { data: cartList } = useAPI<CartItem[]>({
    fetcher: fetchCartItems,
    name: 'cartItems',
  });
  const totalCartProducts = cartList?.length;

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
