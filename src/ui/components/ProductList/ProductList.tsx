import Product from '../Product/Product';
import { ProductElement } from '../../../types/product';
import { List } from './ProductList.styles';
import { CART_ITEM_INITIAL_QUANTITY } from '../../../constants/productConfig';
import { useCart } from '../../../hooks/useCart';
import { useCartActions } from '../../../hooks/useCartActions';

interface ProductListProps {
  products: ProductElement[];
}

function ProductList({ products }: ProductListProps) {
  const { cart } = useCart();
  const { handleAddCart, handleRemoveCart, handleUpdateQuantity } = useCartActions();

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
          onAddCart={handleAddCart}
          onRemoveCart={handleRemoveCart}
          onUpdateQuantity={handleUpdateQuantity}
          cartQuantity={getCartQuantity(product.product.id)}
        />
      ))}
    </List>
  );
}

export default ProductList;
