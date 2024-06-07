import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';

export const calculatePageParams = (page: number) => {
  const size = page === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;
  const queryPage =
    page === FIRST_FETCH_PAGE ? FIRST_FETCH_PAGE : FIRST_FETCH_SIZE / AFTER_FETCH_SIZE - 1 + page;
  return { size, queryPage };
};
