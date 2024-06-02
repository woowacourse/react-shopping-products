import { getProductListProps } from './index';

const buildGetProductListURL = ({ ...params }: getProductListProps): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  const order = params.order === 'desc' ? 'price,desc' : 'price';
  searchParams.set('sort', order);
  searchParams.append('sort', 'name');

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

export default buildGetProductListURL;
