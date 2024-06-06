import Fetcher from './Fetcher';
import { BASE_URL } from '@/constants/baseUrl';
import { API_ROUTES } from '@/constants/route';
import token from './token';
import { Category, ProductItemData, SortType, ProductListData } from '@/types';
import generateProductAPIQueryParams from './utils/generateProductAPIQueryParams';

type ProductListArgument = {
  page: number;
  sortType: SortType;
  category: Category;
};

export type FetchProductListData = {
  content: ProductItemData[];
  totalPages: number;
  number: number;
  last: boolean;
};

export const getProductList = async ({
  page,
  sortType,
  category,
}: ProductListArgument): Promise<FetchProductListData> => {
  const INITIAL_ITEM_LENGTH = 20;
  const ADDITIONAL_ITEM_LENGTH = 4;

  const size = page === 0 ? INITIAL_ITEM_LENGTH : ADDITIONAL_ITEM_LENGTH;
  const url = `${BASE_URL.PRODUCT}${API_ROUTES.PRODUCT_LIST}${generateProductAPIQueryParams({
    page,
    sortType,
    category,
    size,
  })}`;

  const data = await Fetcher.get<ProductListData>(url, { headers: { Authorization: token } });

  return {
    content: data.content,
    totalPages: data.totalPages,
    number: data.number,
    last: data.last,
  };
};

export const deleteCartItemById = async (cartItemId: number) => {
  await Fetcher.delete(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}/${cartItemId}`, {
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });
};

export const addCartItemByProductId = async (productId: number, quantity = 1) => {
  await Fetcher.post(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}`, {
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
};
