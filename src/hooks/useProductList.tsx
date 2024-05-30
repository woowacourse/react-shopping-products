import { useState, useEffect } from 'react';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import { Category, SortType, Product } from '@/types';
import { requestProductList } from '@/apis/request/product';
import { useToast } from './useToast';

export const PAGE = {
  START: 1,
  START_SIZE: 20,
  SIZE: 4,
};

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState<number | null>(null);

  const [sortType, setSortType] = useState<SortType>('asc');
  const [category, setCategory] = useState<Category>('all');

  const { showToast } = useToast();

  useEffect(() => {
    if (page === 0) return;

    const getProducts = async () => {
      try {
        setLoading(true);
        const size = page === 1 ? PAGE.START_SIZE : PAGE.SIZE;
        const { paginatedProducts, totalPages: curTotalPage } = await requestProductList({
          page,
          category,
          sortType,
          size,
        });
        if (curTotalPage !== totalPage) setTotalPage(curTotalPage);

        setProductList((prevProducts) => [...prevProducts, ...paginatedProducts]);
      } catch (error) {
        showToast('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, sortType, category]);

  const handleSortType = (value: string) => {
    const sortType = FILTER_OPTION_LIST.find((sortOptionItem) => sortOptionItem.value === value);

    if (!sortType) {
      showToast('올바른 정렬 기준이 아닙니다.');

      return;
    }

    setSortType(sortType.value);
    setPage(PAGE.START);
    setProductList([]);
  };

  const handleCategory = (value: string) => {
    const category = CATEGORY_OPTION_LIST.find((categoryItem) => categoryItem.value === value);

    if (!category) {
      showToast('올바른 카테고리가 아닙니다.');

      return;
    }

    setCategory(category.value);
    setPage(PAGE.START);
    setProductList([]);
  };

  const fetchNextPage = () => {
    if (loading) return;
    if (totalPage === page) return;

    setPage((prevPage) => prevPage + 1);
  };

  return {
    handleCategory,
    handleSortType,
    sortType,
    category,
    fetchNextPage,
    productList,
    loading,
    page,
  };
};

export default useProductList;
