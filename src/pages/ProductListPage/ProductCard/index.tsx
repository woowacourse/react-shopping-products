import { Product } from '@appTypes/index';
import { CartActionErrorModal } from '@components/index';
import { CartItemsContext } from '@contexts/index';
import { useCartAction, useTargetContext } from '@hooks/index';

import CartActionButton from '../CartActionButton';

import style from './style.module.css';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { refreshCartItemIds, cartItemIds } = useTargetContext(CartItemsContext);
  const { addCartItem, deleteCarItem, error: cartActionError } = useCartAction({ refreshCartItemIds });

  const cartItemId = cartItemIds?.get(product.id);
  const isInCart = !!cartItemId;

  const handleCartActionButtonClick = () => {
    if (isInCart) return deleteCarItem(cartItemId);

    return addCartItem(product.id);
  };

  return (
    <li className={style.productCard}>
      <img src={product.imageUrl} alt="" className={style.image} />
      <div className={style.contents}>
        <p className="product-name">{product.name}</p>
        <p className="text">{product.price.toLocaleString()}원</p>
        <CartActionButton buttonType={isInCart ? 'delete' : 'add'} onClick={handleCartActionButtonClick} />
        <CartActionErrorModal error={cartActionError} />
      </div>
    </li>
  );
}

export default ProductCard;
