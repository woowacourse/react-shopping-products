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
} from './Product.style';
import isValidImageUrl from '../../utils/isValidImageUrl';
import { DEFAULT_IMAGE_URL } from '../../constants/products';
import useProductQuantity from '../../hooks/useProductQuantity';
import QuantityControlBox from '../QuantityControlBox/QuantityControlBox';

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
  const {
    selectedQuantity,
    isOutOfStock,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
  } = useProductQuantity({
    id,
    quantity,
    isAdd,
    onClickUpdateCartItem,
    onClickDeleteCartItem,
    onClickAddCartItem,
  });

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
            <QuantityControlBox
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              isOutOfStock={isOutOfStock}
              selectedQuantity={selectedQuantity}
              quantity={quantity}
            />
          ) : (
            <AddButton onClick={handleAddToCart} disabled={isOutOfStock} />
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
