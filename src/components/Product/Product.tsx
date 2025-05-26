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
import { getImageUrl } from '../../utils/getImageUrl';
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

  const finalImageUrl = isValidImageUrl(imageUrl)
    ? getImageUrl(imageUrl)
    : getImageUrl(DEFAULT_IMAGE_URL);

  return (
    <li className={productContainer}>
      {isOutOfStock && (
        <div className={productSoldOutOverlay}>
          <span>품절</span>
        </div>
      )}
      <img
        src={finalImageUrl}
        alt="product"
        className={productImage}
        onError={(e) => {
          e.currentTarget.src = getImageUrl(DEFAULT_IMAGE_URL);
          e.currentTarget.onerror = null;
        }}
      />
      <div className={productContent}>
        <div className={productTitle}>{name}</div>
        <div className={productPrice}>{price}원</div>
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
