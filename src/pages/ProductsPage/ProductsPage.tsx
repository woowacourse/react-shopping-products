import { useMemo } from 'react';
import SelectBox from '../../components/common/SelectBox/SelectBox';
import Header from '../../components/Header/Header';
import ProductList from '../../components/ProductList/ProductList';
import useGetProducts from '../../hooks/useGetProducts';
import useGetCarts from '../../hooks/useGetCartItems';
import useProductShowControl from '../../hooks/useProductShowControl';
import { CATEGORY, SORT } from '../../constants/products';
import {
  productPageContainer,
  productWrapper,
  productPageTitle,
  productPageSelectBoxContainer,
} from './ProductsPage.style';
import getProcessedCartArr from '../../utils/getProcessedCartArr';

interface ProductsPageProps {
  onCartClick: () => void;
}

function ProductsPage({ onCartClick }: ProductsPageProps) {
  const { showSettings, handleChangeCategory, handleChangeSort } = useProductShowControl();
  const { isLoading: isLoadingProducts, products } = useGetProducts({
    category: showSettings.category,
    sort: showSettings.sort,
  });
  const { carts } = useGetCarts();

  const processedProducts = useMemo(() => {
    if (!products) return [];
    return getProcessedCartArr({ carts, products });
  }, [products, carts]);

  return (
    <div className={productPageContainer}>
      <Header onCartClick={onCartClick} />
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
