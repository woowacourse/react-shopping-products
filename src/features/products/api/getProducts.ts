import {apiClient} from '../../../shared/utils/requestApi';

interface Query {
  sortValue: string;
}

export const getProducts = async ({sortValue}: Query) =>
  (
    await apiClient.get({
      endPoint: `/products?sort=${sortValue}&size=20`,
    })
  ).json();
