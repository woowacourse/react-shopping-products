import { ProductElement } from '../../../types/product';
import Product from '../Product/Product';
import { List } from './ProductList.styles';

interface ProductListProps {
  data: ProductElement[];
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function ProductList({ onAddCart, onRemoveCart, data }: ProductListProps) {
  return (
    <List>
      {data?.map((item: ProductElement) => (
        <Product
          key={item.id}
          item={item}
          onAddCart={onAddCart}
          onRemoveCart={onRemoveCart}
        />
      ))}
    </List>
  );
}

export default ProductList;
