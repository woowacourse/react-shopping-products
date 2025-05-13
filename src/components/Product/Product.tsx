import { css } from '@emotion/css';
import AddButton from '../AddButton/AddButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import { ProductProps } from '../../types/product';

const productContainer = css`
  width: 100%;
  height: 224px;
  border-radius: 8px;
  position: relative;
`;

const productImage = css`
  width: 100%;
  height: 50%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const productContent = css`
  padding: 10px;
`;

const productTitle = css`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

const productPrice = css`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;

const buttonWrapper = css`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

function Product({ imageUrl, title, price, isAdd }: ProductProps) {
  return (
    <li className={productContainer}>
      <img src={imageUrl} alt="product" className={productImage} />
      <div className={productContent}>
        <div className={productTitle}>{title}</div>
        <div className={productPrice}>{price}원</div>
        <div className={buttonWrapper}>{isAdd ? <DeleteButton /> : <AddButton />}</div>
      </div>
    </li>
  );
}

export default Product;
