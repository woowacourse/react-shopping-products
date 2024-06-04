import { Product } from '@appTypes/index';

import CartActionButton from '../CartActionButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li className="product-card">
      <img src={product.imageUrl} alt="" className="product-card__image" />
      <div className="product-card__contents">
        <p className="product-name">{product.name}</p>
        <p className="text">{product.price.toLocaleString()}원</p>
        <CartActionButton productId={product.id} cartItem={null} />
      </div>
    </li>
  );
};

export default ProductCard;
