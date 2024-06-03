import { useState } from 'react';
import { PAGE_INTERVAL } from '../constants/api';

interface UsePaginationResult {
  page: number;
  resetPage: () => void;
  moveNextPage: (loading: boolean, isLast: boolean) => void;
}

const usePagination = (): UsePaginationResult => {
  const [page, setPage] = useState(0);

  const resetPage = () => setPage(0);

  /**
   * page 번호가 0일 때 초기 데이터 패칭이므로 20개의 데이터를 가져온다.
   * 이때 실질적으로 각 page 마다 4개의 데이터를 가지고 있어 1 ~ 4 page 의 데이터는 초기에 가져온 데이터와 중복된다.
   * 따라서 page 번호가 0일 때 다음 번호를 5로 세팅하여 데이터 중복을 피했습니다.
   */
  const moveNextPage = (loading: boolean, isLast: boolean) => {
    if (!loading && !isLast) {
      setPage((prevPage) => (prevPage === 0 ? PAGE_INTERVAL.INITIAL : prevPage + PAGE_INTERVAL.DEFAULT));
    }
  };

  return { page, resetPage, moveNextPage };
};

export default usePagination;
