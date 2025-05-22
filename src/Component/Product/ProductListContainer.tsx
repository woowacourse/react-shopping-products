import { useState, useEffect } from 'react';
import { ProductTypes } from '../../types/ProductTypes';
import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';
import getProducts from '../../api/getProducts';
import { CartItemTypes } from '../../types/CartItemType';
import Spinner from '../Common/Spinner';
import styled from '@emotion/styled';

interface ProductListContainerProps {
  cartItems: CartItemTypes[];
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  updateErrorMessage: (errorMessage: string) => void;
  checkMax: () => boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ProductListContainer({
  updateCartItems,
  getMatchCartItem,
  updateErrorMessage,
  checkMax,
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
        updateErrorMessage(
          ' 상품 목록 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
        );
      }
    }
    fetchProducts();
  }, [updateErrorMessage]);

  return (
    <>
      <ProductListToolbar setProducts={setProducts} />
      {status === 'success' ? (
        <ProductList
          productList={products}
          updateCartItems={updateCartItems}
          getMatchCartItem={getMatchCartItem}
          checkMax={checkMax}
          updateErrorMessage={updateErrorMessage}
        />
      ) : null}
      {status === 'loading' ? (
        <StyledSpinnerWrapper>
          <Spinner size={100} color={'red'} />
        </StyledSpinnerWrapper>
      ) : null}
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
