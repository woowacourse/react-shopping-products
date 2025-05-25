import { useState } from 'react';
import AddButton from '../AddButton/AddButton';
import { ProductProps } from '../../types/product';
import {
  productContainer,
  productImage,
  productContent,
  productTitle,
  productPrice,
  buttonWrapper,
  productSoldOutOverlay,
  quantityButton,
  quantityDisplay,
  quantityControlContainer,
} from './Product.style';
import isValidImageUrl from '../../utils/isValidImageUrl';
import { DEFAULT_IMAGE_URL } from '../../constants/products';

function Product({
  id,
  imageUrl,
  name,
  price,
  quantity,
  isAdd,
  onClickAddCartItem,
  onClickUpdateCartItem,
  onClickDeleteCartItem,
}: ProductProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const isOutOfStock = quantity === 0;

  const handleIncreaseQuantity = () => {
    if (selectedQuantity < quantity) {
      const newQuantity = selectedQuantity + 1;
      setSelectedQuantity(newQuantity);
      if (isAdd) {
        onClickUpdateCartItem({ productId: id, quantity: newQuantity });
      }
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity === 1) {
      onClickDeleteCartItem({ productId: id });
      setSelectedQuantity(1);
      return;
    }

    if (selectedQuantity > 1) {
      const newQuantity = selectedQuantity - 1;
      setSelectedQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onClickAddCartItem({ productId: id, quantity: selectedQuantity });
  };

  return (
    <li className={productContainer}>
      {isOutOfStock && (
        <div className={productSoldOutOverlay}>
          <span>품절</span>
        </div>
      )}
      <img
        src={isValidImageUrl(imageUrl) ? imageUrl : DEFAULT_IMAGE_URL}
        alt="product"
        className={productImage}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_IMAGE_URL;
          e.currentTarget.onerror = null;
        }}
      />
      <div className={productContent}>
        <div className={productTitle}>{name}</div>
        <div className={productPrice}>{price}원</div>
        <div className={`${productPrice} quantity-info`}>재고: {quantity}개</div>
        <div className={buttonWrapper}>
          {isAdd ? (
            <div className={quantityControlContainer}>
              <button
                className={quantityButton}
                onClick={handleDecreaseQuantity}
                disabled={isOutOfStock}
              >
                -
              </button>
              <span className={quantityDisplay}>{selectedQuantity}</span>
              <button
                className={quantityButton}
                onClick={handleIncreaseQuantity}
                disabled={isOutOfStock || selectedQuantity >= quantity}
              >
                +
              </button>
            </div>
          ) : (
            <AddButton onClick={handleAddToCart} disabled={isOutOfStock} />
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
