import { Product } from '../App';
import safeFetch from './safeFetch';

const postCartItems = async (product: Product) => {
  // try {
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
  // } catch (error) {
  //   let newErrorMessage = '';
  //   if (status === 400) {
  //     newErrorMessage =
  //       '장바구니에 상품을 추가하지 못했습니다. 다시 시도해주세요';
  //   } else if (status === 404) {
  //     newErrorMessage = 'not found';
  //   } else if (status === 500) {
  //     newErrorMessage = '서버에 문제가 발생했습니다.';
  //   }
  // }
};

export default postCartItems;
