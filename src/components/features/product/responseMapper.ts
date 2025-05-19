import { CartItemContent, ProductContent } from '../../../api/type';
import { Cart, Product, ProductCategoryType } from './type';

export const convertResponseToProduct = ({
  id,
  name,
  price,
  imageUrl,
  category,
}: ProductContent): Product => ({
  id: id.toString(),
  name: name ?? '',
  price,
  imageUrl: imageUrl ?? 'defaultImage',
  category: (category ?? '전체') as ProductCategoryType,
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
