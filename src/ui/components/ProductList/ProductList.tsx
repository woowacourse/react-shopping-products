import Product from '../Product/Product';
import { ProductWithCartInfo } from '../../../types/product';
import { List } from './ProductList.styles';

interface ProductListProps {
  products: ProductWithCartInfo[];
  onAddCart: (product: ProductWithCartInfo) => Promise<void>;
  onRemoveCart: (product: ProductWithCartInfo) => Promise<void>;
}

function ProductList({ onAddCart, onRemoveCart, products }: ProductListProps) {
  return (
    <List>
      {products?.map((item: ProductWithCartInfo) => (
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
