import { getCartList, getCartListQuantity } from '@/api/cartItem';
import { cartKeys, productsKeys } from './queryKeys';
import { getProductList } from '@/api/product';

export const productsQueryConfig = {
  productsList: { queryKey: productsKeys.all, queryFn: getProductList },
};

export const cartQueryConfig = {
  cartList: { queryKey: cartKeys.all, queryFn: getCartList },
  cartTotalQuantity: {
    queryKey: cartKeys.totalQuantity(),
    queryFn: getCartListQuantity,
  },
};
