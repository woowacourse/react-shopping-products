import { CartItemTypes } from '../../types/CartItemType';
import { ProductTypes } from '../../types/ProductTypes';
import ProductItem from './ProductItem';

type SetProducts = {
  updateCartItems: () => void;
  getMatchCartItem: (id: number) => CartItemTypes | undefined;
  checkMax: () => boolean;
  quantity: number;
  updateErrorMessage: (errorMessage: string) => void;
  isRow: boolean;
};
export default function ProductListItem(props: ProductTypes & SetProducts) {
  return (
    <li>
      <ProductItem {...props} />
    </li>
  );
}
