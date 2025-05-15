import Product from '../Product/Product';
import { List } from './ProductList.styles';

interface ProductListProps {
  onAddCart: () => void;
  onRemoveCart: () => void;
  data: any;
}

function ProductList({ onAddCart, onRemoveCart, data }: ProductListProps) {
  return (
    <List>
      {data?.map((item) => (
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
