import { CategoryOption, sortOption } from '../page/ShopPage';

interface getProductProps {
  category: CategoryOption;
  sortBy: sortOption;
}

export const PRODUCT_URL = `${import.meta.env.VITE_BASE_URL}/products`;

export async function getProduct({ sortBy, category }: getProductProps) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const params = new URLSearchParams({
    page: '0',
    size: '20',
    sort: sortBy,
  });
  const categoryParams = new URLSearchParams({ category });

  return fetch(
    `${PRODUCT_URL}?${category !== '전체' && `${categoryParams.toString()}&&`}${params.toString()}`,
    options
  ).then((res) => res.json());
}
