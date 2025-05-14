import { css } from '@emotion/css';
import SelectBox from '../../components/common/SelectBox/SelectBox';
// import Toast from '../../components/common/Toast/Toast';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import useGetProducts from '../../hooks/useGetProducts';
import { CATEGORY } from '../../constants/products';
import useGetCarts from '../../hooks/useGetCartItems';
import { AddCartItemType } from '../../types/cartItem';

const productPageContainer = css`
  width: 429px;
  margin: 0 auto;
`;

const productWrapper = css`
  padding: 20px;
`;

const productPageTitle = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  margin: 10px 0px;
`;

const selectBoxContainer = css`
  display: flex;
  gap: 150px;
  justify-content: space-between;
  margin: 20px 0px;
`;

const SORT: { [key: string]: string } = {
  '낮은 가격 순': 'asc',
  '높은 가격 순': 'desc',
};

function ProductsPage() {
  const [category, setCategory] = useState(CATEGORY[0]);
  const [sort, setSort] = useState('asc');
  const {
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    products,
  } = useGetProducts({ category, sort });
  const { isLoading: isLoadingCarts, isError: isErrorCarts, carts, refetchCarts } = useGetCarts();
  const [itemCount, setItemCount] = useState(0);

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
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    });

    if (!res.ok) {
      throw new Error('에러 발생');
    }

    await refetchCarts();
  };

  const handleDeleteCartItem = async ({ productId }: { productId: number }) => {
    const cartId = carts?.filter((cart) => cart.product.id === productId)[0].id;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error('에러 발생');
    }

    await refetchCarts();
  };

  useEffect(() => {
    if (carts) {
      setItemCount(new Set(carts?.map((cart) => cart.product.id)).size);
    }
  }, [carts]);

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
    </div>
  );
}

export default ProductsPage;
