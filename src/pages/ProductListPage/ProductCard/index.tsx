import { Product } from '@appTypes/product';

import CartActionButton from '../CartActionButton';

import style from './style.module.css';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <li className={style.productCard}>
      <img src={product.imageUrl} alt="" className={style.image} />
      <div className={style.contents}>
        <p className="product-name">{product.name}</p>
        <p className="text">{product.price.toLocaleString()}원</p>
        <CartActionButton buttonType="delete" onClick={() => console.log('')} />
      </div>
    </li>
  );
}

export default ProductCard;
