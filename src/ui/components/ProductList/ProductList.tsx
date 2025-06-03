import Product from '../Product/Product';
import { ProductElement, CartItem } from '../../../types/product';
import { List } from './ProductList.styles';
import { CART_ITEM_INITIAL_QUANTITY } from '../../../constants/productConfig';

interface ProductListProps {
  products: ProductElement[];
  cart?: CartItem[] | null;
  onAddCart: (product: ProductElement) => Promise<void>;
  onRemoveCart: (product: ProductElement) => Promise<void>;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => Promise<void>;
}

function ProductList({
  products,
  cart,
  onAddCart,
  onRemoveCart,
  onUpdateQuantity,
}: ProductListProps) {
  const getCartQuantity = (productId: number): number => {
    if (!cart) {
      return CART_ITEM_INITIAL_QUANTITY;
    }

    const cartItem = cart.find((item) => item.product.id === productId);
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
