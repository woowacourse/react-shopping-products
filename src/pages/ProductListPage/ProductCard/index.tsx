import { fetchDeleteCartItems, fetchPostCartItems } from '@apis/index';
import { CartItem, Product } from '@appTypes/index';

import CartActionButton from '../CartActionButton';

import style from './style.module.css';

interface ProductCardProps {
  product: Product;
  cartItems: CartItem[];
  getCartItemList: () => Promise<void>;
}

function ProductCard({ product, cartItems, getCartItemList }: ProductCardProps) {
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const isInCart = cartItem !== undefined;

  const addCartItem = async () => {
    await fetchPostCartItems({ productId: product.id });
    await getCartItemList();
  };

  const deleteCarItem = async () => {
    if (!cartItem) return;
    await fetchDeleteCartItems({ cartItemId: cartItem.id });
    await getCartItemList();
  };

  const handleCartActionButtonClick = () => {
    if (isInCart) return deleteCarItem();
    addCartItem();
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
