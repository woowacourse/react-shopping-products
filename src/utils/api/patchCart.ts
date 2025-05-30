import { CART_URL } from '../../constants/endpoint';
import { USER_TOKEN } from '../../constants/env';
import handleHttpError from '../handleHTTPError';

const patchCart = async (cartId: number, quantity: number) => {
  try {
    const response = await fetch(`${CART_URL}/${cartId}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Basic ${USER_TOKEN}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        quantity,
      }),
    });

    await handleHttpError(response);
  } catch (error) {
    console.error('fetch 실패:', error);
    throw error;
  }
};

export default patchCart;
