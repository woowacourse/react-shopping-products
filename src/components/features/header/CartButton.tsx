import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { baseAPI } from '../../../api/baseAPI';
import { ProductData } from '../../../api/type';

function CartButton() {
  const [itemsCount, setItemsCount] = useState(0);
  useEffect(() => {
    const getShoppingCartDataHandler = async () => {
      const initialPage = 0;
      const maxSize = 50;
      const basePath = `/cart-items?page=${initialPage}&size=${maxSize}`;

      const data = await baseAPI<ProductData>({
        method: 'GET',
        path: basePath,
      });
      setItemsCount(data.content.length);
    };

    getShoppingCartDataHandler();
  }, []);

  return (
    <Container>
      <CartIcon src="./assets/icons/Cart.svg" />
      {itemsCount > 0 && (
        <ItemsCountBox>
          <ItemsCountText>{itemsCount}</ItemsCountText>
        </ItemsCountBox>
      )}
    </Container>
  );
}

const Container = styled.button`
  position: relative;
  width: 44px;
  height: 44px;
`;

const CartIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const ItemsCountBox = styled.div`
  position: absolute;
  right: 0%;
  bottom: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  color: black;
`;

const ItemsCountText = styled.p`
  font-size: 12px;
  font-weight: 700;
`;
export default CartButton;
