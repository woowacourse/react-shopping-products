import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { Product } from '../../types/fetch';
import AddCartButton from '../AddCartButton';
interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { cartIdSet, patchToAddCart, patchToRemoveCart } =
    useContext(CartContext);

  return (
    <div>
      <img src={product.imageUrl} />
      <div>{product.name}</div>
      <div>{product.price}</div>
      <AddCartButton />
    </div>
  );
}

export default ProductCard;
