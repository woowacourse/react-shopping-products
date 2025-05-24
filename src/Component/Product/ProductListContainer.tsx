import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';
import getProducts from '../../api/getProducts';
import Spinner from '../Common/Spinner';
import styled from '@emotion/styled';
import { useAPIContext } from '../Common/Provider';

interface ProductListContainerProps {
  updateErrorMessage: (errorMessage: string) => void;
}

export default function ProductListContainer({
  updateErrorMessage,
}: ProductListContainerProps) {
  const { data: products, status } = useAPIContext({
    apiFn: () => getProducts(),
    key: 'products',
  });

  return (
    <>
      <ProductListToolbar />
      {status === 'success' ? (
        <ProductList
          productList={products}
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
