import { CartItemContent, ProductContent } from './type';
import { Cart, Product, ProductCategoryType } from '../type';

export const convertResponseToProduct = ({
  id,
  name,
  price,
  imageUrl,
  category,
  quantity,
}: ProductContent): Product => ({
  id: id.toString(),
  name: name ?? '',
  price,
  imageUrl: imageUrl ?? 'defaultImage',
  category: (category ?? '전체') as ProductCategoryType,
  quantity,
});

export const convertResponseToCart = ({
  id,
  quantity,
  product,
}: CartItemContent): Cart => ({
  id: id.toString(),
  quantity,
  product: convertResponseToProduct(product),
});
