import SelectBox from '../../components/common/SelectBox/SelectBox';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import useGetProducts from '../../hooks/useGetProducts';
import { CATEGORY } from '../../constants/products';
import useGetCarts from '../../hooks/useGetCartItems';
import { AddCartItemType } from '../../types/cartItem';
import Toast from '../../components/common/Toast/Toast';
import {
  productPageContainer,
  productWrapper,
  productPageTitle,
  selectBoxContainer,
} from './ProductsPage.style';
import postCartItem from '../../api/postCartItem';
import deleteCartItem from '../../api/deleteCartItem';
import useProductSort from '../../hooks/useProductSort';
import { SORT } from '../../constants/products';
import useProductCategory from '../../hooks/useProductCategory';

function ProductsPage() {
  const { category, handleChangeCategory } = useProductCategory();
  const { sort, handleChangeSort } = useProductSort();
  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    products,
  } = useGetProducts({ category, sort });
  const { isLoading: isLoadingCarts, isError: isErrorCarts, carts, refetchCarts } = useGetCarts();
  const [itemCount, setItemCount] = useState(0);
  const [isErrorAddCardItem, setIsErrorAddCardItem] = useState(false);
  const [isErrorDeleteCardItem, setIsErrorDeleteCardItem] = useState(false);
  const [isOverItemCounts, setIsOverItemCounts] = useState(false);

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
    if (itemCount >= 50) {
      setIsOverItemCounts(true);
      setTimeout(() => {
        setIsOverItemCounts(false);
      }, 3000);

      return;
    }

    const res = await postCartItem({
      productId,
      quantity,
    });

    if (!res.ok) {
      setIsErrorAddCardItem(true);
      setTimeout(() => {
        setIsErrorAddCardItem(false);
      }, 3000);
    }

    await refetchCarts();
  };

  const handleDeleteCartItem = async ({ productId }: { productId: number }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0].id || 0;
    const res = await deleteCartItem({ cartId });

    if (!res.ok) {
      setIsErrorDeleteCardItem(true);
      setTimeout(() => {
        setIsErrorDeleteCardItem(false);
      }, 3000);
    }

    await refetchCarts();
  };

  useEffect(() => {
    if (carts) {
      setItemCount(new Set(carts?.map((cart) => cart.product.id)).size);
    }
  }, [carts]);

  if (isLoadingCarts) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={productPageContainer}>
      <Header itemCount={itemCount} />
      <div className={productWrapper}>
        <h1 className={productPageTitle}>bpple 상품 목록</h1>
        <div className={selectBoxContainer}>
          <SelectBox placeHolder={CATEGORY[0]} options={CATEGORY} onChange={handleChangeCategory} />
          <SelectBox
            placeHolder={Object.keys(SORT)[0]}
            options={Object.keys(SORT)}
            onChange={handleChangeSort}
          />
        </div>
        {products && (
          <ProductList
            isLoadingProducts={isLoadingProducts}
            products={getProcessedCartArr()}
            onClickAddCartItem={handleAddCartItem}
            onClickDeleteCartItem={handleDeleteCartItem}
          />
        )}
      </div>
      {isErrorCarts && <Toast text="장바구니 정보를 불러오지 못했습니다." varient="error" />}
      {isErrorProducts && <Toast text="상품 정보를 불러오지 못했습니다." varient="error" />}
      {isErrorAddCardItem && <Toast text="장바구니에 상품을 담지 못했습니다." varient="error" />}
      {isErrorDeleteCardItem && <Toast text="장바구니에 상품을 빼지 못했습니다." varient="error" />}
      {isOverItemCounts && (
        <Toast text="장바구니는 최대 50개의 상품을 담을 수 있습니다." varient="error" />
      )}
    </div>
  );
}

export default ProductsPage;
