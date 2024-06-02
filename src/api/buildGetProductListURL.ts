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
}: Props): string => {
  const params = new URLSearchParams();

  if (category) {
    params.append('category', category);
  }
  if (page !== undefined) {
    params.append('page', String(page));
  }
  if (size !== undefined) {
    params.append('size', String(size));
  }

  const sortOrder = order === 'desc' ? 'price,desc' : 'price';
  params.append('sort', sortOrder);
  params.append('sort', 'name');

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export default buildGetProductListURL;
