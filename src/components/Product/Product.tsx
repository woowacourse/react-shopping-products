import AddButton from '../AddButton/AddButton';
import { ProductProps } from '../../types/product';
import {
  productContainer,
  productImage,
  productContent,
  productTitle,
  productPrice,
  buttonWrapper,
  soldout,
} from './Product.style';
import CartItemCountButtons from '../CartItemCountButtons/CartItemCountButtons';
import { useState } from 'react';
import useGetCarts from '../../hooks/useGetCarts';
import { useToast } from '../../hooks/useToast';

function Product({ product, onClickAddCartItem, onClickModifyCartItem }: ProductProps) {
  const { id, imageUrl, name, price, quantity } = product;

  const { openToast } = useToast();
  const { carts } = useGetCarts();
  const [cartQuantity, setCartQuantity] = useState(
    carts?.find((cart) => cart.product.id === id)?.quantity || 0,
  );

  const handleAddCartItem = () => {
    onClickAddCartItem?.({ productId: id, quantity: 1 });
    setCartQuantity(1);
  };

  const handleModifyCartItem = (modifyQuantity: number) => {
    if (modifyQuantity > quantity) {
      openToast('현재 제품의 수량보다 더 많은 수의 제품을 담을 수 없습니다.', 'error');
      return;
    }

    onClickModifyCartItem?.({ productId: id, quantity: modifyQuantity });
    setCartQuantity(modifyQuantity);
  };

  return (
    <li className={productContainer}>
      <img src={imageUrl} alt="product" className={productImage} />
      {quantity === 0 && <div className={soldout}>품 절</div>}
      <div className={productContent}>
        <div className={productTitle}>{name}</div>
        <div className={productPrice}>{price}원</div>
        <div className={buttonWrapper}>
          {cartQuantity > 0 ? (
            <CartItemCountButtons
              quantity={cartQuantity}
              onClickAddCartItem={handleAddCartItem}
              onClickModifyCartItem={handleModifyCartItem}
            />
          ) : (
            <AddButton onClick={handleAddCartItem} />
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
