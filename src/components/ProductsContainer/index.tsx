import * as S from './style';

import FilterContainer from '../FilterContainer';
import ProductsContent from '../ProductsContent';
import Loading from '../common/Loading';
import Title from '../common/Title';
import useCartItems from '../../hooks/useCartItems';
import useProducts from '../../hooks/useProducts';

const ProductsContainer = () => {
  const { getProducts } = useProducts();
  const { getCartItems } = useCartItems();

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
