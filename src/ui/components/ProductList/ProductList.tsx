import Product from '../Product/Product';
import { ProductElement } from '../../../types/type';
import { List } from './ProductList.styles';
import { useProductListContext } from '../../../context/ProductContext';

interface ProductListProps {
  // products: ProductElement[];
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
}

function ProductList({ onAddCart, onRemoveCart }: ProductListProps) {
  const { productList } = useProductListContext();

  return (
    <List>
      {productList?.map((item: ProductElement) => (
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
