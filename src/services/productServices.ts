import apiClient from './apiClient';

export const getProducts = async (categoryOption: string = '전체', sortOption: string = 'asc') => {
  const categoryUrl = categoryOption === '전체' ? '' : `&category=${categoryOption}`;
  const fullUrl = `/products?page=0&size=20&sort=price,${sortOption}` + categoryUrl;
  const data = await apiClient({
    method: 'GET',
    URI: fullUrl,
  });
  console.log(data);
  return data.content;
};
