import * as styles from './FilteredProductList.style';
import Spinner from '../../Spinner/Spinner';
import ProductCard from '../ProductCard/ProductCard';
import { useCallback } from 'react';
import { CategoryOptionType, OrderByOptionType } from '../../../types/categoryOption';
import { useErrorContext } from '../../../contexts/ErrorContext';
import { ProductResponse } from '../../../types/response';
import getProducts from '../../../api/getProducts';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { ProductCardModel, productCardModelMapper } from '../../../api/model/productCardModelMapper';
import postCartItem from '../../../api/postCartItem';
import { useApiContext } from '../../../contexts/ApiContext';
import useCartItems from '../../../hooks/api/useCartItems';

export default function FilteredProductList({
  category,
  orderBy
}: {
  category: CategoryOptionType;
  orderBy: OrderByOptionType;
}) {
  const { showError } = useErrorContext();

  const {
    data: products,
    isLoading: productFetchLoading,
    error: productFetchError
  } = useApiContext<ProductResponse>({
    fetchFn: getProducts(orderBy),
    key: `getProducts:${orderBy}`,
    deps: [orderBy]
  });

  const { data: cartItems, fetcher: refetchCart } = useCartItems();

  const filteredProducts =
    category === '전체' ? products?.content : products?.content.filter((item) => item.category === category);

  useErrorHandler(productFetchError);

  const productListModel = filteredProducts?.map((product) => productCardModelMapper(product, cartItems?.content));

  const handleAddCart = useCallback(
    async (product: ProductCardModel) => {
      try {
        await postCartItem(product.id, 1);
        await refetchCart();
      } catch (err) {
        if (err instanceof Error) showError(err);
      }
    },
    [refetchCart, showError]
  );

  if (productFetchLoading) return <Spinner size="medium" />;

  return (
    <ul css={styles.listCss}>
      {productListModel?.map((productCard) => (
        <ProductCard
          key={productCard.id}
          orderBy={orderBy}
          {...productCard}
          onAddCart={() => handleAddCart(productCard)}
        />
      ))}
    </ul>
  );
}
