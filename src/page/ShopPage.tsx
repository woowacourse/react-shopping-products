import { css } from '@emotion/react';
import { useState } from 'react';
import Body from '../component/Body/Body';
import Header from '../component/Header/Header';
import ProductContainer from '../component/ProductContainer/ProductContainer';
import Selector from '../component/Selector/Selector';
import TitleContainer from '../component/TitleContainer/titleContainer';
import Toast from '../component/Toast/Toast';
import { useAPI } from '../hook/APIContext';
import { getCartItem } from '../api/cartItem';
import { getProduct } from '../api/product';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const pageLayout = css`
  display: flex;
  flex-direction: column;
  width: 430px;
  background-color: white;
  border: 1px solid black;
`;

const selectorBoxLayout = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  > div {
    width: 125px;
  }
`;

const cartIcon = css`
  cursor: pointer;
`;

const cartIconContainer = css`
  position: relative;
  width: fit-content;
`;

const cartItemCount = css`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  inset: 19px 0 0 20px;
  background-color: #ffffff;
  color: #000000;
  border-radius: 50%;
  font-size: 10px;
  width: 19px;
  height: 19px;
`;

const loadingLayout = css`
  display: grid;
  grid-column: span 2;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
`;

export interface CartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

export type CategoryOption = '전체' | '식료품' | '패션잡화';
export type FilterOption = '낮은 가격순' | '높은 가격순';
export type sortOption = 'price,asc' | 'price,desc';

export default function ShopPage() {
  const [categoryValue, setCategoryValue] = useState<CategoryOption>('전체');
  const [filterValue, setFilterValue] = useState<FilterOption>('낮은 가격순');

  const {
    data: cartResponse,
    isError: cartError,
    refetch: updateCartItemList,
  } = useAPI({
    name: 'cartItems',
    fetcher: () => getCartItem({ sortBy: 'asc' }),
  });

  const { data: productResponse, isError: productError } = useAPI({
    name: `products-${categoryValue}-${filterValue}`,
    fetcher: () =>
      getProduct({
        category: categoryValue,
        sortBy: filterValue === '높은 가격순' ? 'price,desc' : 'price,asc',
      }),
  });

  const cartItemList = cartResponse?.content ?? [];
  const productList = productResponse?.content ?? [];

  const selectedProducts = cartItemList.length;

  return (
    <div css={pageLayout}>
      <Header title="SHOP">
        <div css={cartIconContainer}>
          <img css={cartIcon} src="./shopping-cart.svg" alt="장바구니 아이콘" onClick={() => console.log('click')} />
          {selectedProducts > 0 && (
            <div data-testid="cart-count" css={cartItemCount}>
              {selectedProducts}
            </div>
          )}
        </div>
        {(cartError || productError) && <Toast>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</Toast>}
      </Header>
      <Body>
        {productList.length !== 0 ? (
          <>
            <TitleContainer title="bpple 상품 목록">
              <div css={selectorBoxLayout}>
                <Selector
                  dropDownOptions={['전체', '식료품', '패션잡화']}
                  placeholder="전체"
                  onSelectChange={setCategoryValue}
                />
                <Selector
                  dropDownOptions={['낮은 가격순', '높은 가격순']}
                  placeholder="낮은 가격순"
                  onSelectChange={setFilterValue}
                />
              </div>
            </TitleContainer>

            <ProductContainer products={productList} cartItemList={cartItemList} onChange={updateCartItemList} />
          </>
        ) : (
          <div css={loadingLayout}>로딩중입니다</div>
        )}
      </Body>
    </div>
  );
}
