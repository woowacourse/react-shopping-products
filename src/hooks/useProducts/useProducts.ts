import { useState } from 'react';
import useFetchProducts from '../queries/useFetchProducts/useFetchProducts';
import { Option } from '../../types/Option.type';

const useProducts = (initialCategory: Option, initialSorting: Option) => {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSorting);

  const { products, isFetching, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useFetchProducts(
    category,
    sort,
  );

  const handleCategory = (category: Option) => setCategory(category);

  const handleSort = (sort: Option) => setSort(sort);

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return {
    products,
    isFetching,
    error,
    category,
    sort,
    handleCategory,
    handleSort,
    handlePage,
  };
};

export default useProducts;
