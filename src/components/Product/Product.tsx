import AddButton from '../AddButton/AddButton';
import DeleteButton from '../DeleteButton/DeleteButton';
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

function Product({
  id,
  imageUrl,
  name,
  price,
  quantity,
  isAdd,
  onClickAddCartItem,
  onClickDeleteCartItem,
}: ProductProps) {
  const isOutOfStock = quantity === 0;

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
        <div className={buttonWrapper}>
          {isAdd ? (
            <DeleteButton onClick={() => onClickDeleteCartItem({ productId: id })} />
          ) : (
            <AddButton onClick={() => onClickAddCartItem({ productId: id, quantity: 1 })} />
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
