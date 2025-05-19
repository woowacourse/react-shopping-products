import Product from '../Product/Product';
import { ProductElement } from '../../../types/product';
import { List } from './ProductList.styles';

interface ProductListProps {
  products: ProductElement[];
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function ProductList({ onAddCart, onRemoveCart, products }: ProductListProps) {
  return (
    <List>
      {products?.map((item: ProductElement) => (
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
