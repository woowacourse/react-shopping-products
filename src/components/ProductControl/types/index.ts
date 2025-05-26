import { Dispatch, SetStateAction } from 'react';
import { ResponseProduct } from '../../../api/types';

export interface ProductControlProps {
  setProductList: Dispatch<SetStateAction<ResponseProduct[]>>;
}

export type CategoryOptionType = '' | '식료품' | '패션잡화';

export type SortOptionType = 'price,asc' | 'price,desc';

export type SelectType = 'category' | 'sort';
