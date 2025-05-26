import { useMemo } from 'react';
import SelectBox from '../../components/common/SelectBox/SelectBox';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import useGetProducts from '../../hooks/useGetProducts';
import useGetCarts from '../../hooks/useGetCartItems';
import { CATEGORY } from '../../constants/products';
import {
  productPageContainer,
  productWrapper,
  productPageTitle,
  productPageSelectBoxContainer,
} from './ProductsPage.style';
import useProductSort from '../../hooks/useProductSort';
import { SORT } from '../../constants/products';
import useProductCategory from '../../hooks/useProductCategory';
import getProcessedCartArr from '../../utils/getProcessedCartArr';

function ProductsPage() {
  const { category, handleChangeCategory } = useProductCategory();
  const { sort, handleChangeSort } = useProductSort();
  const { isLoading: isLoadingProducts, products } = useGetProducts({ category, sort });
  const { carts } = useGetCarts();

  const processedProducts = useMemo(() => {
    if (!products) return [];
    return getProcessedCartArr({ carts, products });
  }, [products, carts]);

  return (
    <div className={productPageContainer}>
      <Header />
      <div className={productWrapper}>
        <h1 className={productPageTitle}>bpple 상품 목록</h1>
        <div className={productPageSelectBoxContainer}>
          <SelectBox placeHolder={CATEGORY[0]} options={CATEGORY} onChange={handleChangeCategory} />
          <SelectBox
            placeHolder={Object.keys(SORT)[0]}
            options={Object.keys(SORT)}
            onChange={handleChangeSort}
          />
        </div>
        {products && (
          <ProductList isLoadingProducts={isLoadingProducts} products={processedProducts} />
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
