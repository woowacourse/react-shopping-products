import { useEffect } from 'react';
import { useToast } from '../../hooks/useToast';
import { productPageTitle, productWrapper } from './ProductContent.style';
import ProductList from '../ProductList/ProductList';
import Filter from '../Filter/Filter';
import { useGetProducts } from '../../hooks/useGetProducts';
import { CartDataType } from '../../contexts/CartContext';
import { useProductFilter } from '../../hooks/useProductFilter';
import { useCartManagement } from '../../hooks/useCartManager';

function ProductContent({
  cartItemCount,
  carts,
  refetchCarts,
}: {
  cartItemCount: number;
  carts: CartDataType[] | null;
  refetchCarts: () => void;
}) {
  const { category, sort, handleChangeCategory, handleChangeSort } = useProductFilter();
  const { openToast } = useToast();
  const { isLoading, isError, products } = useGetProducts({
    category,
    sort,
  });
  const { addCartItem, deleteItemFromCart } = useCartManagement({
    cartItemCount,
    carts,
    refetchCarts,
  });

  const getProcessedCartArr = () => {
    const cartIdArr = carts?.map((cart) => cart.product.id);
    return products?.map((product) => {
      if (cartIdArr?.includes(product.id)) {
        return {
          ...product,
          isAdd: true,
        };
      }

      return {
        ...product,
        isAdd: false,
      };
    });
  };

  useEffect(() => {
    if (isError) {
      openToast('상품 정보를 불러오지 못했습니다.', 'error');
    }
  }, [isError, openToast]);

  return (
    <div className={productWrapper}>
      <h1 className={productPageTitle}>bpple 상품 목록</h1>
      <Filter onChangeCategory={handleChangeCategory} onChangeSort={handleChangeSort} />
      {products && (
        <ProductList
          isLoadingProducts={isLoading}
          products={getProcessedCartArr()}
          onClickAddCartItem={addCartItem}
          onClickDeleteCartItem={deleteItemFromCart}
        />
      )}
    </div>
  );
}

export default ProductContent;
