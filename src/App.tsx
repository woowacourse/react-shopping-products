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

  const isMatch = (id: number) => {
    const match = cartItems.find((e) => e.product.id === id);

    return match ? true : false;
  };

  return (
    <>
      <Header cartItemCount={cartItems.length} />
      <Body>
        <ProductListContainer cartItems={cartItems} isMatch={isMatch} />
      </Body>
    </>
  );
}

export default App;
