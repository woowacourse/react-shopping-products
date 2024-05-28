import { getProductListProps } from './product';

interface buildURLProps extends getProductListProps {
  baseUrl: string;
}

const buildURL = ({
  baseUrl,
  category,
  page,
  size,
  sortOrder,
}: buildURLProps) => {
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

  if (sortOrder === 'desc') {
    params.push(`sort=price%2C${sortOrder}&sort=name`);
  } else {
    params.push('sort=price&sort=name');
  }

  if (params.length > 0) {
    baseUrl += `?${params.join('&')}`;
  }

  return baseUrl;
};

export default buildURL;
