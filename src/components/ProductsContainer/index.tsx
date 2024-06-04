import * as S from './style';

import { useContext } from 'react';

import FilterContainer from '../FilterContainer';
import ProductsContent from '../ProductsContent';
import Loading from '../common/Loading';
import Title from '../common/Title';
import { UseProductsContext } from '../ShoppingProductsPage';

const ProductsContainer = () => {
  const { productsLoading } = useContext(UseProductsContext);

  return (
    <S.ProductsContainer>
      <Title />
      <FilterContainer />
      <ProductsContent />
      <Loading isLoading={productsLoading} />
    </S.ProductsContainer>
  );
};

export default ProductsContainer;
