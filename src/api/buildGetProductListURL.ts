import { getProductListProps } from './product';

interface Props extends getProductListProps {
  baseUrl: string;
}

const buildGetProductListURL = ({
  baseUrl,
  category,
  page,
  size,
  order,
}: Props) => {
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

export default buildGetProductListURL;
