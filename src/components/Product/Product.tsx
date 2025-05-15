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
} from './Product.style';

function Product({
  id,
  imageUrl,
  name,
  price,
  isAdd,
  onClickAddCartItem,
  onClickDeleteCartItem,
}: ProductProps) {
  return (
    <li className={productContainer}>
      <img src={imageUrl} alt="product" className={productImage} />
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
