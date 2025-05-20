import { useEffect, useState } from 'react';
import { CATEGORY } from '../../constants/products';
import { useToast } from '../../hooks/useToast';
import { productPageTitle, productWrapper } from './ProductContent.style';
import ProductList from '../ProductList/ProductList';
import deleteCartItem from '../../api/deleteCartItem';
import { AddCartItemType } from '../../types/cartItem';
import postCartItem from '../../api/postCartItem';
import Filter, { SORT } from '../Filter/Filter';
import { useGetProducts } from '../../hooks/useGetProducts';
import { CartDataType } from '../../contexts/CartContext';

function ProductContent({
  cartItemCount,
  carts,
}: {
  cartItemCount: number;
  carts: CartDataType[] | null;
}) {
  const [category, setCategory] = useState(CATEGORY[0]);
  const [sort, setSort] = useState('asc');

  const { openToast } = useToast();
  const { isLoading, isError, products } = useGetProducts({
    category,
    sort,
  });

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(SORT[e.target.value]);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

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

  const handleAddCartItem = async ({ productId, quantity }: AddCartItemType) => {
    if (cartItemCount >= 50) {
      openToast('장바구니는 최대 50개의 상품을 담을 수 있습니다.', 'error');
      return;
    }

    const res = await postCartItem({
      productId,
      quantity,
    });

    if (!res.ok) {
      openToast('장바구니에 상품을 담지 못했습니다.', 'error');
    }

    // await refetchCarts();
  };

  const handleDeleteCartItem = async ({ productId }: { productId: number }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0].id || 0;
    const res = await deleteCartItem({ cartId });

    if (!res.ok) {
      openToast('장바구니에 상품을 빼지 못했습니다.', 'error');
    }

    // await refetchCarts();
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
          onClickAddCartItem={handleAddCartItem}
          onClickDeleteCartItem={handleDeleteCartItem}
        />
      )}
    </div>
  );
}

export default ProductContent;
