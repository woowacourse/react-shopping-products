import * as styles from './FilteredProductList.style';
import Spinner from '../../Spinner/Spinner';
import ProductCard from '../ProductCard/ProductCard';
import { useCallback } from 'react';
import { CategoryOptionType, OrderByOptionType } from '../../../types/categoryOption';
import { useErrorContext } from '../../../contexts/ErrorContext';
import { CartItemResponse, ProductResponse } from '../../../types/response';
import getProducts from '../../../api/getProducts';
import useErrorHandler from '../../../hooks/useErrorHandler';
import { ProductCardModel, productCardModelMapper } from '../../../api/model/productCardModelMapper';
import { deleteCartItem } from '../../../api/deleteCartItem';
import postCartItem from '../../../api/postCartItem';
import { useApiContext } from '../../../contexts/ApiContext';
import getCartItems from '../../../api/getCartItems';

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

  const { data: cartItems, fetcher: refetchCart } = useApiContext<CartItemResponse>({
    fetchFn: getCartItems,
    key: 'getCartItems'
  });

  const filteredProducts =
    category === '전체' ? products?.content : products?.content.filter((item) => item.category === category);

  useErrorHandler(productFetchError);

  const productListModel = filteredProducts?.map((product) => productCardModelMapper(product, cartItems?.content));

  const handleCartToggle = useCallback(
    async (product: ProductCardModel) => {
      try {
        if (product.isInCart) {
          await deleteCartItem(product.cartItemId!);
          await refetchCart();
          return;
        }
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
          onClick={() => handleCartToggle(productCard)}
        />
      ))}
    </ul>
  );
}
