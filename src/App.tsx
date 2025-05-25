import GlobalStyle from './ui/styles/globalStyle';
import Layout from './ui/components/Layout/Layout';
import Header from './ui/components/Header/Header';
import ProductSection from './ui/components/ProductSection/ProductSection';
import LoadingSpinner from './ui/components/LoadingSpinner/LoadingSpinner';
import ToastList from "./ui/components/Toast/ToastList";
import Cart from "./ui/components/Cart/Cart";
import React, { useState, useEffect } from 'react';
import { Modal } from "./ui/components/Modal";
import { Global } from '@emotion/react';
import { SortType, CategoryType } from './types/product';
import { useCartActions } from './hooks/useCartActions';
import { useToast } from './context/ToastContext';
import { ERROR_MESSAGES } from "./constants/errorMessages";

function App() {
  const [sort, setSort] = useState<SortType>('낮은 가격 순');
  const [category, setCategory] = useState<CategoryType>('전체');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const {showToast} = useToast();

  const mappedSortType = sort === '낮은 가격 순' ? 'asc' : 'desc';

  const {
    transformedProducts,
    cart,
    isLoading,
    isError,
    handleAddCart,
    handleRemoveCart,
    handleUpdateQuantity,
  } = useCartActions(mappedSortType, category);

  const handleFilterCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;

    if (value === '전체' || value === '식료품' || value === '패션잡화')
      setCategory(value);
  };

  const handleSortPrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;

    if (value === '낮은 가격 순' || value === '높은 가격 순') {
      setSort(value);
    }
  };

  useEffect(() => {
    if (isError) {
      showToast(ERROR_MESSAGES.productsFetchError);
    }
  }, [isError, showToast]);

  return (
    <>
      <Global styles={GlobalStyle}/>
      <Layout>
        <Header
          title="SHOP"
          totalCartProducts={cart && cart.totalElements}
          onClickCart={() => setIsCartModalOpen(true)}
        />
        <ToastList/>
        {isCartModalOpen && (
          <Modal
            position='bottom'
            title='장바구니'
            onClose={() => setIsCartModalOpen(false)}
          >
            {cart && (
              <Cart
                cart={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={async (cartItemId: number) => {
                  const item = cart.content.find(item => item.id === cartItemId);
                  if (item) {
                    await handleRemoveCart({
                      product: item.product,
                      cartId: item.id,
                      isInCart: true
                    });
                  }
                }}
              />
            )}
          </Modal>
        )}
        {isLoading && <LoadingSpinner duration={2}/>}
        <ProductSection
          onFilter={handleFilterCategory}
          onSort={handleSortPrice}
          onAddCart={handleAddCart}
          onRemoveCart={handleRemoveCart}
          onUpdateQuantity={handleUpdateQuantity}
          cart={cart?.content || null}
          products={transformedProducts}
          sort={sort}
          category={category}
        />
        {!isLoading && !isError && transformedProducts.length === 0 && (
          <div>상품이 존재하지 않습니다.</div>
        )}
      </Layout>
    </>
  );
}

export default App;
