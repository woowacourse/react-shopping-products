import { getProductListProps } from './product';

interface buildURLProps extends getProductListProps {
  baseUrl: string;
}

// TODO: 리팩터링
const buildURL = ({ baseUrl, category, page, size, order }: buildURLProps) => {
  const params = [];

  if (category) {
    params.push(`category=${encodeURIComponent(category)}`);
  }
  if (page !== undefined) {
    params.push(`page=${page}`);
  }
  if (size !== undefined) {
    params.push(`size=${size}`);
  }

  if (order === 'desc') {
    params.push(`sort=price%2C${order}&sort=name`);
  } else {
    params.push('sort=price&sort=name');
  }

  if (params.length > 0) {
    baseUrl += `?${params.join('&')}`;
  }

  return baseUrl;
};

export default buildURL;
