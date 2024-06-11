import * as Styled from './ProductPage.styled';

import { Category, SortType } from './Product.types';
import { useMemo, useState } from 'react';

import AppLayout from '@components/layout/AppLayout/AppLayout';
import CardList from '@components/product/CardList/CardList';
import CartModal from '@components/product/CartModal/CartModal';
import Dropdown from '@components/common/Dropdown/Dropdown';
import ITEM_CATEGORIES from '@constants/itemCategories';
import ITEM_SORT_TYPE from '@constants/itemSortTypes';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import WrongCat from '@components/common/WrongCat/WrongCat';
import useCartItems from '@hooks/query/useCartItem';
import useInfinityProducts from '@hooks/query/useInfinityProduct';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

const ProductPage = () => {
  const [category, setCategory] = useState<Category>('전체');
  const [sortType, setSortType] = useState<SortType>('낮은 가격순');

  const {
    isFetching,
    data: productPage,
    fetchNextPage: fetchNextProductPage,
  } = useInfinityProducts({
    category,
    sortType,
  });

  const products = useMemo(() => {
    return (
      productPage?.pages.flatMap(response => response?.content || []) || []
    );
  }, [productPage]);

  const { cartItems } = useCartItems();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [isSortTypeDropdownOpen, setIsSortTypeDropdownOpen] = useState(false);

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => fetchNextProductPage(),
  });

  return (
    <AppLayout
      itemCount={cartItems?.length ?? 0}
      cartClick={() => setIsModalOpen(true)}
    >
      {isModalOpen && <CartModal onClose={() => setIsModalOpen(false)} />}
      <Styled.ProductPageTitle>bpple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <Dropdown
          options={ITEM_CATEGORIES.slice()}
          nowSelectedOption={category}
          isOpen={isCategoryDropdownOpen}
          setIsOpen={setIsCategoryDropdownOpen}
          setOption={setCategory}
        />
        <Dropdown
          options={ITEM_SORT_TYPE.slice()}
          nowSelectedOption={sortType}
          isOpen={isSortTypeDropdownOpen}
          setIsOpen={setIsSortTypeDropdownOpen}
          setOption={setSortType}
        />
      </Styled.ProductDropdownWrapper>

      <Styled.ProductPageListWrapper>
        <CardList products={products} />
      </Styled.ProductPageListWrapper>

      {isFetching && <LoadingSpinner $width='100%' $height='30vh' />}
      {!isFetching && products.length === 0 && (
        <WrongCat
          $width='400px'
          $height='400px'
          message={
            '그런 건 내가 다 먹어버렸다냥~\n(사실 등록된 물건이 없는거라고 하네요)'
          }
        />
      )}

      {!isFetching && <Styled.ObserverTarget ref={targetRef} />}
    </AppLayout>
  );
};

export default ProductPage;
