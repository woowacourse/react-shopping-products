import '@styles/App.css';
import '@styles/reset.css';
import '@styles/global.css';
import { CartAction, PageRequest } from '@components/Fallbacks';
import { Header, Layout, ToastModal } from '@components/index';
import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CartItemsContext } from './contexts';
import { useCartAction } from './hooks';
import { ProductListPage } from './pages';

interface HeaderPosition {
  top: number;
  left: number;
}

function App() {
  const { cartItems, getCartItemList, handleCartAction, error, setCartActionError } = useCartAction();
  const [headerPosition, setHeaderPosition] = useState<HeaderPosition | null>(null);

  const toastPosition = useRef<HTMLElement | null>(null);

  useEffect(() => {
    getCartItemList();
  }, []);

  useEffect(() => {
    if (!toastPosition.current) return;

    const domRect = toastPosition.current.getClientRects()[0];

    setHeaderPosition({
      top: domRect.top,
      left: domRect.left,
    });
  }, [toastPosition]);

  return (
    <>
      <Header cartItemsLength={cartItems.length} toastPosition={toastPosition} />
      <Layout>
        <ErrorBoundary FallbackComponent={({ error }) => <PageRequest error={error} />}>
          <CartItemsContext.Provider value={{ handleCartAction }}>
            <ProductListPage cartItems={cartItems} />
          </CartItemsContext.Provider>
        </ErrorBoundary>
      </Layout>
      {headerPosition && (
        <ToastModal isOpen={error} closeModal={() => setCartActionError(false)} position={headerPosition}>
          <CartAction />
        </ToastModal>
      )}
    </>
  );
}

export default App;
