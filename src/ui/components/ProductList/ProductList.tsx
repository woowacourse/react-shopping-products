import Product from '../Product/Product';
import { CartItem, ProductElement, ProductType } from '../../../types/product';
import { List } from './ProductList.styles';

interface ProductListProps {
  products: ProductType[];
  cart: CartItem[];
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function ProductList({ products, onAddCart, onRemoveCart }: ProductListProps) {
  return (
    <List>
      {products?.map((item) => (
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
