import { CartItem, Product } from '@appTypes/index';

import CartActionButton from '../CartActionButton';

import style from './style.module.css';

interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
}

function ProductCard({ product, cartItems }: ProductCardProps) {
  const cartItem = cartItems.find((item) => item.product.id === product.id);

  return (
    <li className={style.productCard}>
      <img src={product.imageUrl} alt="" className={style.image} />
      <div className={style.contents}>
        <p className="product-name">{product.name}</p>
        <p className="text">{product.price.toLocaleString()}원</p>
        <CartActionButton cartItem={cartItem!} productId={product.id} />
      </div>
    </li>
  );
}

export default ProductCard;
