import { convertResponseToProduct } from '../../product/api/responseMapper';
import { type Cart } from '../type';
import { CartItemContent } from './type';

export const convertResponseToCart = ({
  id,
  quantity,
  product,
}: CartItemContent): Cart => ({
  id: id.toString(),
  quantity,
  product: convertResponseToProduct(product),
});
