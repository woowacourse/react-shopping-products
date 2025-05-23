import Product from '../Product/Product';
import { ProductElement } from '../../../types/product';
import { List } from './ProductList.styles';

interface ProductListProps {
  products: ProductElement[];
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function ProductList({ products, onAddCart, onRemoveCart }: ProductListProps) {
  return (
    <List>
      {products?.map((product: ProductElement) => (
        <Product
          key={product?.product?.id}
          item={product}
          onAddCart={onAddCart}
          onRemoveCart={onRemoveCart}
        />
      ))}
    </List>
  );
}

export default ProductList;
