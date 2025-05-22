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
    if (error instanceof Error) throw new Error(error.message);
  }
};

export default patchCart;
