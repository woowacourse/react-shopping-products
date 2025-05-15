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

  const updateCartItems = async () => {
    try {
      const cartItemsData = await getShppingCart();
      setCartItems(cartItemsData.content);
    } catch (e) {
      //
    } finally {
      //
    }
  };

  const getMatchCartItem = (id: number) => {
    const match = cartItems.find((e) => e.product.id === id);
    return match;
  };

  return (
    <>
      <Header cartItemCount={cartItems.length} />
      <Body>
        <ProductListContainer
          cartItems={cartItems}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
        />
      </Body>
    </>
  );
}

export default App;
