import * as S from './style';

import { useContext } from 'react';

import FilterContainer from '../FilterContainer';
import ProductsContent from '../ProductsContent';
import Loading from '../common/Loading';
import Title from '../common/Title';
import { UseProductsContext } from '../ShoppingProductsPage';
import { UseCartItemsContext } from '../../App';

const ProductsContainer = () => {
  const { getProducts } = useContext(UseProductsContext);
  const { getCartItems } = useContext(UseCartItemsContext);

  const isLoading = getProducts.isLoading || getCartItems.isLoading;

  return (
    <S.ProductsContainer>
      <Title />
      <FilterContainer />
      <ProductsContent />
      <Loading isLoading={isLoading} />
    </S.ProductsContainer>
  );
};

export default ProductsContainer;
