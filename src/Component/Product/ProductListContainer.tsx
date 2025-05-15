import { useState, useEffect } from 'react';
import { ProductTypes } from '../../types/ProductTypes';
import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';
import getProducts from '../../api/getProducts';
import { CartItemTypes } from '../../types/CartItemType';
import ErrorBox from '../Common/ErrorBox';
import Spinner from '../Common/Spinner';
import styled from '@emotion/styled';

interface ProductListContainerProps {
  cartItems: CartItemTypes[];
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ProductListContainer({
  cartItems,
  updateCartItems,
  getMatchCartItem,
}: ProductListContainerProps) {
  const [products, setProducts] = useState<ProductTypes[]>([]);

  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    async function fetchProducts() {
      try {
        setStatus('loading');
        const productsData = await getProducts();
        const productsContent = productsData.content;
        setProducts(productsContent);
        setStatus('success');
      } catch (e) {
        setStatus('error');
      }
    }
    fetchProducts();
  }, [cartItems]);

  return (
    <>
      <ProductListToolbar setProducts={setProducts} />
      {status === 'success' ? (
        <ProductList
          productList={products}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
        />
      ) : null}
      {status === 'loading' ? (
        <StyledSpinnerWrapper>
          <Spinner size={100} color={'red'} />
        </StyledSpinnerWrapper>
      ) : null}
      {status === 'error' ? <ErrorBox /> : null}
    </>
  );
}

const StyledSpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
