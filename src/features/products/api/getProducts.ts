import {apiClient} from '../../../shared/utils/requestApi';

interface Query {
  sortValue: string;
}

export const getProducts = async ({sortValue}: Query) =>
  apiClient.get({
    endPoint: `/products?sort=${sortValue}&size=20`,
  });
