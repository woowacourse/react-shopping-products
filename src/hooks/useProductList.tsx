import { useState, useEffect } from 'react';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import { Category, SortType, Product } from '@/types';
import { requestProductList } from '@/apis/request/product';

export const PAGE = {
  START: 1,
  START_SIZE: 20,
  SIZE: 4,
};

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState<number | null>(null);

  const [sortType, setSortType] = useState<SortType>('asc');
  const [category, setCategory] = useState<Category>('all');

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
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, sortType, category]);

  const handleSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = FILTER_OPTION_LIST.find(
      (sortOptionItem) => sortOptionItem.value === e.target.value,
    );

    if (!sortType) {
      // TODO: 못찾았다는 alert
      return;
    }

    setSortType(sortType.value);
    setPage(PAGE.START);
    setProductList([]);
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = CATEGORY_OPTION_LIST.find(
      (categoryItem) => categoryItem.value === e.target.value,
    );

    if (!category) {
      // TODO: 못찾았다는 alert
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
    error,
    page,
  };
};

export default useProductList;
