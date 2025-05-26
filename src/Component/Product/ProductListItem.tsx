import { ProductTypes } from '../../types/ProductTypes';
import ProductItem from './ProductItem';

type SetProducts = {
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
