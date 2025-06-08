import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import ProductSection from './ui/components/ProductSection/ProductSection';
import ToastList from './ui/components/Toast/ToastList';
import Cart from './ui/components/Cart/Cart';
import { useState } from 'react';
import { Modal } from './ui/components/Modal';
import { Global } from '@emotion/react';
import { useCart } from './hooks/useCart';

function App() {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { cart } = useCart();

  return (
    <>
      <Global styles={GlobalStyle} />
      <Layout>
        <ToastList />
        <Header
          title="SHOP"
          totalCartProducts={cart?.totalElements ?? 0}
          onClickCart={() => setIsCartModalOpen(true)}
        />
        {isCartModalOpen && (
          <Modal position="bottom" title="장바구니" onClose={() => setIsCartModalOpen(false)}>
            <Cart onClose={() => setIsCartModalOpen(false)} />
          </Modal>
        )}
        <ProductSection />
      </Layout>
    </>
  );
}

export default App;
