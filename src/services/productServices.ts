import apiClient from './apiClient';
import buildQueryString from '../util/buildQueryString';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '../constants/systemConstants';

export const getProducts = async (categoryOption = '전체', sortOption = 'asc') => {
  const params = {
    page: DEFAULT_PAGE.toString(),
    size: DEFAULT_SIZE.toString(),
    sort: `price,${sortOption}`,
    category: categoryOption,
  };
  const excludedValues = ['전체'];

  const fullUrl = `/products${buildQueryString(params, excludedValues)}`;
  console.log(fullUrl);
  const data = await apiClient({
    method: 'GET',
    URI: fullUrl,
  });

  return data.content;
};
