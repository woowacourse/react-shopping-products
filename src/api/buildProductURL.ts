import { getProductListProps } from './product';

interface Props extends getProductListProps {
  baseUrl: string;
}

const buildGetProductURL = ({
  baseUrl,
  category,
  page,
  size,
  order,
}: Props) => {
  const params = [];

  if (category) {
    if (category !== 'all') {
      params.push(`category=${encodeURIComponent(category)}`);
    }
  }
  if (page !== undefined) {
    params.push(`page=${page}`);
  }
  if (size !== undefined) {
    params.push(`size=${size}`);
  }

  if (order === 'desc') {
    params.push(`sort=price%2C${order}`);
  } else {
    params.push('sort=price');
  }

  if (params.length > 0) {
    baseUrl += `?${params.join('&')}`;
  }

  return baseUrl;
};

export default buildGetProductURL;
