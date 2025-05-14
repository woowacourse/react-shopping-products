import Header from './Component/Layout/Header';
import ProductListContainer from './Component/Product/ProductListContainer';
import Body from './Component/Layout/Body';
import { useEffect, useState } from 'react';
import getShppingCart from './api/getShppingCart';
import { CartItemTypes } from './types/CartItemType';

function App() {
  const [cartItems, setCartItems] = useState<CartItemTypes[]>([]);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const cartItemsData = await getShppingCart();
        setCartItems(cartItemsData.content);
      } catch (e) {
        //
      } finally {
        //
      }
    }
    fetchCartItems();
  }, []);

  return (
    <>
      <Header />
      <Body>
        <ProductListContainer cartItems={cartItems} />
      </Body>
    </>
  );
}

export default App;
