import { useState, useEffect } from 'react';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST, SortValue } from '@/constants/filter';
import { requestProductList } from '@/apis/request/product';
import { useToast } from './useToast';
import { Product } from '@/types/product.type';
import { Category } from '@/types/filter.type';

export const PAGE = {
  START: 0,
  START_SIZE: 20,
  SIZE: 4,
};

const ERROR_MESSAGE = {
  INVALID_SORT_TYPE: '올바른 정렬 기준이 아닙니다.',
  INVALID_CATEGORY: '올바른 카테고리가 아닙니다.',
};

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState(PAGE.START - 1);
  const [totalPage, setTotalPage] = useState<number | null>(null);

  const [sortType, setSortType] = useState<SortValue>('price,asc');
  const [category, setCategory] = useState<Category>('all');

  const { showToast } = useToast();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (page === -1) return;

    const getProducts = async () => {
      try {
        setLoading(true);
        const size = page === PAGE.START ? PAGE.START_SIZE : PAGE.SIZE;
        const { paginatedProducts, totalPages: curTotalPage } = await requestProductList({
          page,
          category,
          sortType,
          size,
        });

        if (curTotalPage !== totalPage) setTotalPage(curTotalPage);

        setProductList((prevProducts) => [...prevProducts, ...paginatedProducts]);
      } catch (error) {
        setError(new Error('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'));
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, sortType, category]);

  const handleSortType = (sortValue: string) => {
    const sortType = FILTER_OPTION_LIST.find((sortOption) => sortOption.value === sortValue);

    if (!sortType) {
      setError(new Error(ERROR_MESSAGE.INVALID_SORT_TYPE));
      return;
    }

    setSortType(sortType.value);
    resetPage();
  };

  const handleCategory = (value: string) => {
    const category = CATEGORY_OPTION_LIST.find((categoryItem) => categoryItem.value === value);

    if (!category) {
      setError(new Error(ERROR_MESSAGE.INVALID_CATEGORY));
      return;
    }

    setCategory(category.value);
    resetPage();
  };

  const resetPage = () => {
    setPage(PAGE.START);
    setProductList([]);
  };

  const fetchNextPage = () => {
    if (loading) return;
    if (totalPage === page) return;

    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (error) {
      showToast({ message: error.message, type: 'alert' });
      setError(null);
    }
  }, [error]);

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
