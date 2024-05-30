import { CartItem, Product } from '@appTypes/index';
import { CartItemsContext } from '@contexts/index';
import { useTargetContext } from '@hooks/index';

import CartActionButton from '../CartActionButton';

import style from './style.module.css';

interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
}

function ProductCard({ product, cartItems }: ProductCardProps) {
  const { handleCartAction } = useTargetContext(CartItemsContext);

  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const isInCart = cartItem !== undefined;

  const handleCartActionButtonClick = () => {
    handleCartAction({ isInCart, productId: product.id, cartItem });
  };

  return (
    <li className={style.productCard}>
      <img src={product.imageUrl} alt="" className={style.image} />
      <div className={style.contents}>
        <p className="product-name">{product.name}</p>
        <p className="text">{product.price.toLocaleString()}원</p>
        <CartActionButton buttonType={isInCart ? 'delete' : 'add'} onClick={handleCartActionButtonClick} />
      </div>
    </li>
  );
}

export default ProductCard;
