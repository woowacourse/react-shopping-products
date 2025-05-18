import { Product } from '../App';
import safeFetch from './safeFetch';

const postCartItems = async (product: Product) => {
  const body = JSON.stringify({
    productId: product.id,
    quantity: 1,
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  const { data, status } = await safeFetch('cart-items', options);

  return { status, data };
};

export default postCartItems;
