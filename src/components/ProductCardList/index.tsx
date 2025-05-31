import { css } from '@emotion/css';
import { Product } from './product.type';
import ProductCard from '../ProductCard';
import { CartItem } from '../ShoppingCartModal/cart.type';

interface ProductCardListProps {
  products: Product[];
  shoppingCart: {
    data: CartItem[];
    create: (productId: number) => Promise<void>;
    remove: (cartItemId: number) => Promise<void>;
    update: (cartItemId: number, quantity: number) => Promise<void>;
  };
}

const ProductCardList = ({ products, shoppingCart }: ProductCardListProps) => {
  return (
    <div className={ProductCardListStyles} data-testid="product-list">
      {products &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={
              shoppingCart.data.find((ci) => ci.product.id === product.id) ??
              null
            }
            create={shoppingCart.create}
            remove={shoppingCart.remove}
            update={shoppingCart.update}
          />
        ))}
    </div>
  );
};

export default ProductCardList;

const ProductCardListStyles = css`
  padding: 0 24px 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 16px;
  row-gap: 20px;
`;
