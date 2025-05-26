import AddButton from '../AddButton/AddButton';
import { ProductDataType } from '../../types/product';
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

function Product({ id, imageUrl, name, price, quantity, isAdd }: ProductDataType) {
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
          {isAdd && !isOutOfStock ? (
            <QuantityControlBox
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              isOutOfStock={isOutOfStock}
              selectedQuantity={selectedQuantity}
              quantity={quantity}
            />
          ) : (
            <AddButton onClick={handleAddToCart} />
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
