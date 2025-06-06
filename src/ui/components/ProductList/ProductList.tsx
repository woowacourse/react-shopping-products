import Product from '../Product/Product';
import { ProductElement } from '../../../types/product';
import { List } from './ProductList.styles';
import { CART_ITEM_INITIAL_QUANTITY } from '../../../constants/productConfig';
import { useCart } from '../../../hooks/useCart';

interface ProductListProps {
  products: ProductElement[];
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
  onUpdateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
}

function ProductList({ products, onAddCart, onRemoveCart, onUpdateQuantity }: ProductListProps) {
  const { cart } = useCart();

  const getCartQuantity = (productId: number): number => {
    if (!cart) {
      return CART_ITEM_INITIAL_QUANTITY;
    }

    const cartItem = cart.content.find((item) => item.product.id === productId);
    return cartItem?.quantity || CART_ITEM_INITIAL_QUANTITY;
  };

  return (
    <List>
      {products?.map((product: ProductElement) => (
        <Product
          key={product?.product?.id}
          item={product}
          onAddCart={onAddCart}
          onRemoveCart={onRemoveCart}
          onUpdateQuantity={onUpdateQuantity}
          cartQuantity={getCartQuantity(product.product.id)}
        />
      ))}
    </List>
  );
}

export default ProductList;
