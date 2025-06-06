import { ProductDTOType } from './product';
import { cartDataType } from './cartItem';

export type APIKey = 'products' | 'cart-items';

export type APIState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export type ProductsAPIState = APIState<ProductDTOType[]>;
export type CartItemsAPIState = APIState<cartDataType[]>;

export type DataStore = {
  products: ProductsAPIState;
  'cart-items': CartItemsAPIState;
};

export type DataAction =
  | {
      type: 'FETCH_START';
      key: APIKey;
    }
  | {
      type: 'FETCH_SUCCESS';
      key: APIKey;
      data: ProductDTOType[] | cartDataType[];
    }
  | {
      type: 'FETCH_ERROR';
      key: APIKey;
      error: string;
    }
  | {
      type: 'CLEAR_ERROR';
      key: APIKey;
    };

export type APIDataType<K extends APIKey> = K extends 'products'
  ? ProductDTOType[]
  : K extends 'cart-items'
  ? cartDataType[]
  : never;

export type APIStateType<K extends APIKey> = APIState<APIDataType<K>>;
