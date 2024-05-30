import { ReactNode } from 'react';

import { Text } from '@/shared';

import { Product } from '../../model/types';

import css from './ProductCard.module.css';

interface ProductCardProps {
  actionSlot: ReactNode;
  product: Product;
}

export const ProductCard = ({ actionSlot, product }: ProductCardProps) => {
  return (
    <div className={css.productCardContainer}>
      <div className={css.imageSlot}>
        <img className={css.image} src={product.imageUrl} alt={product.name} />
      </div>
      <div className={css.contentContainer}>
        <div className={css.detailSlot}>
          <Text tag='p' type='h2'>
            {product.name}
          </Text>
          <Text tag='p' type='b1'>{`${product.price.toLocaleString()}원`}</Text>
        </div>
        <div className={css.actionSlot}>{actionSlot}</div>
      </div>
    </div>
  );
};
