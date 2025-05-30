import { ProductContent } from './type';
import { Product, ProductCategoryType } from '../type';

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
